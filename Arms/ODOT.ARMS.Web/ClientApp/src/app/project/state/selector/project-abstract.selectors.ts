import {createSelector, createFeatureSelector, ActionReducerMap} from '@ngrx/store';
import * as fromProjectAbstract from '../reducers/edit-project-abstract-page.reducer';


export interface State  { projectAbstract: fromProjectAbstract.State; }
export const reducers: ActionReducerMap<State> = { projectAbstract: fromProjectAbstract.reducer };


/* creating a feature selector */
export const selectProjectAbstractState = createFeatureSelector<fromProjectAbstract.State>('projectAbstract');

/* creating default supported ngrx/entity selectors */

/** select IDs */
export const selectIds = createSelector(
    selectProjectAbstractState,
    fromProjectAbstract.selectIds
);

/** selectAll */
export const selectAllProjectAbstracts = createSelector(
    selectProjectAbstractState,
    fromProjectAbstract.selectAll
);

/** selectEntities */
export const selectEntities = createSelector(
    selectProjectAbstractState,
    fromProjectAbstract.selectEntities
);

/** selectTotal */
export const selectTotal = createSelector(
    selectProjectAbstractState,
    fromProjectAbstract.selectTotal
);

export const selectProjectAbstractById = (projAltId: string) => createSelector(
    selectProjectAbstractState,
    (projectAbstractById) => projectAbstractById.entities[projAltId]
);

export const selectProjectAbstractStateloaded = createSelector(
    selectProjectAbstractState,
    fromProjectAbstract.getPrjAbstractLoadState
);


