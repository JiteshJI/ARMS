import { createAction, props } from '@ngrx/store';
import { UploadSrc, EventUpload } from '../../models/event-upload';

export const setSelectedUploadSrc = createAction(
  '[UploadFile] Set Selected UploadSrc',
  props<{ src: UploadSrc }>()
);

export const setSelectUploadSrcSuccess = createAction(//new
  '[UploadFile] Set Selected UploadSrc Success',
  props<{ uploads: EventUpload[] }>()
);

export const setSelectUploadSrcFailure = createAction(
  '[UploadFile] Set Selected UploadSrc Failure',
  props<{ error: string }>()
);

export const updateUpload = createAction(//New
  '[UploadFile] Update upload',
  props<{ upload: EventUpload }>()
)

export const updateUploadSuccess = createAction(//New
  '[UploadFile] Update upload Success',
  props<{ upload: EventUpload }>()
)

export const updateUploadFailure = createAction(//New
  '[UploadFile] Update upload Failed',
  props<{ error: string }>()
)

export const setUploadDialogStatus = createAction(
  '[UploadFile] Set Upload Event Dialog Status',
  props<{ status: boolean }>()
)

//export const setUploadFileList = createAction(
export const updateUploadFileList = createAction(
  '[UploadFile] Set Upload Files List',
  props<{ files: Array<EventUpload> }>()
)

export const getUploadsBySourceId = createAction(
  '[UploadFile] Load Uploads By Source Id',
  props<{ srcId: string }>()
)

export const getUploadById = createAction(
  '[UploadFile] Load Upload By Id',
  props<{ uploadId: string }>()
)

export const DownloadFileById = createAction(
  '[UploadFile] Download Upload By Id',
  props<{ projAltId: string, srcId: string, uploadId: string }>()
)

export const DownloadFileByIdFailure = createAction(
  '[UploadFile] Download Upload By Id failure',
  props<{ error: string }>()
)

export const fileUploadsActionTypes = {
  setSelectedUploadSrc,
  setSelectUploadSrcSuccess,
  setSelectUploadSrcFailure,
  updateUpload,
  updateUploadSuccess,
  updateUploadFailure,
  setUploadDialogStatus,
  updateUploadFileList,
  getUploadsBySourceId,
  getUploadById,
  DownloadFileById,
  DownloadFileByIdFailure
}




