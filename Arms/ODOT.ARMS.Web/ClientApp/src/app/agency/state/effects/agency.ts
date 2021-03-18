/// <reference path="../../services/administration-data.service.ts" />
/// <reference path="../../models/administration-categories.ts" />
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf, of } from 'rxjs';
import { catchError, map, startWith, switchMap, tap, mergeMap } from 'rxjs/operators';
import { AdministrationDataService } from '../../services/administration-data.service';

import { AgencyListActionTypes, Load, LoadFail, LoadSuccess, AddAgencyDetail, AddAgencyComplete, AddAgencyError } from '../actions/agency';
import { AgencyDetail, AddAgency } from '../../models/administration-categories';


@Injectable()
export class AgencyListStoreEffects {
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
  loadSpecificListRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(
      AgencyListActionTypes.Load
    ),
    switchMap(action =>
      this.administrationDataService
        .getAgencyDetail()
        .pipe(
          map(
          (itemsSpecificListAdministration: AgencyDetail[]) =>
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

  @Effect()
  addAgency$ = this.actions$.pipe(
    ofType<AddAgencyDetail>(AgencyListActionTypes.AddAgency),
    tap(() => console.log('effect executed addAgency')),
    mergeMap((action: AddAgencyDetail) =>
      this.administrationDataService.createNewAgency(action.payload).pipe(
        map((newContact: AddAgency) => new AddAgencyComplete(newContact)),
        catchError(err => of(new AddAgencyError(err)))
      )
    )
  );

  //@Effect()
  //addAgency = this.actions$.pipe(
  //  ofType<AddAgencyDetail>(AgencyListActionTypes.AddAgency),
  //  switchMap(action => 
  //   this.administrationDataService.createNewAgency(action.payload).pipe(
  //     switchMap((newAgency: AddAgency) => [
  //       //new LoadSuccessNotification('New Agency added successfully!!'),
  //       new AddAgencyComplete(newAgency)
  //     ]),
  //      catchError(error => {
  //        /* Read the error data from the server and set it as a payload for the Failure action so we can show the error messages on the screen */
  //        return [
  //         //new LoadErrorNotification(error.errors)
  //        ];
  //      })
  //   )
  // )
  //);

  //@Effect()
  //deleteParcel = this.actions$.pipe(
  //  ofType<DeleteParcel>(ParcelDetailsPageActionTypes.DeleteParcel),
  //  withLatestFrom(this.store.select(fromProject.selectProjectId)),
  //  switchMap(([action, projectId]: [DeleteParcel, string]) =>
  //    this.projectService.deleteParcel(projectId, action.payload).pipe(
  //      switchMap(() => [
  //        new LoadSuccessNotification('Parcel deleted successfully!!'),
  //        new DeleteParcelComplete(action.payload),
  //        new NavigateToEditProject(projectId)
  //      ]),
  //      catchError(error => {
  //        /* Read the error data from the server and set it as a payload for the Failure action so we can show the error messages on the screen */
  //        return [
  //          new LoadErrorNotification(error.errors)
  //        ];
  //      })
  //    )
  //  )
  //);

}

