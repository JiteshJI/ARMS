import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector, createReducer, on } from "@ngrx/store";
import { ProjectAbstract } from "../../models/project-abstract";
import * as editProjectAbstractActionTypes from '../actions/edit-project-abstract-page.actions';

export interface State extends EntityState<ProjectAbstract> {
  projectAbstractLoaded: boolean;
  error: string;
}

export const adapterPrjAbstract: EntityAdapter<ProjectAbstract> = createEntityAdapter<ProjectAbstract>({
  selectId: (prjAbstract: ProjectAbstract) => prjAbstract.projectAltId,
  sortComparer: false
});

export const initialState: State = adapterPrjAbstract.getInitialState({
  projectAbstractLoaded: false,
  error: null
});

export const reducer = createReducer(
  initialState,

  on(editProjectAbstractActionTypes.loadProjectAbstractSuccess, (state, action) => {
    return adapterPrjAbstract.addOne(action.projectAbstract, { ...state, projectAbstractLoaded: true });
  }),

  on(editProjectAbstractActionTypes.loadProjectAbstractFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),

  on(editProjectAbstractActionTypes.updateProjectAbstract, (state, action) => {
    return adapterPrjAbstract.upsertOne(action.newAbstract, state);
  }),

  on(editProjectAbstractActionTypes.updateProjectAbstractFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  })
);



export const { selectIds, selectAll, selectEntities, selectTotal } = adapterPrjAbstract.getSelectors();

export const getPrjAbstractError = (state: State) => state.error;
export const getPrjAbstractLoadState = (state: State) => state.projectAbstractLoaded;


