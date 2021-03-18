import { Action, createReducer, on, createSelector, createFeatureSelector } from "@ngrx/store"
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { UploadSrc, EventUpload } from '../../models/event-upload';
import { editProjectUploadsPageActionTypes } from '../actions/edit-project-uploads-page.actions';


export const editPrjUploadsPageFeatureKey = 'editPrjUploadsPage';//


export interface State extends EntityState<EventUpload> {//
  uploadsList: UploadListState;
  isLoading: boolean;
  error: string;
  uploadProjectDialogStatus: boolean;
}

export interface UploadListState extends EntityState<EventUpload> { }//

export const adapterUpload: EntityAdapter<EventUpload> = createEntityAdapter<EventUpload>({//
  selectId: (upload: EventUpload) => upload.eventUploadId,
  sortComparer: false,
});

const uploadListInitialState: UploadListState = adapterUpload.getInitialState({});//

export const initialState: State = adapterUpload.getInitialState({
  uploadsList: uploadListInitialState,
  isLoading: false,
  error: null,
  uploadProjectDialogStatus: false
});


export const uploadsReducer = createReducer(
  initialState,

  on(editProjectUploadsPageActionTypes.loadEditPrjUploadsPagesFailure, (state, action) => {
    console.info('loadEditPrjUploadsPagesFailure in Reducer');
    return { ...state, error: action.error };
  }),

  on(editProjectUploadsPageActionTypes.loadEditPrjUploadsPagesSuccess, (state, action) => {
    console.info('loadEditPrjUploadsPagesSuccess in Reducer');
    return adapterUpload.setAll(action.files, state);
  }),

  on(editProjectUploadsPageActionTypes.deletePrjFileSuccess, (state, action) => {
    console.info('deletePrjFileSuccess in Reducer');
    return adapterUpload.removeOne(action.eventUploadId, state);
  }),

  on(editProjectUploadsPageActionTypes.deletePrjFileFailure, (state, action) => {
    console.info('deletePrjFileFailure in Reducer');
    return { ...state, error: action.error };
  }),

  on(editProjectUploadsPageActionTypes.setUploadProjectDialogStatus, (state, action) => {//remove
    console.info('setUploadProjectDialogStatus in Reducer');
    return {
      ...state,
      uploadProjectDialogStatus: action.status
    };
  }),

  on(editProjectUploadsPageActionTypes.updateUploadFileList, (state, action) => {
    console.info('updateUploadFileList in Reducer');
    return adapterUpload.addMany(action.files, state);
  }),

);

export const { selectAll, selectIds } = adapterUpload.getSelectors();

export const courseFeatureSelector = createFeatureSelector<State>('uploads');

export const getAllProjectUploads = createSelector(
  courseFeatureSelector,
  selectAll
);

export const getUploadsList = (state: State) => state.uploadsList;
export const getUploadProjectDialogStatus = (state: State) => state.uploadProjectDialogStatus;



