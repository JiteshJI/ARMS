import { Action } from '@ngrx/store';
import { FundingTypeListAdministration } from '../../models/administration-categories';

export enum FundingTypeListActionTypes {
  Load = '[Funding Type List] Load',
  LoadSuccess = '[Funding Type List] Load Success',
  LoadFail = '[Funding Type List] Load Fail',
}

export class Load implements Action {
  readonly type = FundingTypeListActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = FundingTypeListActionTypes.LoadSuccess;

  constructor(public payload: FundingTypeListAdministration[]) { }
}

export class LoadFail implements Action {
  readonly type = FundingTypeListActionTypes.LoadFail;

  constructor(public payload: any) { }
}

export type FundingTypeListActions =
  Load
  | LoadSuccess
  | LoadFail;
