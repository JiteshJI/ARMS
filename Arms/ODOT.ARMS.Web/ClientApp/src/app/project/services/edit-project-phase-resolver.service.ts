import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import * as fromCore from "../../core/state/reducers";
import { PhaseRaw } from '../models/phase-raw';
import * as fromProject from "../state/reducers";
import * as fromProjectPhase from '../state/reducers/edit-project-phase-page.reducer';
import { ProjectService } from './project.service';
import { loadProjectPhases } from '../state/actions/edit-project-phase-page.actions';
import { loadProjectPhaseReferenceData } from '../../core/state/actions/reference-data.actions';



@Injectable({
  providedIn: 'root'
})
export class EditProjectPhaseResolverService {

  projectId$: Observable<string>;

  constructor(private route: ActivatedRoute,
    public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>,
    public projectPhaseStore: Store<fromProjectPhase.State>,
    public projectService: ProjectService) {

    this.projectId$ = this.projectStore.select(fromProject.getProjectId);
    console.log('phase resolver', this.projectId$);
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest(
      [this.projectId$]
    ).pipe(
      take(1),
      switchMap(([projectId]: [string]) => {
        console.log('phase resolve', projectId);
        return this.loadProjectPhases(projectId);
      })
    )
  }

  loadProjectPhases(projectId: string): Observable<boolean> {
    return forkJoin([
      this.waitForReferenceDataToLoad(),
      this.projectService.getPhaseList(projectId)]
    ).pipe(
      tap((data: [boolean, PhaseRaw[]]) => {
        console.info('phase resolver load phases', data[1]);
        this.projectPhaseStore.dispatch(loadProjectPhases({ phases: data[1] }))
      }),
      map((data: [boolean, PhaseRaw[]]) => !!data[1]),
      catchError(() => {
        return of(false);
      })
    )
  }

  waitForReferenceDataToLoad() {
    return this.coreStore.pipe(
      select(fromCore.getProjectPhaseReferenceDataLoaded),
      tap(loaded => {
        if (!loaded) {
          console.info('waitForPhaseReferenceDataToLoad');
          this.coreStore.dispatch(loadProjectPhaseReferenceData());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}
