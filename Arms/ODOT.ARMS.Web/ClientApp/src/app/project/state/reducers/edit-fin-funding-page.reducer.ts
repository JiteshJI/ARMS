import { Action, createReducer, on, createSelector, createFeatureSelector } from "@ngrx/store"
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { FundingRaw } from '../../models/fundings-raw';
import { editFinFundingPageActionTypes } from '../actions/edit-funding-page.actions';
import { PhaseRaw } from '../../models/phase-raw';


export const editPrjFundingPageFeatureKey = 'editPrjFundingPage';

export interface State extends EntityState<FundingRaw> {
  Funding: FundingRaw[];
  FundingList: FundingListState;
  phases: PhaseRaw[];
  isLoading: boolean;
  error: string;
  selectedFunding: FundingRaw;
  selectedUploadFunding: FundingRaw;
  saveFundingDialogStatus: boolean;
}


/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface FundingListState extends EntityState<FundingRaw> { }

export const adapterFunding: EntityAdapter<FundingRaw> = createEntityAdapter<FundingRaw>({
  selectId: (Funding: FundingRaw) => Funding.encumbranceId,
  sortComparer: false,
});


/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
const FundingListInitialState: FundingListState = adapterFunding.getInitialState({});
//const uploadListInitialState: UploadListState = adapterUpload.getInitialState({});

export const initialState: State = adapterFunding.getInitialState({
  Funding: null,
  FundingList: FundingListInitialState,
  phases: null,
  isLoading: false,
  error: null,
  selectedFunding: null,
  selectedUploadFunding: null,
  saveFundingDialogStatus: false,
});


export const fundingReducer = createReducer(
  initialState,

  on(editFinFundingPageActionTypes.addFundingSuccess, (state, action) => {
    //console.info('addFundinguccess in Reducer');
    return {
      ...state,
      FundingList: adapterFunding.addOne(action.Funding, state.FundingList)
    };
  }),

  on(editFinFundingPageActionTypes.addFundingFailure, (state, action) => {
    //console.info('addFundingFailure in Reducer');
    return { ...state, error: action.error };
  }),

  on(editFinFundingPageActionTypes.updateFundingSuccess, (state, action) => {
    //console.info('updateFundinguccess in Reducer');
    return {
      ...state,
      FundingList: adapterFunding.upsertOne(action.Funding, state.FundingList)
    };
  }),

  on(editFinFundingPageActionTypes.updateFundingDocCount, (state, action) => {
    //console.info('updateFundingDocCount in Reducer');
    return {
      ...state,
      FundingList: adapterFunding.upsertOne(action.Funding, state.FundingList)
    };
  }),

  on(editFinFundingPageActionTypes.updateFundingFailure, (state, action) => {
    //console.info('updateFundingFailure in Reducer');
    return { ...state, error: action.error };
  }),

  on(editFinFundingPageActionTypes.loadProjectFunding, (state, action) => {
    //console.info('loadProjectFunding in Reducer');
    return {
      ...state,
      FundingList: adapterFunding.setAll(action.Funding, state.FundingList)
      //FundingList: adapterFunding.addAll(action.Funding, state.FundingList)
    };
  }),

  on(editFinFundingPageActionTypes.loadProjectPhaseList, (state, action) => {
    //console.info('loadProjectPhaseList in Reducer');
    return {
      ...state,
      phases: action.phases
    };
  }),

  on(editFinFundingPageActionTypes.setSelectedFunding, (state, action) => {
    //console.info('setSelectedFunding in Reducer');
    return {
      ...state,
      selectedFunding: action.Funding,
      saveFundingDialogStatus: true
    };
  }),

  on(editFinFundingPageActionTypes.setSaveFundingDialogStatus, (state, action) => {
    //console.info('setSaveFundingDialogStatus in Reducer');
    return {
      ...state,
      saveFundingDialogStatus: action.status
    };
  }),

  on(editFinFundingPageActionTypes.setSelectedUploadFunding, (state, action) => {
    //console.info('setSelectedUploadFunding in Reducer');
    return {
      ...state,
      selectedUploadFunding: action.Funding,
    };
  }),

);

export const { selectAll, selectIds } = adapterFunding.getSelectors();

export const courseFeatureSelector = createFeatureSelector<State>('projectFunding');

export const getAllFunding = createSelector(
  courseFeatureSelector,
  selectAll
);

export const getFunding = (state: State) => state.Funding;
export const getFundingList = (state: State) => state.FundingList;
export const getPhaseList = (state: State) => state.phases;
export const getSelectedFunding = (state: State) => state.selectedFunding;
export const getSelectedUploadFunding = (state: State) => state.selectedUploadFunding;//remove
export const getSaveFundingDialogStatus = (state: State) => state.saveFundingDialogStatus;


