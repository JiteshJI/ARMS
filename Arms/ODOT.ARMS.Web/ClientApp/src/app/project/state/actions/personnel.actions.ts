import { createAction, props } from '@ngrx/store';
import { Personnel } from '../../models/personnel';

export const LoadSelectedPersonnel = createAction('[personnel] Load Personnel', props<{ projectId: string }>());
export const LoadSelectedPersonnelSuccess = createAction('[personnel] Load Personnnel success', props<{ SelectedPersonnel: Personnel[] }>());
export const LoadSelectedPersonnelFailure = createAction('[personnel] Load Personnel Failed', props<{ Error: string }>());
export const AddPersonnel = createAction('[personnel] Add new Personnel', props<{ Personnel: Personnel }>());
export const AddPersonnelSuccess = createAction('[personnel] Add new Personnel Success', props<{ Personnel: Personnel }>());
export const AddPersonnelFailure = createAction('[personnel] Add new Personnel Failed', props<{ Error: string }>());
export const UpdatePersonnel = createAction('[personnel] Update Personnel', props<{ Personnel: Personnel }>());
export const UpdatePersonnelSuccess = createAction('[personnel] Update Personnel Success', props<{ Personnel: Personnel }>());
export const UpdatePersonnelFailure = createAction('[personnel] Update Personnel Failed', props<{ Error: string }>());
export const setPersonnelloadedStatus = createAction('[personnel] set the personnel loaded Status', props<{loaded: boolean}>());
export const setPersonnelLoadedStatusSuccess = createAction('[personnel] set the personnel loaded Status success', props<{loaded: boolean}>());
export const setSavePersonnelDialog = createAction('[personnel] set the personnel add dialog Status', props<{showDialog: boolean}>());
export const setEditPersonnel = createAction('[personnel] set the Selected Personnel property', props<{Personnel: Personnel}>());
export const setSavePersonnelDialogSuccess = createAction('[personnel] set the personnel add dialog Status Success', props<{Dialog: boolean}>());


export const personnelActions = {
    LoadSelectedPersonnel,
    LoadSelectedPersonnelSuccess,
    LoadSelectedPersonnelFailure,
    AddPersonnel,
    AddPersonnelSuccess,
    AddPersonnelFailure,
    UpdatePersonnel,
    UpdatePersonnelSuccess,
    UpdatePersonnelFailure,
    setPersonnelloadedStatus,
    setPersonnelLoadedStatusSuccess,
    setSavePersonnelDialog,
    setEditPersonnel,
    setSavePersonnelDialogSuccess
};

