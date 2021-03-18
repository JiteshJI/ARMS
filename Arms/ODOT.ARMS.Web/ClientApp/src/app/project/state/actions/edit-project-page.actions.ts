// <reference path="../../models/administration-categories.ts" />
import { Action } from '@ngrx/store';
import { GenericLookupListForDD, ProjectTypesList, VendorAddressForDD } from '../../models/project-for-update';
//import { ProjectForUpdate } from ',,/../models/project-to-update';

export enum EditProjectPageActionTypes {
  LoadProjectToEdit = '[EditProjectPage] Load ProjectToEdit',
  LoadProjectStatus = '[Project Status] Load Project Status',
  LoadProjectStatusSuccess = '[Project Status Success] Load Project Status Success',
  LoadProjectStatusFail = '[Project Status Success] Load Project Status  Fail',

  LoadProjectTypesLoad = '[Project Types] Load Project Types',
  LoadProjectTypesSuccess = '[Project Types Success] Load Project Types Success',
  LoadProjectTypesFail = '[Project Types Success] Load Project Types  Fail',

  LoadVendorAddressLoad = '[Vendor Address] Load Vendor Address',
  LoadVendorAddressSuccess = '[Vendor Address Success] Load Vendor Address Success',
  LoadVendorAddressFail = '[Vendor Address Success] Load Vendor Address  Fail',

}


export class LoadProjectToEdit implements Action {
  readonly type = EditProjectPageActionTypes.LoadProjectToEdit;

  constructor(public payload: string) { }
}

export class LoadProjectStatus implements Action {
  readonly type = EditProjectPageActionTypes.LoadProjectStatus;
  constructor() { }
}

export class LoadProjectSuccess implements Action {
  readonly type = EditProjectPageActionTypes.LoadProjectStatusSuccess;
  constructor(public payload: GenericLookupListForDD[]) { }
}

export class LoadProjectStatusFail implements Action {
  readonly type = EditProjectPageActionTypes.LoadProjectStatusFail;

  constructor(public payload: string) { }
}

export class LoadProjectTypes implements Action {
  readonly type = EditProjectPageActionTypes.LoadProjectTypesLoad;
  constructor() { }
}

export class LoadProjectTypesSuccess implements Action {
  readonly type = EditProjectPageActionTypes.LoadProjectTypesSuccess;
  constructor(public payload: GenericLookupListForDD[]) { }
}

export class LoadProjectTypesFail implements Action {
  readonly type = EditProjectPageActionTypes.LoadProjectTypesFail;

  constructor(public payload: string) { }
}

export class LoadVendorAddressLoad implements Action {
  readonly type = EditProjectPageActionTypes.LoadVendorAddressLoad;
  constructor(public payload: string) { }
}

export class LoadVendorAddressSuccess implements Action {
  readonly type = EditProjectPageActionTypes.LoadVendorAddressSuccess;
  constructor(public payload: VendorAddressForDD[]) { }
}

export class LoadVendorAddressFail implements Action {
  readonly type = EditProjectPageActionTypes.LoadVendorAddressFail;

  constructor(public payload: string) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type EditProjectPageActions =
  | LoadProjectToEdit
  | LoadProjectStatus
  | LoadProjectSuccess
  | LoadProjectStatusFail
  | LoadProjectTypes
  | LoadProjectTypesSuccess
  | LoadProjectTypesFail
  | LoadVendorAddressLoad
  | LoadVendorAddressSuccess
  | LoadVendorAddressFail
