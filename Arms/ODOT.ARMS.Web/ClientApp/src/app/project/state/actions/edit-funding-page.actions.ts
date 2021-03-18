import { createAction, props } from '@ngrx/store';
import { FundingRaw } from '../../models/fundings-raw';
import { PhaseRaw } from '../../models/phase-raw';

export const loadProjectFunding = createAction(
  '[EditFinFundingPage] Load ProjectFunding',
  props<{ Funding: FundingRaw[] }>()
);

export const loadProjectPhaseList = createAction(
  '[EditFinFundingPage] Load PhaseList',
  props<{ phases: PhaseRaw[] }>()
);

export const setSelectedFunding = createAction(
  '[EditFinFundingPage] Set Selected ProjectFunding',
  props<{ Funding: FundingRaw }>()
);

export const setSelectedUploadFunding = createAction(
  '[EditFinFundingPage] Set Selected ProjectUploadFunding',
  props<{ Funding: FundingRaw }>()
);

export const updateFundingDocCount = createAction(
  '[EditFinFundingPage] Update Funding Doc Count',
  props<{ Funding: FundingRaw }>()
);

export const addFunding = createAction(
  '[EditFinFundingPage] Add ProjectFunding',
  props<{ Funding: FundingRaw }>()
);

export const addFundingSuccess = createAction(
  '[EditFinFundingPage] Add ProjectFunding Success',
  props<{ Funding: FundingRaw }>()
);

export const addFundingFailure = createAction(
  '[EditFinFundingPage] Add ProjectFunding Failed',
  props<{ error: string }>()
);

export const updateFunding = createAction(
  '[EditFinFundingPage] Update ProjectFunding',
  props<{ Funding: FundingRaw }>()
);

export const updateFundingSuccess = createAction(
  '[EditFinFundingPage] Update ProjectFunding Success',
  props<{ Funding: FundingRaw }>()
);

export const updateFundingFailure = createAction(
  '[EditFinFundingPage] Update ProjectFunding Failed',
  props<{ error: string }>()
);

export const setSaveFundingDialogStatus = createAction(
  '[EditFinFundingPage] Set Save Funding Dialog Status',
  props<{ status: boolean }>()
);



export const editFinFundingPageActionTypes = {
  loadProjectFunding,
  loadProjectPhaseList,
  setSelectedFunding,
  setSelectedUploadFunding,//remove
  updateFundingDocCount,
  addFunding,
  addFundingSuccess,
  addFundingFailure,
  updateFunding,
  updateFundingSuccess,
  updateFundingFailure,
  setSaveFundingDialogStatus
};

