import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromProjInfo from '../reducers/project-info.reducer';




export interface State  {projectInfo: fromProjInfo.ProjectInfoState; }
export const reducers: ActionReducerMap<State> = {projectInfo: fromProjInfo.projectInfoReducer};


/* creating a feature selector */
export const selectProjectInfoState = createFeatureSelector<fromProjInfo.ProjectInfoState>('prjInfo');

/* creating default supported ngrx/entity selectors */

/** select IDs */
export const selectIds = createSelector(
    selectProjectInfoState,
    fromProjInfo.selectIds
);

/** selectAll */
export const selectAllSummaries = createSelector(
    selectProjectInfoState,
    fromProjInfo.selectAll
);

/** selectEntities */
export const selectEntities = createSelector(
    selectProjectInfoState,
    fromProjInfo.selectEntities
);

/** selectTotal */
export const selectTotal = createSelector(
    selectProjectInfoState,
    fromProjInfo.selectTotal
);

export const selectProjInfoByAltId = (projAltId: string) => createSelector(
    selectProjectInfoState,
    ProjInfoById => ProjInfoById.entities[projAltId]
);

export const selectProjectIdByInfo = (projAltId: string) => createSelector(
    selectProjectInfoState,
    ProjectInfo => ProjectInfo.entities[projAltId].projId
);

export const selectError = createSelector(
    selectProjectInfoState,
    fromProjInfo.geterror
);

export const projInfoLoaded = createSelector(
    selectProjectInfoState,
    fromProjInfo.getProjectInfoStateloaded
);
