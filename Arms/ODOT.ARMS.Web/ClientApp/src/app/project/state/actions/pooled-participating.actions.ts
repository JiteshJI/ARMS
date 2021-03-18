import { createAction, props } from '@ngrx/store';
import { PooledParticipating } from '../../models/pooled-participating';

// **************************Load Pooled Participating***********************//
export const loadSelectedProjectPooledPart = createAction('[Project Pooled Part] Load GetFinPooledParticipatingPageComponent', props<{ projectId: string }>());
export const loadSelectedProjectPooledPartSuccess = createAction('[Project Pooled Part] Load GetFinPooledParticipatingPageComponent Success',
props<{ pooledParticipating: PooledParticipating[] }>()
);
export const loadProjectPooledPartFail = createAction('[Project Pooled Part] Load GetFinPooledParticipatingPageComponent Failed', props<{ error: any }>());

/**Create Pooled Participating */
export const addProjectPooledPart = createAction('[Project Pooled Part] Add GetFinPooledParticipatingPageComponent ', props<{ pooledParticipating: PooledParticipating}>());
export const addProjectPooledPartSuccess = createAction('[Project Pooled Part] Add GetFinPooledParticipatingPageComponent Success ',
props<{ pooledParticipating: PooledParticipating }>()
);
export const addProjectPooledPartFailed = createAction('[Project Pooled Part] Add GetFinPooledParticipatingPageComponent Failed ', props<{ error: any }>());

/**Update Pooled Participating */
export const updateProjectPooledPart = createAction('[Project Pooled Part] Update GetFinPooledParticipatingPageComponent ', props<{ pooledParticipating: PooledParticipating }>());
export const updateProjectPooledPartSuccess = createAction('[Project Pooled Part] Update GetFinPooledParticipatingPageComponent Success ', props<{ pooledParticipating: PooledParticipating }>());
export const updateProjectPooledPartFailed = createAction('[Project Pooled Part] Update GetFinPooledParticipatingPageComponent Failed ', props<{ error: any }>());

/** set the loaded Status */
export const setProjectPoolPartLoadedStatus = createAction('[Project Pooled Part] set ProjectPooledPartLoaded', props <{ loaded: boolean }>());
export const setProjectPoolPartLoadedStatusSuccess = createAction('[Project Pooled Part] set ProjectPooledPartLoaded Success', props<{ loaded: boolean }>());
export const setProjectPoolPartLoadedStatusFailed = createAction('[Project Pooled Part] set ProjectPooledPartLoaded Failed', props<{ error: string }>());

/** set the dialog Status */
export const setSavePooledPartDialog = createAction('[Project Pooled Part] set the ProjectPooledPart add dialog Status', props<{showDialog: boolean}>());
export const setSavePooledPartDialogSuccess = createAction('[Project Pooled Part] set the Project Pooled Part add dialog Status Success', props<{Dialog: boolean}>());

/** set the edited PooledPart Status */
export const setEditPooledPart = createAction('[Project Pooled Part] set the selectEditPooledPart property', props<{pooledParticipating: PooledParticipating}>());

// **************************Fundings***********************//
export const pooledParticipatingActions = {
loadSelectedProjectPooledPart,
loadSelectedProjectPooledPartSuccess,
loadProjectPooledPartFail,
addProjectPooledPart,
addProjectPooledPartSuccess,
addProjectPooledPartFailed,
updateProjectPooledPart,
updateProjectPooledPartSuccess,
updateProjectPooledPartFailed,
setProjectPoolPartLoadedStatus,
setProjectPoolPartLoadedStatusSuccess,
setProjectPoolPartLoadedStatusFailed,
setSavePooledPartDialog,
setSavePooledPartDialogSuccess,
setEditPooledPart
};
