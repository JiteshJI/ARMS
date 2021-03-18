import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf, of } from 'rxjs';
import { catchError, map, startWith, switchMap, mergeMap, concatMap } from 'rxjs/operators';
import { AdministrationDataService } from '../../services/administration-data.service';
import { AdministrationCategoryTypes } from '../actions/administration-categories';

@Injectable()
export class AdministrationStoreEffects {
  constructor(private administrationDataService: AdministrationDataService, private actions$: Actions) { }
  loadAdministrationCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministrationCategoryTypes.loadadministrationCategories),
      concatMap(() => this.administrationDataService.getAgencyCategories()),
      map(addadministrationCategoryList => AdministrationCategoryTypes.administrationCategoryLoaded({ addadministrationCategoryList }))
    )
  );

  CreateAdministrationCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministrationCategoryTypes.addAdministrationCategoryAction),
      concatMap((action) => this.administrationDataService.createAdministrationCategory(action.addadministrationCategory))
    ),
    { dispatch: false }
  );

  UpdateAdministrationCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministrationCategoryTypes.editAdministrationCategoryAction),
      concatMap((action) => this.administrationDataService.UpdateAdministrationCategory(action.updateAdministrationCategory.id, action.updateAdministrationCategory.changes))
    ),
    { dispatch: false }
  );
}
