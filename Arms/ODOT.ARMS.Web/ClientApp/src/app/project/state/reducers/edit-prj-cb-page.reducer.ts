import { Action, createReducer, on, createSelector, createFeatureSelector } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { ControllingBoardRaw } from '../../models/cb-raw';
import { editPrjCBPageActionTypes } from '../actions/edit-prj-cb-page.actions';


export const editPrjCbPageFeatureKey = 'editPrjCbPage';


export interface State extends EntityState<ControllingBoardRaw> {
  CBs: ControllingBoardRaw[];
  cbList: CBListState;
  isLoading: boolean;
  error: string;
  selectedCB: ControllingBoardRaw;
  selectedUploadCB: ControllingBoardRaw;
  saveCBDialogStatus: boolean;
};

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface CBListState extends EntityState<ControllingBoardRaw> { }

export const adapterControllingBoard: EntityAdapter<ControllingBoardRaw> = createEntityAdapter<ControllingBoardRaw>({
  selectId: (cb: ControllingBoardRaw) => cb.controllingBoardId,
  sortComparer: false,
});


/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
const cbListInitialState: CBListState = adapterControllingBoard.getInitialState({});


export const initialState: State = adapterControllingBoard.getInitialState({
  CBs: null,
  cbList: cbListInitialState,
  isLoading: false,
  error: null,
  selectedCB: null,
  selectedUploadCB: null,
  saveCBDialogStatus: false
});


export const CBReducer = createReducer(
  initialState,

  on(editPrjCBPageActionTypes.loadProjectCBList, (state, action) => {
    console.info('loadProjectCBList in Reducer');
    return {
      ...state,
      cbList: adapterControllingBoard.setAll(action.cbList, state.cbList)
      //cbList: adapterControllingBoard.addAll(action.cbList, state.cbList)
    };
  }),

  on(editPrjCBPageActionTypes.addCBSuccess, (state, action) => {
    console.info('addCBSuccess in Reducer');
    return {
      ...state,
      cbList: adapterControllingBoard.addOne(action.cb, state.cbList)
    };
  }),

  on(editPrjCBPageActionTypes.addCBFailure, (state, action) => {
    console.info('addCBFailure in Reducer');
    return { ...state, error: action.error };
  }),

  on(editPrjCBPageActionTypes.updateCBSuccess, (state, action) => {
    console.info('updateCBSuccess in Reducer');
    return {
      ...state,
      cbList: adapterControllingBoard.upsertOne(action.cb, state.cbList)
    };
  }),

  on(editPrjCBPageActionTypes.updateCBFailure, (state, action) => {
    console.info('updateCBFailure in Reducer');
    return { ...state, error: action.error };
  }),


  on(editPrjCBPageActionTypes.setSaveCBDialogStatus, (state, action) => {
    console.info('setSaveCBDialogStatus in Reducer');
    return {
      ...state,
      saveCBDialogStatus: action.status
    };
  }),

  on(editPrjCBPageActionTypes.setSelectedCB, (state, action) => {
    console.info('setSelectedCB in Reducer');
    return {
      ...state,
      selectedCB: action.cb,
      saveCBDialogStatus: true
    };
  }),

  on(editPrjCBPageActionTypes.setSelectedUploadCB, (state, action) => {
    console.info('setSelectedUploadCB in Reducer');
    return {
      ...state,
      selectedUploadCB: action.cb
    };
  }),

  on(editPrjCBPageActionTypes.updateCBDocCount, (state, action) => {
    //console.info('updateEventDocCount in Reducer');
    return {
      ...state,
      cbList: adapterControllingBoard.upsertOne(action.cb, state.cbList)
    };
  }),

);

export const { selectAll, selectIds } = adapterControllingBoard.getSelectors();

export const courseFeatureSelector = createFeatureSelector<State>('controllingBoard');

export const getAllCBs = createSelector(
  courseFeatureSelector,
  selectAll
);

export const getControllingBoards = (state: State) => state.CBs;
export const getControllingBoardList = (state: State) => state.cbList;
export const getSelectedCB = (state: State) => state.selectedCB;
export const getSelectedUploadCB = (state: State) => state.selectedUploadCB;
export const getSaveCBDialogStatus = (state: State) => state.saveCBDialogStatus;


