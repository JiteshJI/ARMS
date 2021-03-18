import { Injectable } from '@angular/core';
import { AgencyDataService } from '../../services/agencyinfo.service';
import * as fromAgencyAction from '../actions/agency.actions';
import { mergeMap, map, tap, switchMap, catchError } from 'rxjs/operators';
import { AgencyDetailModel, AdministrationCategory } from '../../models/agencydetails.module';
import { Observable, of, from } from 'rxjs';
import { AgencyListActionTypes, LoadSuccess, LoadFail } from '../actions/agency.actions';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";


@Injectable()
export class AgencyEffects {
  constructor(private actions$: Actions,
    private agencyDataService: AgencyDataService) { }

  //Start: Effect for load agencies

  @Effect()
  loadAgencies$ = this.actions$.pipe(
    ofType<fromAgencyAction.LoadAgencyAction>(
      AgencyListActionTypes.LoadAgency
    ),
    switchMap((action: fromAgencyAction.LoadAgencyAction) =>
      this.agencyDataService.getAgencyDetailList().pipe(
        map(
          (result: AgencyDetailModel[]) =>
            new fromAgencyAction.LoadAgencySuccessAction(result)
        ),
        catchError(err => of(new fromAgencyAction.LoadAgencyFailAction(err)))
      )
    )
  );



  //Start: Effect for Add/Update agencies
  @Effect()
  CreateAgency$ = this.actions$.pipe(
    ofType<fromAgencyAction.AddAgencyAction>(
      AgencyListActionTypes.AddAgency
    ),
    map((action: fromAgencyAction.AddAgencyAction) => action.payload),
    mergeMap((customer: AgencyDetailModel) =>
      this.agencyDataService.createUpdateAgency(customer).pipe(
        map(
          (newCustomer: AgencyDetailModel) =>
            new fromAgencyAction.AddAgencyCompleteAction(newCustomer)
        ),
        catchError(err => of(new fromAgencyAction.AddAgencyErrorAction(err)))
      )
    )
  );

  @Effect()
  UpdateContactAgency$ = this.actions$.pipe(
    ofType<fromAgencyAction.EditAgencyAction>(fromAgencyAction.AgencyListActionTypes.EditAgency),
    tap(() => console.log('effect executed UpdateContactAgency')),
    mergeMap((action: fromAgencyAction.EditAgencyAction) =>
      this.agencyDataService.createUpdateAgency(action.payload).pipe(
        map((updatedContactAgency: AgencyDetailModel) => new fromAgencyAction.EditAgencyCompleteAction(updatedContactAgency)),
        catchError(err => of(new fromAgencyAction.EditAgencyErrorAction(err)))
      )
    )

  );

  @Effect()
  deleteAgency$ = this.actions$.pipe(
    ofType<fromAgencyAction.DeleteAgencyAction>(fromAgencyAction.AgencyListActionTypes.DeleteAgency),
    tap(() => console.log('effect executed UpdateContactAgency')),
    mergeMap((action: fromAgencyAction.DeleteAgencyAction) =>
      this.agencyDataService.deleteAgency(action.payload).pipe(
        map((updatedContactAgency: string) => new fromAgencyAction.DeleteAgencyCompleteAction(updatedContactAgency)),
        catchError(err => of(new fromAgencyAction.DeleteAgencyErrorAction(err)))
      )
    )

  );

  @Effect()
  loadadministrationCategoriesRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<fromAgencyAction.Load>(
      AgencyListActionTypes.Load
    ),
    switchMap(action =>
      this.agencyDataService
        .getAgencyCategories()
        .pipe(
          map(
            (itemsAdministrationCategory: AdministrationCategory[]) =>
              new LoadSuccess(itemsAdministrationCategory)
          ),
          catchError(error =>
            of(new LoadFail(error)
            )
          )
        )
    ));
}


