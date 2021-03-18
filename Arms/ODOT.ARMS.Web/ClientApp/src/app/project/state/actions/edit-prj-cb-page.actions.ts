import { createAction, props } from '@ngrx/store';
import { ControllingBoardRaw } from '../../models/cb-raw';
import { UploadSrc, EventUpload } from '../../models/event-upload';

export const loadProjectCBList = createAction(
  '[EditPrjCbPage] Load loadProjectCBs',
  props<{ cbList: ControllingBoardRaw[] }>()
);

export const setSelectedCB = createAction(
  '[EditPrjCbPage] Set Selected Project CB',
  props<{ cb: ControllingBoardRaw }>()
);

export const setSelectedUploadCB = createAction(
  '[EditPrjCbPage] Set Selected Project Upload CB',
  props<{ cb: ControllingBoardRaw }>()
);

export const updateCBDocCount = createAction(
  '[EditPrjCbPage] Update CB Doc Count',
  props<{ cb: ControllingBoardRaw }>()
);

export const setSelectUploadSrcSuccess = createAction(//new
  '[EditPrjCbPage] Set Selected UploadSrc Success',
  props<{ uploads: EventUpload[] }>()
);

export const setSelectUploadSrcFailure = createAction(
  '[EditPrjCbPage] Set Selected UploadSrc Failure',
  props<{ error: string }>()
);

export const addCB = createAction(
  '[EditPrjCbPage] Add CB',
  props<{ cb: ControllingBoardRaw }>()
);

export const addCBSuccess = createAction(
  '[EditPrjCbPage] Add Project CB Success',
  props<{ cb: ControllingBoardRaw }>()
);

export const addCBFailure = createAction(
  '[EditPrjCbPage] Add Project CB Failed',
  props<{ error: string }>()
);

export const updateCB = createAction(
  '[EditPrjCbPage] Update Project CB',
  props<{ cb: ControllingBoardRaw }>()
);

export const updateCBSuccess = createAction(
  '[EditPrjCbPage] Update Project CB Success',
  props<{ cb: ControllingBoardRaw }>()
);

export const updateCBFailure = createAction(
  '[EditPrjCbPage] Update ProjectEvent Failed',
  props<{ error: string }>()
);

export const setSaveCBDialogStatus = createAction(
  '[EditPrjCbPage] Set Save CB Status',
  props<{ status: boolean }>()
)


export const editPrjCBPageActionTypes = {
  loadProjectCBList,
  setSelectedCB,
  setSelectedUploadCB,
  updateCBDocCount,
  setSelectUploadSrcSuccess,
  setSelectUploadSrcFailure,
  addCB,
  addCBSuccess,
  addCBFailure,
  updateCB,
  updateCBSuccess,
  updateCBFailure,
  setSaveCBDialogStatus
};




