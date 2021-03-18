/// <reference path="../../models/administration-categories.ts" />
/// <reference path="../actions/administration-categories.ts" />
import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SpecificListAdministration } from '../../models/administration-categories';
import { SpecificListActions, SpecificListActionTypes } from '../actions/specificlist';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface SpecificListState extends EntityState<SpecificListAdministration> {
  selectedSpecificListId: string | null;
}

export const adapter: EntityAdapter<SpecificListAdministration> = createEntityAdapter<SpecificListAdministration>({
  selectId: (specificListAdministration: SpecificListAdministration) => specificListAdministration.specificListID,
  sortComparer: false,
});

export const specificListInitialState: SpecificListState = adapter.getInitialState({
  selectedSpecificListId: null,
});

export interface State {
  isLoading: false,
  error: null,
  specificList: SpecificListState
}

export const initialState: State = {
  isLoading: false,
  error: null,
  specificList: specificListInitialState
}

export function reducer(state = initialState, action: SpecificListActions): State {
  switch (action.type) {
    case SpecificListActionTypes.Load: {
      return {
        ...state,
        isLoading: false,
        error: null
      };
    }
    case SpecificListActionTypes.LoadSuccess: {
      return {
        ...state,
        //specificList: adapter.addAll(action.payload, state.specificList),
        specificList: adapter.setAll(action.payload, state.specificList),
        isLoading: false,
        error: null
      };
    }
    case SpecificListActionTypes.LoadFail: {
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

export const getSpecificListState = (state: State) => state.specificList;
