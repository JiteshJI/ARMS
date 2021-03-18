import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectType } from '../../models/projects';
import { projectActionTypes } from '../actions/project.actions';

export interface State extends EntityState<ProjectType> {
  selectedAdministrationCategoryId: string | null;
  isLoading: false;
  error: null;
}

export const adapter: EntityAdapter<ProjectType> = createEntityAdapter<ProjectType>({
  selectId: (administrationCategory: ProjectType) => administrationCategory.projectTypeId,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedAdministrationCategoryId: null,
  isLoading: false,
  error: null
});

export const projectTypeReducer = createReducer(
  initialState,

  on(projectActionTypes.projectTypesLoaded, (state, action) => {
    return adapter.setAll(
      action.ProjectTypeList,
      { ...state, projectTypeLoaded: true }
    );
  }),

  on(projectActionTypes.createProjectType, (state, action) => {
    return adapter.addOne(action.projectType, state);
  }),

  on(projectActionTypes.deleteProjectType, (state, action) => {
    return adapter.removeOne(action.projectTypeId, state);
  }),

  on(projectActionTypes.updateProjectType, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();

export const courseFeatureSelector = createFeatureSelector<State>('projectType');

export const getAllProjectTypes = createSelector(
  courseFeatureSelector,
  selectAll
);
