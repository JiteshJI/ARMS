import * as fromRoot from '../../state/reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProjectForDD, EditProjectPageActionTypes } from '../actions/projectForDD.actions';
import { IGenericLookupListForDD, GenericLookupListForDD, ProjectTypesList, VendorAddressForDD, WarehouseData } from '../../models/project-for-update';
import { PassProjectData, IProject, Project } from '../../models/projects';


export interface State extends fromRoot.State {
  Projects: ProjectState;
}

export interface ProjectState {
  loading: boolean;
  error: string;
  ProjectStatusModel: GenericLookupListForDD[];
  ProjectTypesModel: GenericLookupListForDD[];
  PrimaryEventsModel: GenericLookupListForDD[];
  SecondaryEventsModel: GenericLookupListForDD[];
  PhaseStatusModel: GenericLookupListForDD[];
  CBStatusModel: GenericLookupListForDD[];
  CBTypeModel: GenericLookupListForDD[];
  CBCategoryModel: GenericLookupListForDD[];
  VendorAddressModel: VendorAddressForDD[];
  WarehouseModel: WarehouseData;
  selectVendorAddress: string;
  selectPidNumber: number;
  selectNavigationData: PassProjectData;
  selectedProjectTemp: Project;

}

const initialState: ProjectState = {
  loading: false,
  error: '',
  ProjectStatusModel: [],
  ProjectTypesModel: [],
  PrimaryEventsModel: [],
  SecondaryEventsModel: [],
  PhaseStatusModel: [],
  CBStatusModel: [],
  CBTypeModel: [],
  CBCategoryModel: [],
  VendorAddressModel: [],
  WarehouseModel: null,
  selectVendorAddress: '',
  selectPidNumber: null,
  selectNavigationData: {
    projectAltId: null,
    rfpNumber: null,
    projectTypeId: null,
    projectType: null,
    prjId: null
  },
  selectedProjectTemp: null
};
const getProjectFeatureState = createFeatureSelector<ProjectState>('projectForDD');

export const getProjectStatusReducer = createSelector(
  getProjectFeatureState,
  state => state.ProjectStatusModel,
);

export const getProjectTypesReducer = createSelector(
  getProjectFeatureState,
  state => state.ProjectTypesModel,
);

export const getPrimaryEventsReducer = createSelector(
  getProjectFeatureState,
  state => state.PrimaryEventsModel,
);
export const getSecondaryEventsReducer = createSelector(
  getProjectFeatureState,
  state => state.SecondaryEventsModel,
);
export const getPhaseStatusReducer = createSelector(
  getProjectFeatureState,
  state => state.PhaseStatusModel,
);
export const getCBStatusReducer = createSelector(
  getProjectFeatureState,
  state => state.CBStatusModel,
);
export const getVendorAddressTypesReducer = createSelector(
  getProjectFeatureState,
  state => state.VendorAddressModel
);
export const getCBTypeReducer = createSelector(
  getProjectFeatureState,
  state => state.CBTypeModel
);

export const getCBCategoryReducer = createSelector(
  getProjectFeatureState,
  state => state.CBCategoryModel
);
export const getCurrentProjectReducer = createSelector(
  getProjectFeatureState,
  state => state.selectNavigationData
);
export const getStoreProjectReducer = createSelector(
  getProjectFeatureState,
  state => state.selectedProjectTemp
);

export const getWarehouseDetailReducer = createSelector(
  getProjectFeatureState,
  state => state.WarehouseModel
);
export function ProjectForDDreducer(state = initialState, action: ProjectForDD): ProjectState {
  switch (action.type) {
    case EditProjectPageActionTypes.LoadProjectToEdit:
      return {
        ...state,
        error: ''
      };

    case EditProjectPageActionTypes.LoadProjectStatusSuccess: {
      return {
        ...state,
        ProjectStatusModel: action.payload
      };
    }

    case EditProjectPageActionTypes.CBStatusSuccess: {
      return {
        ...state,
        CBStatusModel: action.payload
      };
    }
    case EditProjectPageActionTypes.LoadProjectTypesSuccess: {
      return {
        ...state,
        ProjectTypesModel: action.payload
      };
    }

    case EditProjectPageActionTypes.PrimaryEventsSuccess: {
      return {
        ...state,
        PrimaryEventsModel: action.payload
      };
    }
    case EditProjectPageActionTypes.SecondaryEventsSuccess: {
      return {
        ...state,
        SecondaryEventsModel: action.payload
      };
    }
    case EditProjectPageActionTypes.PhaseStatusSuccess: {
      return {
        ...state,
        PhaseStatusModel: action.payload
      };
    }
    case EditProjectPageActionTypes.LoadCBCategorySuccess: {
      return {
        ...state,
        CBCategoryModel: action.payload
      };
    }
    case EditProjectPageActionTypes.LoadCBTypeSuccess: {
      return {
        ...state,
        CBTypeModel: action.payload
      };
    }
    case EditProjectPageActionTypes.LoadVendorAddressLoad: {
      return {
        ...state,
        selectVendorAddress: action.payload
      };
    }

    case EditProjectPageActionTypes.LoadVendorAddressSuccess: {
      return {
        ...state,
        VendorAddressModel: action.payload
      };
    }
    case EditProjectPageActionTypes.WarehouseDetailLoad: {
      return {
        ...state,
        selectPidNumber: action.payload
      };
    }

    case EditProjectPageActionTypes.WarehouseDetailSuccess: {
      return {
        ...state,
        WarehouseModel: action.payload
      };
    }
    case EditProjectPageActionTypes.LoadCurrentProject: {
      return {
        ...state,
        selectNavigationData: action.payload
      };
    }
    case EditProjectPageActionTypes.LoadTempProject: {
      return {
        ...state,
        selectedProjectTemp: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
