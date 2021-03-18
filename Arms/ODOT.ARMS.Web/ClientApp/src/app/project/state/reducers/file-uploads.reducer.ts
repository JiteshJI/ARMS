import { Action, createReducer, on, createSelector, createFeatureSelector } from "@ngrx/store"
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { fileUploadsActionTypes } from '../actions/file-uploads.actions';
import { UploadSrc, EventUpload } from '../../models/event-upload';


export const fileUploadsFeatureKey = 'fileUploads';

export interface State extends EntityState<EventUpload> {
  uploads: EventUpload[];
  uploadsList: UploadListState;
  isLoading: boolean;
  error: string;
  selectedSrc: UploadSrc;
  uploadDialogStatus: boolean;
}

export interface UploadListState extends EntityState<EventUpload> { }//This might have to change

export const adapterUpload: EntityAdapter<EventUpload> = createEntityAdapter<EventUpload>({
  selectId: (upload: EventUpload) => upload.eventUploadId,
  sortComparer: false,
});

const uploadListInitialState: UploadListState = adapterUpload.getInitialState({});

export const initialState: State = adapterUpload.getInitialState({
  uploads: null,
  uploadsList: uploadListInitialState,
  isLoading: false,
  error: null,
  selectedSrc: null,
  uploadDialogStatus: false
});


export const reducer = createReducer(
  initialState,


  on(fileUploadsActionTypes.updateUploadFileList, (state, action) => {
    console.info('updateUploadFileListSuccess in Reducer');
    return {
      ...state,
      uploadsList: adapterUpload.addMany(action.files, state.uploadsList)
    };
  }),

  on(fileUploadsActionTypes.updateUploadSuccess, (state, action) => {//New
    console.info('updateUploadSuccess in Reducer');
    return {
      ...state,
      uploadsList: adapterUpload.upsertOne(action.upload, state.uploadsList)
    };
  }),

  on(fileUploadsActionTypes.updateUploadFailure, (state, action) => {//New
    console.info('updateUploadFailure in Reducer');
    return { ...state, error: action.error };
  }),

  on(fileUploadsActionTypes.setSelectedUploadSrc, (state, action) => {
    console.info('setSelectedUpload in Reducer');
    return {
      ...state,
      selectedSrc: action.src,
      uploadDialogStatus: true
    };
  }),

  on(fileUploadsActionTypes.setSelectUploadSrcSuccess, (state, action) => {
    console.info('setSelectUploadSrcSuccess reducer');
    return {
      ...state,
      uploadsList: adapterUpload.setAll(action.uploads, state.uploadsList)
    };
  }),

  on(fileUploadsActionTypes.setSelectUploadSrcFailure, (state, action) => {
    return { ...state, error: action.error };
  }),

  on(fileUploadsActionTypes.setUploadDialogStatus, (state, action) => {//remove
    console.info('setUploadDialogStatus in Reducer');
    return {
      ...state,
      uploadDialogStatus: action.status
    };
  })

);

export const getUploadDialogStatus = (state: State) => state.uploadDialogStatus;
export const getUploads = (state: State) => state.uploadsList;
export const getSelectedSrc = (state: State) => state.selectedSrc;

