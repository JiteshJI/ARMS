import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { IProject } from "../../models/projects";
import { createReducer, on, createSelector, createFeatureSelector } from "@ngrx/store";
import { projectActionTypes } from "../actions/project.actions";

//**************************************Project***********************************************************************//

export interface ProjectState extends EntityState<IProject> {
  isLoading: false;
  error: null;
  SelectedProject: IProject;
}

export const adapterProject: EntityAdapter<IProject> = createEntityAdapter<IProject>({
  selectId: (project: IProject) => project.projId,
  sortComparer: false,
});

export const initialState: ProjectState = adapterProject.getInitialState({
  isLoading: false,
  error: null,
  SelectedProject: null,
});

export const projectReducer = createReducer(
  initialState,

  on(projectActionTypes.projectLoaded, (state, action) => {
    //return adapterProject.addAll(
    return adapterProject.setAll(
      action.ProjectList,
      { ...state, projectLoaded: false }
    );
  }),

  on(projectActionTypes.createProject, (state, action) => {
    return adapterProject.addOne(action.project, state);
  }),

  on(projectActionTypes.updateProject, (state, action) => {
    return adapterProject.updateOne(action.update, state);
  }),

   on(projectActionTypes.selectedProjectLoaded, (state, action) => {
     return {
       ...state,
       SelectedProject: action.SelectedProject
     };
   }),
);
export const { selectAll, selectIds } = adapterProject.getSelectors();

export const courseFeatureSelector = createFeatureSelector<ProjectState>('project');

export const getAllProject = createSelector(
  courseFeatureSelector,
  selectAll
);

//export const getSelectedProjectReducer = createSelector(
//  courseFeatureSelector,
//  state => state.SelectedProject.phaseList
//);




//**************************************Project***********************************************************************//
