import { createAction, props } from '@ngrx/store';
import { Deliverable } from '../../models/custom-deliverable';
import { ProjectDeliverableList } from '../../models/projectInfo';

/**Load Selected Projects */
export const loadSelectedPrjDeliverable = createAction('[cust-deliverable] Load custom Deliverables', props<{ projectAltId: string}>());
export const loadSelectedPrjDeliverableSuccess = createAction('[cust-deliverable] Load custom Deliverables Success', props<{deliverable: Deliverable[]}>());
export const loadSelectedPrjDeliverableFailure = createAction('[cust-deliverable] Load custom Deliverables Failed', props<{error: string}>());

/**Add new Projects */
export const AddPrjCustDeliverable = createAction('[cust-deliverable] Add custom Deliverables', props<{deliverable: Deliverable}>());
export const AddPrjCustDeliverableSuccess = createAction('[cust-deliverable] Add custom Deliverables Success', props<{deliverable: Deliverable}>());
export const AddPrjCustDeliverableFailure = createAction('[cust-deliverable] Add custom Deliverables Failed', props<{error: string}>());

 /**Edit Selected Projects */
export const editPrjCustDeliverable = createAction('[cust-deliverable] Edit CustomDeliverableComponent', props<{deliverable: Deliverable}>());
export const editPrjCustDeliverableSuccess = createAction('[cust-deliverable] Edit CustomDeliverableComponent Success', props<{deliverable: Deliverable}>());
export const editPrjCustDeliverableFailure = createAction('[cust-deliverable] Edit CustomDeliverableComponent Failed', props<{ error: string }>());

/** Save all Project Deliverables */
export const savePrjDeliverable = createAction('[proj-deliverable] save Project Deliverables', props<{ projectDeliverableList: ProjectDeliverableList[] }>());
export const savePrjDeliverableSuccess = createAction('[proj-deliverable] save Project Deliverables successfully', props<{ projectDeliverableList: ProjectDeliverableList }>());
export const savePrjDeliverableFailure = createAction('[proj-deliverable] save Project Deliverables failed', props<{ error: string }>());

export const setPrjCustDeliverableLoaded = createAction('[cust-deliverable] set deliverableStateloaded to False', props <{ loaded: boolean }>());
export const setPrjCustDeliverableLoadedSuccess = createAction('[cust-deliverable] set deliverableStateloaded successfully', props<{ loaded: boolean }>());
export const setPrjCustDeliverableLoadedFailure = createAction('cust-deliverable] set deliverableStateloaded Failed', props<{ error: string }>());

export const setPrjCustDeliverableDialog = createAction('[cust-deliverable] set deliverableDialogStatus to true', props <{ dialogStatus: boolean }>());
export const setPrjCustDeliverableDialogSuccess = createAction('[cust-deliverable] set deliverableDialogStatus successfully', props<{ dialogStatus: boolean }>());
export const setPrjCustDeliverableDialogFailure = createAction('[cust-deliverable] set deliverableDialogStatus Failed', props<{ error: string }>());

export const removePrjCustDeliverable = createAction('[cust-deliverable] remove CustomDeliverableComponent', props<{deliverable: Deliverable}>());
export const removePrjCustDeliverableSuccess = createAction('[cust-deliverable] remove CustomDeliverableComponent Success', props<{deliverableId: string}>());
export const removePrjCustDeliverableFailure = createAction('[cust-deliverable] remove CustomDeliverableComponent Failed', props<{ error: string }>());



export const setEditedPrjCustDeliverable = createAction('[cust-deliverable] set the EditedDeliverable', props<{deliverable: Deliverable}>());


export const custDeliverableActions = {
  loadSelectedPrjDeliverable,
  loadSelectedPrjDeliverableSuccess,
  loadSelectedPrjDeliverableFailure,
  AddPrjCustDeliverable,
  AddPrjCustDeliverableSuccess,
  AddPrjCustDeliverableFailure,
  editPrjCustDeliverable,
  editPrjCustDeliverableSuccess,
  editPrjCustDeliverableFailure,
  removePrjCustDeliverable,
  removePrjCustDeliverableSuccess,
  removePrjCustDeliverableFailure,
  setPrjCustDeliverableLoaded,
  setPrjCustDeliverableLoadedSuccess,
  setPrjCustDeliverableLoadedFailure,
  setPrjCustDeliverableDialog,
  setPrjCustDeliverableDialogSuccess,
  setPrjCustDeliverableDialogFailure,
  setEditedPrjCustDeliverable,
  savePrjDeliverable,
  savePrjDeliverableSuccess,
  savePrjDeliverableFailure
};
