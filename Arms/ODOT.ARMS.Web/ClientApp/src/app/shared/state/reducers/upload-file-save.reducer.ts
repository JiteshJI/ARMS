import { Action, createReducer, on, createSelector, createFeatureSelector } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { UploadSrc, EventUpload } from '../../../project/models/event-upload';
import { UploadFileSaveActionsTypes } from '../actions/upload-file-save.actions';


export const uploadFileSaveFeatureKey = 'uploadFileSave';

//export interface State extends EntityState<UploadSrc> {
export interface State {
  //fileUploads: EventUpload[];
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

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
const uploadListInitialState: UploadListState = adapterUpload.getInitialState({});

export const initialState: State = {
  //fileUploads: null,
  uploadsList: uploadListInitialState,
  isLoading: false,
  error: null,
  selectedSrc: null,
  uploadDialogStatus: false
};

export const reducer = createReducer(
  initialState,

  on(UploadFileSaveActionsTypes.setUploadFileList, (state, action) => {
    console.info('setUploadFileList in Reducer');
    return {
      ...state,
      uploadsList: adapterUpload.setAll(action.files, state.uploadsList)
      //uploadsList: adapterUpload.addAll(action.files, state.uploadsList)
    };
  }),

  on(UploadFileSaveActionsTypes.setSelectedUploadSrc, (state, action) => {//remove
    console.info('setSelectedUpload in Reducer');
    var junk = {
      ...state,
      selectedSrc: action.src,
      //selectedUploads: action.
      uploadDialogStatus: true
    };
    return junk;
  }),

  on(UploadFileSaveActionsTypes.setUploadDialogStatus, (state, action) => {//remove
    console.info('setUploadDialogStatus in Reducer');
    return {
      ...state,
      uploadDialogStatus: action.status
    };
  })
);

//export const { selectAll, selectIds } = adapterUpload.getSelectors();

//export const courseFeatureSelector = createFeatureSelector<State>('uploads');//Why is this not working???


//export const getAllUploads = createSelector(
//  courseFeatureSelector,
//  selectAll
//);

//export const getUploads = (state: State) => state.uploadsList;
export const getUploadsList = (state: State) => state.uploadsList;
export const getSelectedSrc = (state: State) => state.selectedSrc;
//{
//  console.info('getSelectedSrc');
  //console.info(state.selectedSrc);
//  return state.selectedSrc;//????
//}
//export const getUploadDialogStatus = (state: State) => state.uploadDialogStatus;
export const getUploadDialogStatus = (state: State) => state.uploadDialogStatus;
//{
//  console.info('getUploadDialogStatus');
//  console.info(state);
  //console.info(state.uploadDialogStatus);
//  return state.uploadDialogStatus;//????
//}
