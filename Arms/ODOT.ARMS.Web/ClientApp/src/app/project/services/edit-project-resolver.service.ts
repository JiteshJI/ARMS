import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import * as fromProject from '../state/reducers';
//import * as fromCore from '../../../core/state/reducers';
import { Store, select } from '@ngrx/store';
import { ProjectService } from './project.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, switchMap, map, tap, catchError, filter } from 'rxjs/operators';
import { LoadProjectToEdit } from '../state/actions/edit-project-page.actions';
import { ProjectForUpdate } from '../models/project-for-update';

@Injectable({
  providedIn: 'root'
})
export class EditProjectResolverService {
  PrjId$: Observable<string>;

  /*
  constructor(private projectService: ProjectService,
    private projectStore: Store<fromProject.State>,
    private coreStore: Store<fromCore.State>) {
    this.PrjId$ = this.projectStore.select(fromProject.selectProjectId);
  }
  */
  constructor(private projectService: ProjectService, private projectStore: Store<fromProject.State>) {
    this.PrjId$ = this.projectStore.select(fromProject.selectProjectId);
  }

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the Reference Data state to turn `true`, emitting one time once loading
   * has finished.If the data not already loaded then we dispatch a action to load.
   
  waitForReferenceDataToLoad(): Observable<boolean> {
    return this.coreStore.pipe(
      select(fromCore.getReferenceDataLoaded),
      tap(loaded => {
        if (!loaded)
          this.coreStore.dispatch(new LoadReferenceData());
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
  */

  /**
   * This method loads a User with the given userId from the API, returning `true` or `false` if it was found.
   */
  loadProjectToEditFromApi(PrjId: string): Observable<boolean> {
    return Observable.of(true);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.PrjId$
      .pipe(
        take(1),
        switchMap((PrjId: string) => {
          return this.loadProjectToEditFromApi(PrjId);
        })
      );
  }
}
