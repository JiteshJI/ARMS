import { Action } from '@ngrx/store';
import { GenericLookupListForDD, ProjectTypesList, VendorAddressForDD, WarehouseData } from '../../models/project-for-update';
import { PassProjectData, Project } from '../../models/projects';


export enum EditProjectPageActionTypes {
  LoadProjectToEdit = '[EditProjectPage] Load ProjectToEdit',
  LoadProjectStatus = '[Project Status] Load Project Status',
  LoadProjectStatusSuccess = '[Project Status Success] Load Project Status Success',
  LoadProjectStatusFail = '[Project Status Success] Load Project Status  Fail',

  LoadProjectTypesLoad = '[Project Types] Load Project Types',
  LoadProjectTypesSuccess = '[Project Types Success] Load Project Types Success',
  LoadProjectTypesFail = '[Project Types Success] Load Project Types  Fail',

  LoadCBCategoryLoad = '[CB Category Load] Load CB Category',
  LoadCBCategorySuccess = '[CB Category Success] Load CB Category Success',
  LoadCBCategoryFail = '[CB Category Fail] Load CB Category  Fail',

  LoadCBType = '[CBType Load] Load CBType',
  LoadCBTypeSuccess = '[CBType Success]  CBType Success',
  LoadCBTypeFail = '[CBType Fail]  CBType  Fail',

  LoadVendorAddressLoad = '[Vendor Address] Load Vendor Address',
  LoadVendorAddressSuccess = '[Vendor Address Success] Load Vendor Address Success',
  LoadVendorAddressFail = '[Vendor Address Success] Load Vendor Address  Fail',
  LoadCurrentProject = 'Load Navigation State',
  LoadTempProject = 'Load Current Project',

  PrimaryEventsLoad = '[Primary Events Load] PrimaryEvents Load',
  PrimaryEventsSuccess = '[Primary Events Success] Primary Events Success',
  PrimaryEventsFail = '[PrimaryEvents Fail] PrimaryEvents Fail',

  SecondaryEventsLoad = '[Secondary Events Load] Secondary Events Load',
  SecondaryEventsSuccess = '[Secondary Events Success] Secondary Events Success',
  SecondaryEventsFail = '[Secondary Events Fail] Secondary Events Fail',

  PhaseStatusLoad = '[Phase Status Load] Phase Status Load',
  PhaseStatusSuccess = '[Phase Status Success] Phase Status Success',
  PhaseStatusFail = '[Phase Status Fail] Phase Status Fail',

  WarehouseDetailLoad = '[Warehouse Detail Load] Warehouse Detail Load',
  WarehouseDetailSuccess = '[Warehouse Detail Success] Warehouse Detail Success',
  WarehouseDetailFail = '[Warehouse Detail Fail] Warehouse Detail Fail',

  CBStatusLoad = '[CB Status Load] CB Status Load',
  CBStatusSuccess = '[CB Status Success] CB Status Success',
  CBStatusFail = '[CB Status Fail] CB Status Fail',
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

export class LoadCBCategoryLoad implements Action {
  readonly type = EditProjectPageActionTypes.LoadCBCategoryLoad;
  constructor() { }
}

export class LoadCBCategorySuccess implements Action {
  readonly type = EditProjectPageActionTypes.LoadCBCategorySuccess;
  constructor(public payload: GenericLookupListForDD[]) { }
}

export class LoadCBCategoryFail implements Action {
  readonly type = EditProjectPageActionTypes.LoadCBCategoryFail;

  constructor(public payload: string) { }
}

export class LoadCBTypeLoad implements Action {
  readonly type = EditProjectPageActionTypes.LoadCBType;
  constructor() { }
}

export class LoadCBTypeSuccess implements Action {
  readonly type = EditProjectPageActionTypes.LoadCBTypeSuccess;
  constructor(public payload: GenericLookupListForDD[]) { }
}

export class LoadCBTypeFail implements Action {
  readonly type = EditProjectPageActionTypes.LoadCBTypeFail;

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

export class LoadCurrentProject implements Action {
  readonly type = EditProjectPageActionTypes.LoadCurrentProject;
  constructor(public payload: PassProjectData) { }
}
export class LoadTempProject implements Action {
  readonly type = EditProjectPageActionTypes.LoadTempProject;
  constructor(public payload: Project) { }
}

// Load Primary Events
export class PrimaryEventsLoad implements Action {
  readonly type = EditProjectPageActionTypes.PrimaryEventsLoad;
  constructor() { }
}

export class PrimaryEventsSuccess implements Action {
  readonly type = EditProjectPageActionTypes.PrimaryEventsSuccess;
  constructor(public payload: GenericLookupListForDD[]) { }
}
export class PrimaryEventsFail implements Action {
  readonly type = EditProjectPageActionTypes.PrimaryEventsFail;
  constructor(public payload: string) { }
}
// Load Secondary Events
export class SecondaryEventsLoad implements Action {
  readonly type = EditProjectPageActionTypes.SecondaryEventsLoad;
  constructor() { }
}

export class SecondaryEventsSuccess implements Action {
  readonly type = EditProjectPageActionTypes.SecondaryEventsSuccess;
  constructor(public payload: GenericLookupListForDD[]) { }
}
export class SecondaryEventsFail implements Action {
  readonly type = EditProjectPageActionTypes.SecondaryEventsFail;
  constructor(public payload: string) { }
}
// Load Phase Status
export class PhaseStatusLoad implements Action {
  readonly type = EditProjectPageActionTypes.PhaseStatusLoad;
  constructor() { }
}

export class PhaseStatusSuccess implements Action {
  readonly type = EditProjectPageActionTypes.PhaseStatusSuccess;
  constructor(public payload: GenericLookupListForDD[]) { }
}
export class PhaseStatusFail implements Action {
  readonly type = EditProjectPageActionTypes.PhaseStatusFail;
  constructor(public payload: string) { }
}
// CB Status
export class CBStatusLoad implements Action {
  readonly type = EditProjectPageActionTypes.CBStatusLoad;
  constructor() { }
}

export class CBStatusSuccess implements Action {
  readonly type = EditProjectPageActionTypes.CBStatusSuccess;
  constructor(public payload: GenericLookupListForDD[]) { }
}
export class CBStatusFail implements Action {
  readonly type = EditProjectPageActionTypes.CBStatusFail;
  constructor(public payload: string) { }
}
// Load Warehouse data by PID

export class WarehouseDetailLoad implements Action {
  readonly type = EditProjectPageActionTypes.WarehouseDetailLoad;
  constructor(public payload: number) { }
}

export class WarehouseDetailSuccess implements Action {
  readonly type = EditProjectPageActionTypes.WarehouseDetailSuccess;
  constructor(public payload: WarehouseData) { }
}
export class WarehouseDetailFail implements Action {
  readonly type = EditProjectPageActionTypes.WarehouseDetailFail;
  constructor(public payload: string) { }
}
export type ProjectForDD =
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
  | LoadCurrentProject
  | LoadTempProject
  | PrimaryEventsLoad
  | PrimaryEventsSuccess
  | PrimaryEventsFail
  | SecondaryEventsLoad
  | SecondaryEventsSuccess
  | SecondaryEventsFail
  | PhaseStatusLoad
  | PhaseStatusSuccess
  | PhaseStatusFail
  | WarehouseDetailLoad
  | WarehouseDetailSuccess
  | WarehouseDetailFail
  | LoadCBCategoryLoad
  | LoadCBCategorySuccess
  | LoadCBCategoryFail
  | LoadCBTypeLoad
  | LoadCBTypeSuccess
  | LoadCBTypeFail
  | CBStatusLoad
  | CBStatusSuccess
  | CBStatusFail;



