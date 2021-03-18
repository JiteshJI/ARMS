import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { coreActionTypes } from '../actions/core.actions';
import { tap, concatMap, map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { referenceDataActionTypes } from '../actions/reference-data.actions';
import { ReferenceDataService } from '../../services/reference-data.service';
import { of } from 'rxjs';



@Injectable()
export class CoreEffects {

  public horizontal: 'left' | 'center' | 'right' = 'center';
  public vertical: 'top' | 'bottom' = 'bottom';

  //loadSuccessNotification$ = createEffect(() =>
  //  this.actions$.pipe(
  //    ofType(coreActionTypes.navigateToNotFound),
  //    tap(action => {
  //      this.router.navigate(['/404']);
  //    })
  //  ),
  //  { dispatch: false }
  //);

  //@Effect({ dispatch: false })
  //loadSuccessNotification = this.actions$.pipe(
  //  ofType<LoadSuccessNotification>(CoreActionTypes.LoadSuccessNotification),
  //  tap(action => {
  //    this.notificationService.show({
  //      content: action.payload,
  //      animation: { type: 'fade', duration: 800 },
  //      type: { style: 'success', icon: true },
  //      position: { horizontal: this.horizontal, vertical: this.vertical }
  //    });
  //  })
  //);

  //@Effect({ dispatch: false })
  //loadErrorNotification = this.actions$.pipe(
  //  ofType<LoadErrorNotification>(CoreActionTypes.LoadErrorNotification),
  //  tap(action => {
  //    let notificationRef: NotificationRef = this.notificationService.show({
  //      content: ErrorNotificationComponent,
  //      animation: { type: 'fade', duration: 800 },
  //      type: { style: 'error', icon: true },
  //      position: { horizontal: this.horizontal, vertical: this.vertical },
  //      closable: true
  //    });
  //    (<ErrorNotificationComponent>notificationRef.content.instance).validationErrors = action.payload;
  //  })
  //);


  navigateToNotFound$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coreActionTypes.navigateToNotFound),
      tap(action => {
        this.router.navigate(['/404']);
      })
    ),
    { dispatch: false }
  );

  loadProjectEventsReferenceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(referenceDataActionTypes.loadProjectEventsReferenceData),
      switchMap((action) =>
        this.referenceDataService.loadProjectEventsReferenceData().pipe(
          map(refData => referenceDataActionTypes.loadProjectEventsReferenceDataSuccess({ data: refData }))
        )
      ),

      catchError(err => of(referenceDataActionTypes.loadProjectEventsReferenceDataFailure({ error: err })))

    )
  );

  // Reference load for Controlling Board
  loadProjectCBReferenceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(referenceDataActionTypes.loadProjectCBReferenceData),
      switchMap((action) =>
        this.referenceDataService.loadProjectCBReferenceData().pipe(
          map(refData => referenceDataActionTypes.loadProjectCBReferenceDataSuccess({ data: refData }))
        )
      ),
      catchError(err => of(referenceDataActionTypes.loadProjectCBReferenceDataFailure({ error: err })))
    )
  );

  loadProjectPhaseReferenceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(referenceDataActionTypes.loadProjectPhaseReferenceData),
      switchMap((action) =>
        this.referenceDataService.loadProjectPhaseReferenceData().pipe(
          map(refData => referenceDataActionTypes.loadProjectPhaseReferenceDataSuccess({ data: refData }))
        )
      ),
      catchError(err => of(referenceDataActionTypes.loadProjectPhaseReferenceDataFailure({ error: err })))
    )
  );

  loadProjectInvoiceReferenceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(referenceDataActionTypes.loadInvoiceReferenceData),
      switchMap((action) =>
        this.referenceDataService.loadInvoiceReferenceData().pipe(
          map(refData => referenceDataActionTypes.loadInvoiceReferenceDataSuccess({ data: refData }))
        )
      ),
      catchError(err => of(referenceDataActionTypes.loadInvoiceReferenceDataFailure({ error: err })))
    )
  );

  loadProjectBudgetReferenceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(referenceDataActionTypes.loadProjectBudgetReferenceData),
      switchMap((action) =>
        this.referenceDataService.loadBudgetCategoriesReferenceData().pipe(
          map(refData => referenceDataActionTypes.loadProjectBudgetReferenceDataSuccess({ budgetCategories: refData }))
        )
      ),
      catchError(err => of(referenceDataActionTypes.loadProjectBudgetReferenceDataFailure({ error: err })))
    )
  );

  loadFundingReferenceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(referenceDataActionTypes.loadFundingReferenceData),
      switchMap((action) =>
        this.referenceDataService.loadFundingReferenceData().pipe(
          map(refData => referenceDataActionTypes.loadFundingReferenceDataSuccess({ data: refData }))
        )
      ),
      catchError(err => of(referenceDataActionTypes.loadFundingReferenceDataFailure({ error: err })))
    )
  );


  constructor(private actions$: Actions,
    private router: Router,
    private referenceDataService: ReferenceDataService) { }

}
