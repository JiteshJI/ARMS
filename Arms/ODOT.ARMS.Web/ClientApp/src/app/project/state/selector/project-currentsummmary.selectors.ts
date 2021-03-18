import {createSelector, createFeatureSelector, ActionReducerMap} from '@ngrx/store';
import * as fromProjCurrSummary from '../reducers/project-summary.reducer';


export interface State  {currentsummary: fromProjCurrSummary.ProjectSummaryState; }
export const reducers: ActionReducerMap<State> = {currentsummary: fromProjCurrSummary.projectSummaryReducer};


/* creating a feature selector */
export const selectProjectCurrentSummaryState = createFeatureSelector<fromProjCurrSummary.ProjectSummaryState>('currentSummary');

/* creating default supported ngrx/entity selectors */

/** select IDs */
export const selectIds = createSelector(
    selectProjectCurrentSummaryState,
    fromProjCurrSummary.selectIds
);

/** selectAll */
export const selectAllSummaries = createSelector(
    selectProjectCurrentSummaryState,
    fromProjCurrSummary.selectAll
);

/** selectEntities */
export const selectEntities = createSelector(
    selectProjectCurrentSummaryState,
    fromProjCurrSummary.selectEntities
);

/** selectTotal */
export const selectTotal = createSelector(
    selectProjectCurrentSummaryState,
    fromProjCurrSummary.selectTotal
);

export const selectProjCurrentSummById = (projAltId: string) => createSelector(
    selectProjectCurrentSummaryState,
    (ProjSummarById) => ProjSummarById.entities[projAltId]
);

export const  selectProjectSummaryStateloaded = createSelector(
    selectProjectCurrentSummaryState,
    fromProjCurrSummary.getProjectSummaryStateloaded
);


