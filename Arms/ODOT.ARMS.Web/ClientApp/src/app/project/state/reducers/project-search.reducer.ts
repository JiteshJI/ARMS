import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { ProjectForSearch } from '../../models/projects';
import { projectActionTypes } from '../actions/project.actions';


export const projectSearchFeatureKey = 'projectSearch';

export interface State {
  projectsForSearch: ProjectForSearch[];
}

export const initialState: State = {
  projectsForSearch: null
};


export const reducer = createReducer(
  initialState,

  on(projectActionTypes.loadProjectsForSearchSuccess, (state, action) => {
    return {
      ...state,
      projectsForSearch: action.projects
    };
  }),

);

export const getProjectsForSearch = (state: State) => state.projectsForSearch;
