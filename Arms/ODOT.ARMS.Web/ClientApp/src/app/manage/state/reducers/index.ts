import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromAdministrationCategory from './administration-categories';
import * as fromSpecificlist from './specificlist';
import * as fromfundingtype from './fundingtype';
import * as fromRoot from '../../../state/reducers';

export interface AdminstrationState {
  specificlist: fromSpecificlist.State;
  fundingtypeList: fromfundingtype.State;
}

export interface State extends fromRoot.State {
  adminstration: AdminstrationState;
}

export const reducers: ActionReducerMap<AdminstrationState> = {
  specificlist: fromSpecificlist.reducer,
  fundingtypeList: fromfundingtype.reducer,
};

export const getAdminstrationState = createFeatureSelector<State, AdminstrationState>('adminstration');

//************************************************************Start Specifi List******************************************************/////
export const getSpecificListEntitiesState = createSelector(getAdminstrationState, state => state.specificlist);

export const getSpecificListState = createSelector(
  getSpecificListEntitiesState,
  fromSpecificlist.getSpecificListState
);

export const {
  selectIds: getSpecificListIds,
  selectEntities: getSpecificListEntities,
  selectAll: getAllSpecificList,
  selectTotal: getTotalSpecificList,
} = fromSpecificlist.adapter.getSelectors(getSpecificListState);

//************************************************************Start FundingType List******************************************************/////
export const getFundingTypeEntitiesState = createSelector(getAdminstrationState, state => state.fundingtypeList);

export const getFundingTypeListState = createSelector(
  getFundingTypeEntitiesState,
  fromfundingtype.getFundingTypeListState
);

export const {
  selectIds: getFundingTypeListIds,
  selectEntities: getFundingTypeListEntities,
  selectAll: getAllFundingTypeList,
  selectTotal: getTotalFundingTypeList,
} = fromfundingtype.adapter.getSelectors(getFundingTypeListState);


export const selectActiveAdminTab = createSelector(
  fromRoot.getRouterInfo,
  routerInfo => routerInfo && routerInfo.data && routerInfo.data.activeAdminTab
);




