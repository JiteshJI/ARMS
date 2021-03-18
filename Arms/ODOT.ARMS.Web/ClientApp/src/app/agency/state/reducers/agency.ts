import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AgencyDetail } from '../../models/administration-categories';
import { AgencListActions, AgencyListActionTypes } from '../actions/agency';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface SpecificListState extends EntityState<AgencyDetail> {
  selectedSpecificListId: string | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<AgencyDetail> = createEntityAdapter<AgencyDetail>({
  selectId: (specificListAdministration: AgencyDetail) => specificListAdministration.agencyId,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const specificListInitialState: SpecificListState = adapter.getInitialState({
  selectedSpecificListId: null,
});

export interface State {
  isLoading: false,
  error: null,
  specificList: SpecificListState,
  deleteAgencyErrors: any,
  saveAgencyErrors: any;
}

export const initialState: State = {
  isLoading: false,
  error: null,
  specificList: specificListInitialState,
  saveAgencyErrors:null,
  deleteAgencyErrors: null,
}

export function reducer(state = initialState, action: AgencListActions): State {
  switch (action.type) {
    case AgencyListActionTypes.Load: {
      return {
        ...state,
        isLoading: false,
        error: null
      };
    }
    case AgencyListActionTypes.LoadSuccess: {
      return {
        ...state,
        specificList: adapter.setAll(action.payload, state.specificList),
        //specificList: adapter.addAll(action.payload, state.specificList),
        isLoading: false,
        error: null
      };
    }
    case AgencyListActionTypes.LoadFail: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case AgencyListActionTypes.AddAgencyComplete: {
      return {
        ...state,
        saveAgencyErrors: null,
        specificList: adapter.addOne(action.payload, state.specificList)
      };
    }
    case AgencyListActionTypes.AddAgencyError: {
      return {
        ...state,
        saveAgencyErrors: action.payload
      };
    }
    case AgencyListActionTypes.DeleteAgencyComplete: {
      return {
        ...state,
        deleteAgencyErrors: null,
        specificList: adapter.removeOne(action.payload, state.specificList)
      };
    }
    case AgencyListActionTypes.DeleteAgencyError: {
      return {
        ...state,
        deleteAgencyErrors: action.payload
      };
    }
    case AgencyListActionTypes.UpdateAgency: {
      return {
        ...state,
        specificList: adapter.updateOne(action.payload, state.specificList)
      };
    }
    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getSpecificListState = (state: State) => state.specificList;
