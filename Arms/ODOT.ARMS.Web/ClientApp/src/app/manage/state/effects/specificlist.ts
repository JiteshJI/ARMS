/// <reference path="../../services/administration-data.service.ts" />
/// <reference path="../../models/administration-categories.ts" />
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AdministrationDataService } from '../../services/administration-data.service';

import { SpecificListActionTypes, Load, LoadFail, LoadSuccess } from '../actions/specificlist';
import { SpecificListAdministration } from '../../models/administration-categories';


@Injectable()
export class SpecificListStoreEffects {
  constructor(private administrationDataService: AdministrationDataService, private actions$: Actions) { }
  @Effect()
  loadSpecificListRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(
      SpecificListActionTypes.Load
    ),
    switchMap(action =>
      this.administrationDataService
        .getSpecificList()
        .pipe(
          map(
            (itemsSpecificListAdministration: SpecificListAdministration[]) =>
              new LoadSuccess(
                itemsSpecificListAdministration
              )
          ),
          catchError(error =>
            observableOf(new LoadFail(error))
          )
        )
    )
  );

}

