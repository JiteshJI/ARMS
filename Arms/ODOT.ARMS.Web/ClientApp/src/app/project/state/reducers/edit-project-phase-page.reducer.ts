import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { PhaseRaw } from '../../models/phase-raw';
import * as editPrjPhasePageActionTypes from '../actions/edit-project-phase-page.actions';


export const editPrjPhasePageFeatureKey = 'editPrjPhasePage';

export interface State extends EntityState<PhaseRaw> {
  phases: PhaseRaw[];
  phaseList: PhaseListState;
  selectedPhase: PhaseRaw;
  isLoading: boolean;
  error: string;
  savePhaseDialogStatus: boolean;
}

export interface PhaseListState extends EntityState<PhaseRaw> { }

export const adapterPhase: EntityAdapter<PhaseRaw> = createEntityAdapter<PhaseRaw>({
  selectId: (phase: PhaseRaw) => phase.phaseId,
  sortComparer: false
});

export const phaseInitialListState: PhaseListState = adapterPhase.getInitialState({});

export const initialState: State = adapterPhase.getInitialState({
  phases: null,
  phaseList: phaseInitialListState,
  selectedPhase: null,
  isLoading: false,
  error: null,
  savePhaseDialogStatus: false
});


export const projectPhaseReducer = createReducer(
  initialState,

  on(editPrjPhasePageActionTypes.loadProjectPhases, (state, action) => {
    console.log('loadProjectPhases reducer', action);
    return {
      ...state,
      phaseList: adapterPhase.setAll(action.phases, state.phaseList)
    };
  }),

  on(editPrjPhasePageActionTypes.addPhaseSuccess, (state, action) => {
    return {
      ...state,
      phaseList: adapterPhase.addOne(action.phase, state.phaseList)
    };
  }),

  on(editPrjPhasePageActionTypes.addPhaseFailure, (state, action) => {
    return { ...state, error: action.error }
  }),

  on(editPrjPhasePageActionTypes.updatePhaseSuccess, (state, action) => {
    return {
      ...state,
      phaseList: adapterPhase.upsertOne(action.phase, state.phaseList)
    };
  }),

  on(editPrjPhasePageActionTypes.updatePhaseFailure, (state, action) => {
    return { ...state, error: action.error };
  }),

  on(editPrjPhasePageActionTypes.setSelectedPhase, (state, action) => {
    return {
      ...state,
      selectedPhase: action.selectedPhase,
      savePhaseDialogStatus: true
    };
  }),

  on(editPrjPhasePageActionTypes.setSavePhaseDialogStatus, (state, action) => {
    return { ...state, savePhaseDialogStatus: action.status };
  }),

  on(editPrjPhasePageActionTypes.mergePhasesSuccess, (state, action) => {
    return {
      ...state,
      phaseList: adapterPhase.upsertMany(action.phases, state.phaseList)
    };
  }),

  on(editPrjPhasePageActionTypes.mergePhasesFailure, (state, action) => {
    return {...state, error: action.error };
  })

);

export const { selectAll, selectIds } = adapterPhase.getSelectors();

export const courseFeatureSelector = createFeatureSelector<State>('phase');

export const getAllPhases = createSelector(
  courseFeatureSelector,
  selectAll
);

export const getPhases = (state: State) => state.phaseList;
export const getSelectedPhase = (state: State) => state.selectedPhase;
export const getSavePhaseDialogStatus = (state: State) => state.savePhaseDialogStatus;
