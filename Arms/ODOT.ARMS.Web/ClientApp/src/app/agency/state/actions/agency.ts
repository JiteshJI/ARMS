/// <reference path="../../models/administration-categories.ts" />
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AgencyDetail , AddAgency} from '../../models/administration-categories';

export enum AgencyListActionTypes {
  Load = '[Agency List] Load',
  LoadSuccess = '[Agency List] Load Success',
  LoadFail = '[Agency List] Load Fail',
  AddAgency = '[AddAgency] Add Agency',
  AddAgencyComplete = '[AgencyDetailsPage] Add Agency Complete',
  AddAgencyError = '[AgencyDetailsPage] Add Agency Error',
  DeleteAgency = '[AgencyDetailsPage] Delete Agency',
  DeleteAgencyComplete = '[AgencyDetailsPage] Delete Agency Complete',
  DeleteAgencyError = '[AgencyDetailsPage] Delete Agency Error',
  UpdateAgency = '[AgencyDetailsPage] Update Agency Complete'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Load implements Action {
  readonly type = AgencyListActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = AgencyListActionTypes.LoadSuccess;

  constructor(public payload: AgencyDetail[]) { }
}

export class LoadFail implements Action {
  readonly type = AgencyListActionTypes.LoadFail;

  constructor(public payload: any) { }
}

export class AddAgencyDetail implements Action {
  readonly type = AgencyListActionTypes.AddAgency;

  constructor(public payload: AddAgency) { }
}

export class AddAgencyComplete implements Action {
  readonly type = AgencyListActionTypes.AddAgencyComplete;

  constructor(public payload: AddAgency) { }
}

export class AddAgencyError implements Action {
  readonly type = AgencyListActionTypes.AddAgencyError;

  constructor(public payload: string) { }
}

export class DeleteAgency implements Action {
  readonly type = AgencyListActionTypes.DeleteAgency;

  constructor(public payload: string) { }
}

export class DeleteAgencyComplete implements Action {
  readonly type = AgencyListActionTypes.DeleteAgencyComplete;

  constructor(public payload: string) { }
}

export class DeleteAgencyError implements Action {
  readonly type = AgencyListActionTypes.DeleteAgencyError;

  constructor(public payload: any) { }
}

export class UpdateAgency implements Action {
  readonly type = AgencyListActionTypes.UpdateAgency;

  constructor(public payload: Update<AgencyDetail>) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AgencListActions=
  Load
  | LoadSuccess
  | LoadFail
  | LoadSuccess
  | AddAgencyDetail
  | AddAgencyComplete
  | AddAgencyError
  | DeleteAgency
  | DeleteAgencyComplete
  | DeleteAgencyError
  | UpdateAgency;
