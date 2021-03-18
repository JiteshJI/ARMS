import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromProjectFunding from '../reducers/edit-fin-funding-page.reducer';


export interface State { finFunding: fromProjectFunding.State; }
export const reducers: ActionReducerMap<State> = { finFunding: fromProjectFunding.fundingReducer };


/* creating a feature selector */
export const selectFundingState = createFeatureSelector<fromProjectFunding.State>('projectFunding');

/* creating default supported ngrx/entity selectors */

/** select IDs */
export const selectIds = createSelector(
  selectFundingState,
  fromProjectFunding.selectIds
);

/** selectAll */
export const selectAllfinFundings = createSelector(
  selectFundingState,
  fromProjectFunding.selectAll
);

/** selectEntities */
export const selectEntities = createSelector(
  selectFundingState,
  fromProjectFunding.selectAll
);

/** selectTotal */
export const selectTotal = createSelector(
  selectFundingState,
  fromProjectFunding.selectAll
);

export const selectfinFundingById = (projAltId: string) => createSelector(
  selectFundingState,
  (finFundingById) => finFundingById.entities[projAltId]
);

export const selectfinFundingStateloaded = createSelector(
  selectFundingState,
  fromProjectFunding.getAllFunding
);
export const getSelectedFunding = createSelector(
  selectFundingState,
  fromProjectFunding.getSelectedFunding
);
export const getSelectedUploadFunding = createSelector(//remove
  selectFundingState,
  fromProjectFunding.getSelectedUploadFunding
);

export const getSaveFundingDialogStatus = createSelector(
  selectFundingState,
  fromProjectFunding.getSaveFundingDialogStatus
);

export const getFundingList = createSelector(
  selectFundingState,
  fromProjectFunding.getFundingList
);

export const {
  selectIds: getFundingListIds,
  selectEntities: getFundingListEntities,
  selectAll: getAllFundings,
  selectTotal: getTotalFundingList,
} = fromProjectFunding.adapterFunding.getSelectors(getFundingList);




