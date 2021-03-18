import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, concatMap, map, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EditPrjPhasePageActionTypes } from '../actions/edit-project-phase-page.actions';
import { of } from 'rxjs';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { PhaseService } from '../../services/phase.service';
import { PhaseRaw } from '../../models/phase-raw';



@Injectable()

export class EditPrjPhasePageEffects {

  constructor(private phaseService: PhaseService, private actions$: Actions, private notificationService: kendonotificationservice) { }

  createPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditPrjPhasePageActionTypes.addPhase),
      concatMap(action => this.phaseService.addPhase(action.phase).pipe(

        map((phase: PhaseRaw) => {
          this.notificationService.showSuccess('Create Phase Successful');
          return EditPrjPhasePageActionTypes.addPhaseSuccess({ phase });
        }),
        catchError(err => {
          this.notificationService.showError('Create Phase failed');
          return of(EditPrjPhasePageActionTypes.addPhaseFailure({ error: err }));
        })
      )
      )
    )
  );

  updatePhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditPrjPhasePageActionTypes.updatePhase),
      concatMap(action => this.phaseService.updatePhase(action.phase).pipe(

        map((phase: PhaseRaw) => {
          this.notificationService.showSuccess('Update Phase Successful');
          return EditPrjPhasePageActionTypes.updatePhaseSuccess({ phase });
        }),
        catchError(err => {
          this.notificationService.showError('Update Phase failed');
          return of(EditPrjPhasePageActionTypes.updatePhaseFailure({ error: err }));
        })
      ))
    )
  );

  mergePhases$ = createEffect(() =>
      this.actions$.pipe(
        ofType(EditPrjPhasePageActionTypes.mergePhases),
        concatMap(action => this.phaseService.mergePhases(action.projectId,action.phases).pipe(

          map((phases: PhaseRaw[]) => {
            this.notificationService.showSuccess('Phase(s) merged');
            return EditPrjPhasePageActionTypes.mergePhasesSuccess({ phases: phases});
          }),
          catchError(err => {
            this.notificationService.showError('Phase(s) merge failed');
            return of(EditPrjPhasePageActionTypes.mergePhasesFailure({ error: err }));
          })
        ))
      )
  )

}
