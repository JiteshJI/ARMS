/// <reference path="../../models/administration-categories.ts" />
import { Action } from '@ngrx/store';
import { SpecificListAdministration } from '../../models/administration-categories';

export enum SpecificListActionTypes {
  Load = '[Specific List] Load',
  LoadSuccess = '[Specific List] Load Success',
  LoadFail = '[Specific List] Load Fail',
}

export class Load implements Action {
  readonly type = SpecificListActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = SpecificListActionTypes.LoadSuccess;

  constructor(public payload: SpecificListAdministration[]) { }
}

export class LoadFail implements Action {
  readonly type = SpecificListActionTypes.LoadFail;

  constructor(public payload: any) { }
}

export type SpecificListActions =
  Load
  | LoadSuccess
  | LoadFail;
