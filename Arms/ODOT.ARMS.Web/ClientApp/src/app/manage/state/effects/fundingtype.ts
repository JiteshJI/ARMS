/// <reference path="../../services/administration-data.service.ts" />
/// <reference path="../../models/administration-categories.ts" />
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AdministrationDataService } from '../../services/administration-data.service';

import { FundingTypeListActionTypes, Load, LoadFail, LoadSuccess } from '../actions/fundingtype';
import { FundingTypeListAdministration } from '../../models/administration-categories';


@Injectable()
export class FundingListStoreEffects {
  constructor(private administrationDataService: AdministrationDataService, private actions$: Actions) { }
  @Effect()
  loadFundingtypeRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(
      FundingTypeListActionTypes.Load
    ),
    switchMap(action =>
      this.administrationDataService
        .getFundingTypeList()
        .pipe(
          map(
            (itemsFundingTypeListAdministration: FundingTypeListAdministration[]) =>
              new LoadSuccess(
                itemsFundingTypeListAdministration
              )
          ),
          catchError(error =>
            observableOf(new LoadFail(error))
          )
        )
    )
  );
}
