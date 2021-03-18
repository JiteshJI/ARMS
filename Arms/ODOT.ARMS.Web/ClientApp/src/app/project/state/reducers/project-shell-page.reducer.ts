import { Action, createReducer, on } from '@ngrx/store';
import { ProjectHeader } from '../../models/project-header';
import { projectShellActionTypes } from '../actions/project-shell-page.actions';

export const projectShellPageFeatureKey = 'projectShellPage';

export interface State {
  projectHeader: ProjectHeader
}

export const initialState: State = {
  projectHeader: null,
};


export const reducer = createReducer(
  initialState,

  on(projectShellActionTypes.loadProjectHeader, (state, action) => {
    return {
      ...state,
      projectHeader: action.projectHeader
    };
  }),
);

export const getProjectHeader = (state: State) => state.projectHeader;
export const getProjectId = (state: State) => state.projectHeader?.projId;
