import * as fromRoot from '../../../state/reducers';
import { createSelector, createFeatureSelector, createReducer } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { EditProjectPageActions, EditProjectPageActionTypes } from "../actions/edit-project-page.actions"
import { IGenericLookupListForDD, GenericLookupListForDD, ProjectTypesList, VendorAddressForDD } from '../../models/project-for-update';

//export interface State extends fromRoot.State {
//  Projects: ProjectState;
//}

export interface State {
  loading: boolean;
  error: string;
  ProjectStatusModel: GenericLookupListForDD[];
  ProjectTypesModel: GenericLookupListForDD[];
  VendorAddressModel: VendorAddressForDD[];
  selectVendorAddress: string;
}

const initialState: State = {
  loading: false,
  error: '',
  ProjectStatusModel: [],
  ProjectTypesModel: [],
  VendorAddressModel: [],
  selectVendorAddress: ''
};
const getProjectFeatureState = createFeatureSelector<State>('projects');

export const getProjectStatusReducer = createSelector(
  getProjectFeatureState,
  state => state.ProjectStatusModel,

);

export const getProjectTypesReducer = createSelector(
  getProjectFeatureState,
  state => state.ProjectTypesModel,
);

export const getVendorAddressTypesReducer = createSelector(
  getProjectFeatureState,
  state => state.VendorAddressModel
);

export function Projectreducer(state = initialState, action: EditProjectPageActions): State {
  switch (action.type) {
    case EditProjectPageActionTypes.LoadProjectToEdit:
      return {
        ...state,
        error:''
      };
   
    case EditProjectPageActionTypes.LoadProjectStatusSuccess: {
      console.log("Load project success")
      return {
        ...state,
        ProjectStatusModel: action.payload
      };
    }
    case EditProjectPageActionTypes.LoadProjectTypesSuccess: {
      console.log("Load project types success")
      return {
        ...state,
        ProjectTypesModel: action.payload
      };
    }

    case EditProjectPageActionTypes.LoadVendorAddressLoad: {
      console.log("Load vendor Address success")
      return {
        ...state,
        selectVendorAddress: action.payload
      };
    }

    case EditProjectPageActionTypes.LoadVendorAddressSuccess: {
      console.log("Load vendor Address success")
      return {
        ...state,
        VendorAddressModel: action.payload
      };
    }
    default: {
      return state;
    }
  }
}


export const reducer = createReducer(
  initialState,

);
