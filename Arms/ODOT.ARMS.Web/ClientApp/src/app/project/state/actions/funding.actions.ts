import { createAction, props } from "@ngrx/store";
//import { IFundings, FundingsRaw } from "../../models/Fundings";
import { FundingRaw } from '../../models/fundings-raw';
import { Update } from "@ngrx/entity";

//**************************Fundings***********************//
export const loadSelectedFunding = createAction(
  '[Selected Funding List] Load Selected Finding via Service',
  props<{ projectId: string }>()
);
export const selectedFundingsLoaded = createAction(
  '[Selected Funding Effect] Selected Funding Loaded Successfully',
  props<{ SelectedFundings: FundingRaw[] }>()
);
export const selectedFundingsFail = createAction(
  '[Selected Funding Effect] Selected Funding Loaded Fail',
  props<{ error: any }>()
);

export const addFunding = createAction(
  '[Create Funding Component] Create Funding',
  props<{ Funding: FundingRaw }>()
);

export const addFundingsuccess = createAction(
  '[Create Funding Success] Create Funding',
  props<{ Funding: FundingRaw }>()
);

export const updateFunding = createAction(
  '[Funding List Operations] Update Funding',
  props<{ Funding: FundingRaw }>()
);

export const updateFundingsuccess = createAction(
  '[Funding List Success] Update Funding',
  props<{ Funding: FundingRaw }>()
);

//**************************Fundings***********************//
export const fundingActionTypes = {
  loadSelectedFunding,
  selectedFundingsLoaded,
  selectedFundingsFail,
  addFunding,
  addFundingsuccess,
  updateFunding,
  updateFundingsuccess
};


