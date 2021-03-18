
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPersonnel from '../reducers/personnel.reducer';


export interface State  {personnel: fromPersonnel.PersonnelState; }

/* helps us get the feature/specific slice of the State based on the specified name */


export const getPersonnelFeatureState = createFeatureSelector<fromPersonnel.PersonnelState>('personnel');

/* createSelector- helps us get any part/property  of the slice using the feature slice and specifying the property */

export const getAllPersonnel = createSelector(
  getPersonnelFeatureState,
  fromPersonnel.selectAll);


export const getPersonnelLoaded = (state: fromPersonnel.PersonnelState) => state.loaded;

export const SaveDialogStatus = (state: fromPersonnel.PersonnelState) => state.savePersonnelDialog;

export const getEditPersonnel = (state: fromPersonnel.PersonnelState) => state.selectEditPersonnel;

export const getLoaded = createSelector(
  getPersonnelFeatureState,
  getPersonnelLoaded
);

export const getSaveDialogStatus = createSelector(
  getPersonnelFeatureState,
  SaveDialogStatus
);


export const getEditedPersonnel = createSelector(
  getPersonnelFeatureState,
  getEditPersonnel
);
