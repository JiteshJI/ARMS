import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on, createSelector, createFeatureSelector } from "@ngrx/store";
import { fundingActionTypes } from '../actions/funding.actions';
import { FundingRaw } from '../../models/fundings-raw';

//**************************************Fundings***********************************************************************//

export interface FundingState extends EntityState<FundingRaw> {
  isLoading: false;
  error: null;
  SelectedFundings: FundingRaw;
}

export const adapterFunding: EntityAdapter<FundingRaw> = createEntityAdapter<FundingRaw>({
  selectId: (funding: FundingRaw) => funding.encumbranceId,
  sortComparer: false,
});

export const initialState: FundingState = adapterFunding.getInitialState({
  isLoading: false,
  error: null,
  SelectedFundings: null,
});

export const fundingReducer = createReducer(
  initialState,

  on(fundingActionTypes.selectedFundingsLoaded, (state, action) => {
    //return adapterFunding.addAll(
    return adapterFunding.setAll(
      action.SelectedFundings,    //.SelectedFundings,
      { ...state, projectLoaded: false }
    );
  }),
  on(fundingActionTypes.addFundingsuccess, (state, action) => {
    return adapterFunding.addOne(action.Funding, state);
  }),
  on(fundingActionTypes.updateFundingsuccess, (state, action) => {
    return adapterFunding.upsertOne(action.Funding, state);
  }),
);
export const { selectAll, selectIds } = adapterFunding.getSelectors();

export const courseFeatureSelector = createFeatureSelector<FundingState>('Fundings');

export const getAllFundings = createSelector(
  courseFeatureSelector,
  selectAll
);

//**************************************Fundings***********************************************************************//
