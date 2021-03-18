import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pooledParticipatingActions } from '../actions/pooled-participating.actions';
import { concatMap, catchError, map, tap } from 'rxjs/operators';
import { PooledParticipatingDataService } from '../../services/fin-pooled-participating.service';
import { PooledParticipating } from '../../models/pooled-participating';
import { of } from 'rxjs';

@Injectable()
export class ProjectPooledPartEffects {
  constructor (
    private actions$: Actions,
    private pooledPartDataService: PooledParticipatingDataService
  ) { }

  loadSelectedProjectPooledPart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pooledParticipatingActions.loadSelectedProjectPooledPart),
      tap(() => console.log(' effect executed loadSelectedProjectPooled$')),
      concatMap((action) =>
        this.pooledPartDataService.loadSelectedProjectPooledParticipating(action.projectId).pipe(
          map((selectedProjectPooledPart: PooledParticipating[]) =>
            pooledParticipatingActions.loadSelectedProjectPooledPartSuccess({pooledParticipating: selectedProjectPooledPart })
          ),
          catchError((err) =>
            of(pooledParticipatingActions.loadProjectPooledPartFail({ error: err }))
          )
        )
      )
    )
  );

  createProjectPooledPart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pooledParticipatingActions.addProjectPooledPart),
      tap(() => console.log(' effect executed createProjectPooledPart$')),
      concatMap((action) =>
        this.pooledPartDataService.createProjectPooledParticipating(action.pooledParticipating).pipe(
          map((pooledpart: PooledParticipating) =>
            pooledParticipatingActions.addProjectPooledPartSuccess({pooledParticipating: pooledpart })
          ),
          catchError(err =>
            of(pooledParticipatingActions.addProjectPooledPartFailed({ error: err }))
          )
        )
      )
    )
  );

  updateProjectPooledPart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pooledParticipatingActions.updateProjectPooledPart),
      tap(() => console.log(' effect executed updateProjectPooledPart$')),
      concatMap((action) =>
        this.pooledPartDataService.updateProjectPooledParticipating(action.pooledParticipating).pipe(
          map((pooledpart: PooledParticipating) =>
            pooledParticipatingActions.updateProjectPooledPartSuccess({pooledParticipating: pooledpart})
          ),
          catchError(err =>
            of(pooledParticipatingActions.updateProjectPooledPartFailed({ error: err }))
          )
        )
      )
    )
  );

  setSavePooledParticipating$ = createEffect(() => this.actions$.pipe(
    ofType(pooledParticipatingActions.setSavePooledPartDialog),
    tap(() => console.log(' effect executed setSavePooledParticipating$')),
    map( action => {
      console.log(' setting SavePooledParticipating Dialog');
      return pooledParticipatingActions.setSavePooledPartDialogSuccess({Dialog: action.showDialog});
    })
  ));
}
