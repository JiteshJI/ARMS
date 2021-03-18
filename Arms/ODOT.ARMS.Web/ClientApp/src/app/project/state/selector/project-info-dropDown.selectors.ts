import {createSelector, createFeatureSelector, ActionReducerMap} from '@ngrx/store';
import * as fromProjDD from '../reducers/projectForDD.reducer';


export interface State  {projectDropDown: fromProjDD.ProjectState; }
export const reducers: ActionReducerMap<State> = {projectDropDown: fromProjDD.ProjectForDDreducer};


/* creating a feature selector */
export const getProjectDropDownFeatureState = createFeatureSelector<fromProjDD.ProjectState>('projDropDown');


export const getProjectStatus = createSelector(
    getProjectDropDownFeatureState,
    state => state.ProjectStatusModel,
  );

  export const getProjectTypes = createSelector(
    getProjectDropDownFeatureState,
    state => state.ProjectTypesModel,
  );

  export const getCBStatus = createSelector(
    getProjectDropDownFeatureState,
    state => state.CBStatusModel,
  );
  export const getVendorAddressTypes = createSelector(
    getProjectDropDownFeatureState,
    state => state.VendorAddressModel
  );
  export const getCBType = createSelector(
    getProjectDropDownFeatureState,
    state => state.CBTypeModel
  );

  export const getCurrentProject = createSelector(
    getProjectDropDownFeatureState,
    state => state.selectNavigationData
  );

  export const getWarehouseDetail = createSelector(
    getProjectDropDownFeatureState,
    state => state.WarehouseModel
  );


