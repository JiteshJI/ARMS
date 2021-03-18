/// <reference path="../../services/administration-data.service.ts" />
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AdministrationDataService } from '../../services/administration-data.service';

import { AdministrationCategoryListActionTypes, Search, SearchError, SearchComplete, Load, LoadFail, LoadSuccess } from '../actions/administration-categories';
import { AdministrationCategory } from '../../models/administration-categories';

@Injectable()
export class AdministrationStoreEffects {
  /**
  * This effect does not yield any actions back to the store. Set
  * `dispatch` to false to hint to @ngrx/effects that it should
  * ignore any elements of this effect stream.
  *
  * The `defer` observable accepts an observable factory function
  * that is called when the observable is subscribed to.
  * Wrapping the database open call in `defer` makes
  * effect easier to test.
  */
  constructor(private administrationDataService: AdministrationDataService, private actions$: Actions) { }

  @Effect()
  loadadministrationCategoriesRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(
      AdministrationCategoryListActionTypes.Load
    ),
    switchMap(action =>
      this.administrationDataService
        .getAgencyCategories()
        .pipe(
          map(
            (itemsAdministrationCategory: AdministrationCategory[]) =>
              new LoadSuccess(itemsAdministrationCategory)
          ),
          catchError(error =>
            observableOf(new LoadFail(error)
            )
          )
        )
    ));
}

