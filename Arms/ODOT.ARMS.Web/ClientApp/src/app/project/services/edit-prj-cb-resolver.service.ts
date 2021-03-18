import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable, of, combineLatest, forkJoin } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, tap, catchError, switchMap, take, filter } from 'rxjs/operators';
import * as fromCore from "../../core/state/reducers";
import * as fromProject from "../state/reducers";
import { ProjectService } from './project.service';
import { ControllingBoardRaw } from '../models/cb-raw';
import { EditPrjCbPageService } from './edit-prj-cb-page.service';
import { loadProjectCBReferenceData } from '../../core/state/actions/reference-data.actions';
import { loadProjectCBList } from '../state/actions/edit-prj-cb-page.actions';

@Injectable({
  providedIn: 'root'
})
export class EditPrjCbResolverService {
  projectId$: Observable<string>;

  constructor(private route: ActivatedRoute,
    public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>,
    public projectService: ProjectService,
    public cbService: EditPrjCbPageService)
  {
    this.projectId$ = this.projectStore.select(fromProject.getProjectId);
  }

  
  loadProjectCBs(projectId): Observable<boolean> {
    console.info('loadProjectCBs');
    return forkJoin(
      this.waitForReferenceDataToLoad(),
      this.cbService.getCBsByProjectId(projectId)
    ).pipe(
      tap((data: [boolean, ControllingBoardRaw[]]) => {
        console.info(data[1]);
        this.projectStore.dispatch(loadProjectCBList({ cbList: data[1] }));
      }),
      map((data: [boolean, ControllingBoardRaw[]]) => {
        console.info(data[0]);
        console.info(data[1]);
        return !!data[1];
      }),
      catchError(() => {
        console.info('I blow up');
        //this.coreStore.dispatch(navigateToNotFound());
        return of(false);
      })
    );
  }

  /**
 * This method creates an observable that waits for the `loaded` property
 * of the Reference Data state to turn `true`, emitting one time once loading
 * has finished.If the data not already loaded then we dispatch a action to load.
 */
  waitForReferenceDataToLoad(): Observable<boolean> {
    return this.coreStore.pipe(
      select(fromCore.getProjectCBReferenceDataLoaded),
      tap(loaded => {
        if (!loaded) {
          console.info('waitForReferenceDataToLoad');
          this.coreStore.dispatch(loadProjectCBReferenceData());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest(
      this.projectId$
    ).pipe(
      take(1),
      switchMap(([projectId]: [string]) => {
        console.info('Resolver Controlling Board');
        return this.loadProjectCBs(projectId);
      })
    );
  }
}
