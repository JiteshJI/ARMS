
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPoolPart from '../reducers/pooled-participating.reducer';


export interface State  {poolePart: fromPoolPart.ProjectPooledPartState; }

/* helps us get the feature/specific slice of the State based on the specified name */


export const getPooledPartFeatureState = createFeatureSelector<fromPoolPart.ProjectPooledPartState>('pooledpart');

/* createSelector- helps us get any part/property  of the slice using the feature slice and specifying the property */

export const getAllPooledPart = createSelector(
    getPooledPartFeatureState,
  fromPoolPart.selectAll);


export const getPooledPartLoaded = (state: fromPoolPart.ProjectPooledPartState ) => state.ProjectPooledPartStateloaded;

export const SaveDialogStatus = (state: fromPoolPart.ProjectPooledPartState) => state.savePooledPartDialog;

//export const getEditPersonnel = (state: fromPoolPart.ProjectPooledPartState) => state.;

export const getLoaded = createSelector(
    getPooledPartFeatureState,
    getPooledPartLoaded
);

export const getSaveDialogStatus = createSelector(
  getPooledPartFeatureState,
  SaveDialogStatus
);
