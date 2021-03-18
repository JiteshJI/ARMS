import * as fromRoot from '../../../state/reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgencyListActionTypes, AgencyActions } from '../actions/agency.actions';
import { AgencyDetailModel, AdministrationCategory } from '../../models/agencydetails.module';


export interface State extends fromRoot.State {
  Agencies: AgencyState;
}

export interface AgencyState {
  agencies: AgencyDetailModel[];
  agencyCategory: AdministrationCategory[],
  selectAgency: AgencyDetailModel;
  currentAgencyId: number;
  error: string;
  saveAgencyErrors: any;
  deleteAgencyErrors: any;

}


/*Creating an initial state */
const initialState: AgencyState = {
  agencies: [],
  agencyCategory: [],
  selectAgency: new AgencyDetailModel(),
  currentAgencyId: 0,
  error: '',
  saveAgencyErrors: null,
  deleteAgencyErrors: null
};

const getAgencyFeatureState = createFeatureSelector<AgencyState>('agency');

export const getAgencyReducer = createSelector(
  getAgencyFeatureState,
  state => state.agencies,
);

export const getStatusReducer = createSelector(
  getAgencyFeatureState,
  state => state.error,
);

export const getSelectedAgencyReducer = createSelector(
  getAgencyFeatureState,
  state => state.selectAgency,
);


export const getAgencyCategoryReducer = createSelector(
  getAgencyFeatureState,
  state => state.agencyCategory,
);

export function Agencyreducer(state = initialState, action: AgencyActions): AgencyState { /* contactActions is the type specified in the action.ts file */
  switch (action.type) {
    case AgencyListActionTypes.LoadAgencySuccess:
      return {
        ...state,
        agencies: action.payload,
        error:''
      };

    case AgencyListActionTypes.LoadAgencyFail:
      return {
        ...state,
        error: action.payload
      };

    /* adding the new agency to the existing state */

    case AgencyListActionTypes.InitializeCurrentAgency:
      return {
        ...state,
        currentAgencyId: null,
        error:''
      };


    case AgencyListActionTypes.AddAgency:
      return {
        ...state,
        selectAgency: action.payload,
        error:''
      };

    case AgencyListActionTypes.AddAgencyComplete:
      action.payload.agencyCatText = state.selectAgency.agencyCatText;
      return {
        ...state,
        agencies: [...state.agencies, action.payload]
      };
    case AgencyListActionTypes.AddAgencyError:
      return {
        ...state,
        error: action.payload
      };


    case AgencyListActionTypes.EditAgency:
      return {
        ...state,
        currentAgencyId: action.payload.agencyId,
        selectAgency: action.payload,
        error:''
      };

    case AgencyListActionTypes.EditAgencyComplete:
      /* Build a new contacts array to include the updated contact */

      
      const agencyCatText = state.selectAgency.agencyCatText;

      const updatedContactsArray = Object.assign([], state.agencies);
      const foundIndex = updatedContactsArray.findIndex(contact => contact.agencyId === action.payload.agencyId);
      updatedContactsArray[foundIndex] = action.payload;

      const newArray = updatedContactsArray.map(a => ({ ...a }));
      newArray[foundIndex].agencyCatText = agencyCatText;
     

      /*---------------------------------------*/
      return {
        ...state,
        agencies: newArray,  /* replacing the contacts array in state with the new  updatedContacts Array */
        currentAgencyId: action.payload.agencyId,
        error: ''
      };

    case AgencyListActionTypes.EditAgencyError:
      return {
        ...state,
        error: action.payload
      };

    case AgencyListActionTypes.DeleteAgency: {
      return {
        ...state,
        currentAgencyId: action.payload.agencyId
      };
    }

    case AgencyListActionTypes.DeleteAgencyComplete: {
      return {
        ...state,
        agencies: state.agencies.filter(item => item.agencyId != state.currentAgencyId),
        deleteAgencyErrors: action.payload
      };

    }

    case AgencyListActionTypes.DeleteAgencyError: {
      return {
        ...state,
        error: action.payload
      };
    }
    case AgencyListActionTypes.LoadSuccess: {
      return {
        ...state,
        agencyCategory: action.payload.filter(e => e.specificListID=="1")
      };
    }
   

    default:
      return state;
  }
}
