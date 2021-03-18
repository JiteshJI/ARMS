import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, concatMap, map, tap, catchError } from 'rxjs/operators';
import { editPrjCBPageActionTypes } from '../actions/edit-prj-cb-page.actions';
import { EditPrjCbPageService } from '../../services/edit-prj-cb-page.service';
import { of } from 'rxjs';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { ControllingBoardRaw } from '../../models/cb-raw';


@Injectable()
export class EditPrjCbPageEffects {

  constructor(private cbService: EditPrjCbPageService, private actions$: Actions, private notificationService: kendonotificationservice) { }

  createCB$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editPrjCBPageActionTypes.addCB),
      concatMap(action => this.cbService.addCB(action.cb).pipe(

        map((cb: ControllingBoardRaw) => {
          this.notificationService.showSuccess('Create Controlling Board Successful');
          return editPrjCBPageActionTypes.addCBSuccess({ cb });
        }),
        catchError(err => {
          this.notificationService.showError('Create Controlling Board failed');
          return of(editPrjCBPageActionTypes.addCBFailure({ error: err }));
        })
      )
      )
    )
  );

  updateCB$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editPrjCBPageActionTypes.updateCB),
      concatMap(action => this.cbService.updateCB(action.cb).pipe(

        map((cb: ControllingBoardRaw) => {
          this.notificationService.showSuccess('Update Controlling Board Successful');
          return editPrjCBPageActionTypes.updateCBSuccess({ cb });
        }),
        catchError(err => {
          this.notificationService.showError('Update Controlling Board failed');
          return of(editPrjCBPageActionTypes.updateCBFailure({ error: err }));
        })
      )
      )
    )
  );

}
