import { createAction, props } from '@ngrx/store';
import { EventUpload, UploadSrc } from '../../../project/models/event-upload';


export const setSelectedUploadSrc = createAction(//remove
  '[UploadFileSave] Set Selected UploadSrc',
  props<{ src: UploadSrc }>()
);

export const setUploadDialogStatus = createAction(//
  '[UploadFileSave] Set Upload Event Dialog Status',
  props<{ status: boolean }>()
)

export const setUploadFileList = createAction(
  '[UploadFileSave] Set Upload Files List',
  props<{ files: Array<EventUpload> }>()
)

export const getUploadsBySourceId = createAction(
  '[UploadFileSave] Load Uploads By Source Id',
  props<{ srcId: string }>()
)

export const getUploadsByProjectAltId = createAction(
  '[UploadFileSave] Load Uploads By Project Alt Id',
  props<{ projAltId: string }>()
)

export const getUploadById = createAction(
  '[UploadFileSave] Load Upload By Id',
  props<{ uploadId: string }>()
)

export const DownloadFileById = createAction(
  '[UploadFileSave] Download Upload By Id',
  props<{ projAltId: string, srcId: string, uploadId: string }>()
)

export const UploadFileSaveActionsTypes = {
  setSelectedUploadSrc,
  setUploadDialogStatus,
  setUploadFileList,
  getUploadsBySourceId,
  getUploadsByProjectAltId,
  getUploadById,
  DownloadFileById
};
