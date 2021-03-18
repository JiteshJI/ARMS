import { Action } from '@ngrx/store';
import { AgencyDetailModel, AdministrationCategory } from '../../models/agencydetails.module';
import { Update } from '@ngrx/entity';


export enum AgencyListActionTypes {
  InitializeCurrentAgency = '[Agency] INITIALIZE Current agency',
  LoadAgency = '[Agency List] Load',
  LoadAgencySuccess = '[Agency List] Load Success',
  LoadAgencyFail = '[Agency List] Load Fail',
  AddAgency = '[AddAgency] Add Agency',
  AddAgencyComplete = '[AgencyDetailsPage] Add Agency Complete',
  AddAgencyError = '[AgencyDetailsPage] Add Agency Error',

  EditAgency = '[EditAgency] Update Agency',
  EditAgencyComplete = '[EditDetailsPage] Update Agency Complete',
  EditAgencyError = '[EditDetailsPage] Update Agency Error',

  DeleteAgency = '[AgencyDetailsPage] Delete Agency',
  DeleteAgencyComplete = '[AgencyDetailsPage] Delete Agency Complete',
  DeleteAgencyError = '[AgencyDetailsPage] Delete Agency Error',

  Load = '[Administration Category] Load',
  Select = '[Administration Category] Select',
  LoadSuccess = '[Administration Category] Load Success',
  LoadFail = '[Administration Category] Load Fail',


  type = "type"
}

export class InitializeCurrentAgency implements Action {

  readonly type = AgencyListActionTypes.InitializeCurrentAgency;

  constructor(public payload: AgencyDetailModel) { }
}

export class LoadAgencyAction implements Action {

  readonly type = AgencyListActionTypes.LoadAgency;

  constructor() { }
}

export class LoadAgencySuccessAction implements Action {

  readonly type = AgencyListActionTypes.LoadAgencySuccess;
  constructor(public payload: AgencyDetailModel[]) { }
}

export class LoadAgencyFailAction implements Action {

  readonly type = AgencyListActionTypes.LoadAgencyFail;
  constructor(public payload: string) { }
}

export class AddAgencyAction implements Action {
  readonly type = AgencyListActionTypes.AddAgency;

  constructor(public payload: AgencyDetailModel) { }
}

export class AddAgencyCompleteAction implements Action {
  readonly type = AgencyListActionTypes.AddAgencyComplete;

  constructor(public payload: AgencyDetailModel) { }
}

export class AddAgencyErrorAction implements Action {
  readonly type = AgencyListActionTypes.AddAgencyError;

  constructor(public payload: string) { }
}

export class EditAgencyAction implements Action {
  readonly type = AgencyListActionTypes.EditAgency;

  constructor(public payload: AgencyDetailModel) { }
}

export class EditAgencyCompleteAction implements Action {
  readonly type = AgencyListActionTypes.EditAgencyComplete;

  constructor(public payload: AgencyDetailModel) { }
}

export class EditAgencyErrorAction implements Action {
  readonly type = AgencyListActionTypes.EditAgencyError;

  constructor(public payload: string) { }
}

export class DeleteAgencyAction implements Action {
  readonly type = AgencyListActionTypes.DeleteAgency;

  constructor(public payload: AgencyDetailModel) { }
}

export class DeleteAgencyCompleteAction implements Action {
  readonly type = AgencyListActionTypes.DeleteAgencyComplete;

  constructor(public payload: string) { }
}

export class DeleteAgencyErrorAction implements Action {
  readonly type = AgencyListActionTypes.DeleteAgencyError;

  constructor(public payload: string) { }
}


export class Load implements Action {
  readonly type = AgencyListActionTypes.Load;

  constructor() { }
}

export class Select implements Action {
  readonly type = AgencyListActionTypes.Select;

  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = AgencyListActionTypes.LoadSuccess;

  constructor(public payload: AdministrationCategory[]) { }
}

export class LoadFail implements Action {
  readonly type = AgencyListActionTypes.LoadFail;

  constructor(public payload: string) { }
}

export type AgencyActions =
  | InitializeCurrentAgency
  | LoadAgencyAction
  | LoadAgencySuccessAction
  | LoadAgencyFailAction
  | AddAgencyAction
  | AddAgencyCompleteAction
  | AddAgencyErrorAction
  | EditAgencyAction
  | EditAgencyCompleteAction
  | EditAgencyErrorAction
  | DeleteAgencyAction
  | DeleteAgencyCompleteAction
  | DeleteAgencyErrorAction
  | Load
  | LoadSuccess
  | Select
  | LoadFail;

//export enum AgencyListActionTypes {
//  InitializeCurrentAgency = '[Agency] INITIALIZE Current agency',
//  LOAD_AGENCIES = "[AGENCY] Load AGENCIES",
//  LOAD_AGENCIES_SUCCESS = "[AGENCY] Load AGENCIES Success",
//  LOAD_AGENCIES_FAIL = "[AGENCY] Load AGENCIES Fail",
//  CREATE_AGENCY = "[AGENCY] Create AGENCY",
//  CREATE_AGENCY_SUCCESS = "[AGENCY] Create AGENCY Success",
//  CREATE_AGENCY_FAIL = "[AGENCY] Create AGENCY Fail",
//  UPDATE_AGENCY = "[AGENCY] Update AGENCY",
//  UPDATE_AGENCY_SUCCESS = "[AGENCY] Update AGENCY Success",
//  UPDATE_AGENCY_FAIL = "[AGENCY] Update AGENCY Fail",
//  DELETE_AGENCY = "[AGENCY] Delete AGENCY",
//  DELETE_AGENCY_SUCCESS = "[AGENCY] Delete AGENCY Success",
//  DELETE_AGENCY_FAIL = "[AGENCY] Delete AGENCY Fail"
//}


//export class InitializeCurrentAgency implements Action {

//  readonly type = AgencyListActionTypes.InitializeCurrentAgency;

//  constructor(public payload: AgencyDetailModel) { }
//}

//export class LoadAgencyAction implements Action {

//  readonly type = AgencyListActionTypes.LOAD_AGENCIES;

//  constructor() { }
//}

//export class LoadAgencies implements Action {
//  readonly type = AgencyListActionTypes.LOAD_AGENCIES;
//}


//export class LoadAgenciesSuccess implements Action {
//  readonly type = AgencyListActionTypes.LOAD_AGENCIES_SUCCESS;

//  constructor(public payload: AgencyDetailModel[]) { }
//}

//export class LoadAgenciesFail implements Action {
//  readonly type = AgencyListActionTypes.LOAD_AGENCIES_FAIL;

//  constructor(public payload: any) { }
//}

////export class LoadAGENCY implements Action {
////  readonly type = AgencyListActionTypes.LOAD_AGENCY;

////  constructor(public payload: number) { }
////}

////export class LoadAGENCIESuccess implements Action {
////  readonly type = AgencyListActionTypes.LOAD_AGENCY_SUCCESS;

////  constructor(public payload: AgencyDetailModel) { }
////}

////export class LoadAGENCYFail implements Action {
////  readonly type = AgencyListActionTypes.LOAD_AGENCY_FAIL;

////  constructor(public payload: string) { }
////}

//export class CreateAGENCY implements Action {
//  readonly type = AgencyListActionTypes.CREATE_AGENCY;

//  constructor(public payload: AgencyDetailModel) { }
//}

//export class CreateAGENCIESuccess implements Action {
//  readonly type = AgencyListActionTypes.CREATE_AGENCY_SUCCESS;

//  constructor(public payload: AgencyDetailModel) { }
//}

//export class CreateAGENCYFail implements Action {
//  readonly type = AgencyListActionTypes.CREATE_AGENCY_FAIL;

//  constructor(public payload: string) { }
//}

//export class UpdateAGENCY implements Action {
//  readonly type = AgencyListActionTypes.UPDATE_AGENCY;

//  constructor(public payload: AgencyDetailModel) { }
//}

//export class UpdateAGENCIESuccess implements Action {
//  readonly type = AgencyListActionTypes.UPDATE_AGENCY_SUCCESS;

//  constructor(public payload: Update<AgencyDetailModel>) { }
//}

//export class UpdateAGENCYFail implements Action {
//  readonly type = AgencyListActionTypes.UPDATE_AGENCY_FAIL;

//  constructor(public payload: string) { }
//}

//export class DeleteAGENCY implements Action {
//  readonly type = AgencyListActionTypes.DELETE_AGENCY;

//  constructor(public payload: any) { }
//}

//export class DeleteAGENCIESuccess implements Action {
//  readonly type = AgencyListActionTypes.DELETE_AGENCY_SUCCESS;

//  constructor(public payload: any) { }
//}

//export class DeleteAGENCYFail implements Action {
//  readonly type = AgencyListActionTypes.DELETE_AGENCY_FAIL;

//  constructor(public payload: string) { }
//}

//export type AgencyActions =
//  | InitializeCurrentAgency
//  | LoadAgencies
//  | LoadAgenciesSuccess
//  | LoadAgenciesFail
//  | CreateAGENCY
//  | CreateAGENCIESuccess
//  | CreateAGENCYFail
//  | UpdateAGENCY
//  | UpdateAGENCIESuccess
//  | UpdateAGENCYFail
//  | DeleteAGENCY
//  | DeleteAGENCIESuccess
//  | DeleteAGENCYFail;
