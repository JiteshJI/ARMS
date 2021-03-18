import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEditProjectPhasePage from '../reducers/edit-project-phase-page.reducer';


export interface State { projectPhase: fromEditProjectPhasePage.State; }
export const reducers: ActionReducerMap<State> = { projectPhase: fromEditProjectPhasePage.projectPhaseReducer };

export const selectProjectPhaseState = createFeatureSelector<fromEditProjectPhasePage.State>('projectPhase');


export const getPhases = createSelector(
  selectProjectPhaseState,
  fromEditProjectPhasePage.getPhases
);

export const getSelectedPhase = createSelector(
  selectProjectPhaseState,
  fromEditProjectPhasePage.getSelectedPhase
);

export const getSavePhaseDialogStatus = createSelector(
  selectProjectPhaseState,
  fromEditProjectPhasePage.getSavePhaseDialogStatus
);

export const {
  selectIds: getPhaseListIds,
  selectEntities: getPhaseListEntities,
  selectAll: getAllPhases,
  selectTotal: getTotalPhaseList
} = fromEditProjectPhasePage.adapterPhase.getSelectors(getPhases);
