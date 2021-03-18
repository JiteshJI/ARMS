import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
//import { FindUserPageActionTypes, NavigateToSearch, NavigateToEditUser, Search, SearchComplete } from '../actions/find-user-page.actions';
import { tap, filter, withLatestFrom, map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { DataSourceRequestState } from '@progress/kendo-data-query';
//import * as fromMaintenance from "../reducers";
import { Store, select, Action } from '@ngrx/store';
import { Router } from '@angular/router';
//import { MaintenanceService } from '../../services/maintenance.service';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { LoadProjectToEdit, EditProjectPageActionTypes } from "../actions/projectForDD.actions";
import { ProjectService } from '../../services/project.service';
import { Observable, of } from 'rxjs';
import * as fromProjectAction from "../actions/projectForDD.actions"
import { GenericLookupListForDD, ProjectTypesList, VendorAddressForDD, WarehouseData } from '../../models/project-for-update';

@Injectable()

export class ProjectForDDEffects {

  /* This effect listens to any router navigation and filters to only do something if the
   * navigation happens to be to the Project Search page */
  @Effect()
  navigateToEditProjectPage = this.actions$.pipe(
      ofType<LoadProjectToEdit>(EditProjectPageActionTypes.LoadProjectToEdit),
    tap(action => {
      this.router.navigate(['/projects/edit/', action.payload]);
    })
  );
  @Effect()
  loadProjectStatusEffect$: Observable<Action> = this.actions$.pipe(
    ofType<fromProjectAction.LoadProjectStatus>(
      fromProjectAction.EditProjectPageActionTypes.LoadProjectStatus
    ),
    switchMap(action =>
      this.projectDataService
        .getProjectStatus()
        .pipe(
          map(
            (list: GenericLookupListForDD[]) =>
              new fromProjectAction.LoadProjectSuccess(list)
          ),
          catchError(error =>
            of(new fromProjectAction.LoadProjectStatusFail(error)
            )
          )
        )
    ));

  @Effect()
  loadProjectTypesEffect$: Observable<Action> = this.actions$.pipe(
    ofType<fromProjectAction.LoadProjectTypes>(
      fromProjectAction.EditProjectPageActionTypes.LoadProjectTypesLoad
    ),
    switchMap(action =>
      this.projectDataService
        .getProjectTypes()
        .pipe(
          map(
            (list: GenericLookupListForDD[]) =>
              new fromProjectAction.LoadProjectTypesSuccess(list)
          ),
          catchError(error =>
            of(new fromProjectAction.LoadProjectTypesFail(error)
            )
          )
        )
    ));

  @Effect()
  loadVendorAddressEffect$: Observable<Action> = this.actions$.pipe(
    ofType<fromProjectAction.LoadVendorAddressLoad>(
      fromProjectAction.EditProjectPageActionTypes.LoadVendorAddressLoad
    ),
    tap(() => console.log(' effect executed loadVendorAddressEffect$')),
    switchMap(action =>
      this.projectDataService
        .getVendorAddress(action.payload)
        .pipe(
          map(
            (list: VendorAddressForDD[]) =>
              new fromProjectAction.LoadVendorAddressSuccess(list)
          ),
          catchError(error =>
            of(new fromProjectAction.LoadVendorAddressFail(error)
            )
          )
        )
    ));

  @Effect()
  loadCBStatusEffect$: Observable<Action> = this.actions$.pipe(
    ofType<fromProjectAction.CBStatusLoad>(
      fromProjectAction.EditProjectPageActionTypes.CBStatusLoad
    ),
    switchMap(action =>
      this.projectDataService
        .getCBStatus()
        .pipe(
          map(
            (list: GenericLookupListForDD[]) =>
              new fromProjectAction.CBStatusSuccess(list)
          ),
          catchError(error =>
            of(new fromProjectAction.CBStatusFail(error)
            )
          )
        )
    ));

  @Effect()
  loadPrimaryEventsEffect$: Observable<Action> = this.actions$.pipe(
    ofType<fromProjectAction.PrimaryEventsLoad>(
      fromProjectAction.EditProjectPageActionTypes.PrimaryEventsLoad
    ),
    switchMap(action =>
      this.projectDataService
        .getPrimaryEvents()
        .pipe(
          map(
            (list: GenericLookupListForDD[]) =>
              new fromProjectAction.PrimaryEventsSuccess(list)
          ),
          catchError(error =>
            of(new fromProjectAction.PrimaryEventsFail(error)
            )
          )
        )
    ));

  @Effect()
  loadSecondaryEventsEffect$: Observable<Action> = this.actions$.pipe(
    ofType<fromProjectAction.SecondaryEventsLoad>(
      fromProjectAction.EditProjectPageActionTypes.SecondaryEventsLoad
    ),
    switchMap(action =>
      this.projectDataService
        .getSecondaryEvents()
        .pipe(
          map(
            (list: GenericLookupListForDD[]) =>
              new fromProjectAction.SecondaryEventsSuccess(list)
          ),
          catchError(error =>
            of(new fromProjectAction.SecondaryEventsFail(error)
            )
          )
        )
    ));

  @Effect()
  loadPhaseStatusEffect$: Observable<Action> = this.actions$.pipe(
    ofType<fromProjectAction.PhaseStatusLoad>(
      fromProjectAction.EditProjectPageActionTypes.PhaseStatusLoad
    ),
    switchMap(action =>
      this.projectDataService
        .getPhaseStatus()
        .pipe(
          map(
            (list: GenericLookupListForDD[]) =>
              new fromProjectAction.PhaseStatusSuccess(list)
          ),
          catchError(error =>
            of(new fromProjectAction.PhaseStatusFail(error)
            )
          )
        )
    ));
  @Effect()
  loadCBCategoryEffect$: Observable<Action> = this.actions$.pipe(
    ofType<fromProjectAction.LoadCBCategoryLoad>(
      fromProjectAction.EditProjectPageActionTypes.LoadCBCategoryLoad
    ),
    switchMap(action =>
      this.projectDataService
        .getCBCategory()
        .pipe(
          map(
            (list: GenericLookupListForDD[]) =>
              new fromProjectAction.LoadCBCategorySuccess(list)
          ),
          catchError(error =>
            of(new fromProjectAction.LoadCBCategoryFail(error)
            )
          )
        )
    ));
  @Effect()
  loadCBTypeEffect$: Observable<Action> = this.actions$.pipe(
    ofType<fromProjectAction.LoadCBTypeLoad>(
      fromProjectAction.EditProjectPageActionTypes.LoadCBType
    ),
    switchMap(action =>
      this.projectDataService
        .getCBType()
        .pipe(
          map(
            (list: GenericLookupListForDD[]) =>
              new fromProjectAction.LoadCBTypeSuccess(list)
          ),
          catchError(error =>
            of(new fromProjectAction.LoadCBTypeFail(error)
            )
          )
        )
    ));
  @Effect()
  loadWarehouseDetailById: Observable<Action> = this.actions$.pipe(
    ofType<fromProjectAction.WarehouseDetailLoad>(
      fromProjectAction.EditProjectPageActionTypes.WarehouseDetailLoad
    ),
    switchMap(action =>
      this.projectDataService
        .getWarehouseDetailsById(action.payload)
        .pipe(
          map(
            (list: WarehouseData) =>
              new fromProjectAction.WarehouseDetailSuccess(list)
          ),
          catchError(error =>
            of(new fromProjectAction.WarehouseDetailFail(error)
            )
          )
        )
    ));
  //constructor(private actions$: Actions, private store: Store<fromProject.State>, private router: Router, private projectService: ProjectService) { }
  constructor(private actions$: Actions, private router: Router, private projectDataService: ProjectService) { }

}
