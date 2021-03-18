/// <reference path="../../models/administration-categories.ts" />
/// <reference path="../actions/administration-categories.ts" />
import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FundingTypeListAdministration } from '../../models/administration-categories';
import { FundingTypeListActions, FundingTypeListActionTypes } from '../actions/fundingtype';

export interface FundingTypeListState extends EntityState<FundingTypeListAdministration> {
  fundingTypeId: string | null;
}

export const adapter: EntityAdapter<FundingTypeListAdministration> = createEntityAdapter<FundingTypeListAdministration>({
  selectId: (fundingTypeListAdministration: FundingTypeListAdministration) => fundingTypeListAdministration.fundingTypeId,
  sortComparer: false,
});

export const fundingTypeListInitialState: FundingTypeListState = adapter.getInitialState({
  fundingTypeId: null,
});

export interface State {
  isLoading: false,
  error: null,
  fundingTypeList: FundingTypeListState
}

export const initialState: State = {
  isLoading: false,
  error: null,
  fundingTypeList: fundingTypeListInitialState
}

export function reducer(state = initialState, action: FundingTypeListActions): State {
  switch (action.type) {
    case FundingTypeListActionTypes.Load: {
      return {
        ...state,
        isLoading: false,
        error: null
      };
    }
    case FundingTypeListActionTypes.LoadSuccess: {
      return {
        ...state,
        fundingTypeList: adapter.setAll(action.payload, state.fundingTypeList),
        //fundingTypeList: adapter.addAll(action.payload, state.fundingTypeList),
        isLoading: false,
        error: null
      };
    }
    case FundingTypeListActionTypes.LoadFail: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
export const getFundingTypeListState = (state: State) => state.fundingTypeList;

