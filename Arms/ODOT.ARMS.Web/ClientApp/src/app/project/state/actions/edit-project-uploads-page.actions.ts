import { createAction, props } from '@ngrx/store';
import { EventUpload } from '../../models/event-upload';

export const loadEditPrjUploadsPages = createAction(//Not being used because of resolver
  '[EditPrjUploadsPage] Load EditPrjUploadsPages',
  props<{ projAltId: string }>()
);

export const updateUploadFileList = createAction(
  '[UploadFileSave] Set Upload Files List',
  props<{ files: Array<EventUpload> }>()
)

export const loadEditPrjUploadsPagesSuccess = createAction(
  '[EditPrjUploadsPage] Load EditPrjUploadsPages Success',
  props<{ files: Array<EventUpload> }>()
);

export const loadEditPrjUploadsPagesFailure = createAction(//Not being used because of resolver
  '[EditPrjUploadsPage] Load EditPrjUploadsPages Failure',
  props<{ error: string }>()
);

export const deletePrjFile = createAction(
  '[EditPrjUploadsPage] Delete deletePrjFile',
  props<{ eventUploadId: string }>()
);

export const deletePrjFileSuccess = createAction(
  '[EditPrjUploadsPage] Delete deletePrjFileSuccess',
  props<{ eventUploadId: string }>()
);

export const deletePrjFileFailure = createAction(
  '[EditPrjUploadsPage] Delete deletePrjFileFailure',
  props<{ error: string }>()
);

export const setUploadProjectDialogStatus = createAction(
  '[EditPrjUploadsPage] Set Upload Dialog Status',
  props<{ status: boolean }>()
)


export const editProjectUploadsPageActionTypes = {
  loadEditPrjUploadsPages,
  loadEditPrjUploadsPagesSuccess,
  loadEditPrjUploadsPagesFailure,
  deletePrjFile,
  deletePrjFileSuccess,
  deletePrjFileFailure,
  setUploadProjectDialogStatus,
  updateUploadFileList
};
