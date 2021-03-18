import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, concatMap, map, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { editFinFundingPageActionTypes } from '../actions/edit-funding-page.actions';
import { FundingService } from '../../services/Funding.service';
import { of } from 'rxjs';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { FundingRaw } from '../../models/fundings-raw';


@Injectable()

export class EditFinFundingsPageEffects {

  constructor(private FundingService: FundingService, private actions$: Actions, private notificationService: kendonotificationservice) { }

  createFunding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editFinFundingPageActionTypes.addFunding),
      concatMap(action => this.FundingService.addFunding(action.Funding).pipe(

        map((Funding: FundingRaw) => {
          this.notificationService.showSuccess('Create Funding Successful');
          return editFinFundingPageActionTypes.addFundingSuccess({ Funding });
        }),
        catchError(err => {
          this.notificationService.showError('Create Funding failed');
          return of(editFinFundingPageActionTypes.addFundingFailure({ error: err }));
        })
      )
      )
    )
  );

  updateFunding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editFinFundingPageActionTypes.updateFunding),
      concatMap(action => this.FundingService.updateFunding(action.Funding).pipe(

        map((Funding: FundingRaw) => {
          this.notificationService.showSuccess('Update Funding Successful');
          return editFinFundingPageActionTypes.updateFundingSuccess({ Funding });
        }),
        catchError(err => {
          this.notificationService.showError('Update Funding failed');
          return of(editFinFundingPageActionTypes.updateFundingFailure({ error: err }));
        })
      )
      )
    )
  );

}
