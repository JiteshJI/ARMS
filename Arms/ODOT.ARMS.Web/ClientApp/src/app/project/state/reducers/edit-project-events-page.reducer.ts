import { Action, createReducer, on, createSelector, createFeatureSelector } from "@ngrx/store"
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { EventRaw } from '../../models/event-raw';
import { editPrjEventsPageActionTypes } from '../actions/edit-project-events-page.actions';
import { PhaseRaw } from '../../models/phase-raw';


export const editPrjEventsPageFeatureKey = 'editPrjEventsPage';

export interface State extends EntityState<EventRaw> {
  events: EventRaw[];
  eventList: EventListState;
  phases: PhaseRaw[];
  isLoading: boolean;
  error: string;
  selectedEvent: EventRaw;
  selectedUploadEvent: EventRaw;
  saveEventDialogStatus: boolean;
}


/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface EventListState extends EntityState<EventRaw> { }

export const adapterEvent: EntityAdapter<EventRaw> = createEntityAdapter<EventRaw>({
  selectId: (event: EventRaw) => event.eventId,
  sortComparer: false,
});


/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
const eventListInitialState: EventListState = adapterEvent.getInitialState({});
//const uploadListInitialState: UploadListState = adapterUpload.getInitialState({});

export const initialState: State = adapterEvent.getInitialState({
  events: null,
  eventList: eventListInitialState,
  phases: null,
  isLoading: false,
  error: null,
  selectedEvent: null,
  selectedUploadEvent: null,
  saveEventDialogStatus: false,
});


export const reducer = createReducer(
  initialState,

  on(editPrjEventsPageActionTypes.addEventSuccess, (state, action) => {
    //console.info('addEventSuccess in Reducer');
    return {
      ...state,
      eventList: adapterEvent.setAll(action.events, state.eventList)
    };
  }),

  on(editPrjEventsPageActionTypes.addEventFailure, (state, action) => {
    //console.info('addEventFailure in Reducer');
    return { ...state, error: action.error };
  }),

  on(editPrjEventsPageActionTypes.updateEventSuccess, (state, action) => {
    //console.info('updateEventSuccess in Reducer');
    return {
      ...state,
      eventList: adapterEvent.upsertOne(action.event, state.eventList)
    };
  }),

  on(editPrjEventsPageActionTypes.updateEventDocCount, (state, action) => {
    //console.info('updateEventDocCount in Reducer');
    return {
      ...state,
      eventList: adapterEvent.upsertOne(action.event, state.eventList)
    };
  }),

  on(editPrjEventsPageActionTypes.updateEventFailure, (state, action) => {
    //console.info('updateEventFailure in Reducer');
    return { ...state, error: action.error };
  }),

  on(editPrjEventsPageActionTypes.loadProjectEvents, (state, action) => {
    //console.info('loadProjectEvents in Reducer');
    return {
      ...state,
      //eventList: adapterEvent.addAll(action.events, state.eventList)
      eventList: adapterEvent.setAll(action.events, state.eventList)
    };
  }),

  on(editPrjEventsPageActionTypes.loadProjectPhaseList, (state, action) => {
    //console.info('loadProjectPhaseList in Reducer');
    return {
      ...state,
      phases: action.phases
    };
  }),

  on(editPrjEventsPageActionTypes.setSelectedEvent, (state, action) => {
    //console.info('setSelectedEvent in Reducer');
    return {
      ...state,
      selectedEvent: action.event,
      saveEventDialogStatus: true
    };
  }),

  on(editPrjEventsPageActionTypes.setSaveEventDialogStatus, (state, action) => {
    //console.info('setSaveEventDialogStatus in Reducer');
    return {
      ...state,
      saveEventDialogStatus: action.status
    };
  }),

  on(editPrjEventsPageActionTypes.setSelectedUploadEvent, (state, action) => {
    //console.info('setSelectedUploadEvent in Reducer');
    return {
      ...state,
      selectedUploadEvent: action.event,
    };
  }),

);

export const { selectAll, selectIds } = adapterEvent.getSelectors();

export const courseFeatureSelector = createFeatureSelector<State>('events');

export const getAllEvents = createSelector(
  courseFeatureSelector,
  selectAll
);

export const getEvents = (state: State) => state.events;
export const getEventList = (state: State) => state.eventList;
export const getPhaseList = (state: State) => state.phases;
export const getSelectedEvent = (state: State) => state.selectedEvent;
export const getSelectedUploadEvent = (state: State) => state.selectedUploadEvent;//remove
export const getSaveEventDialogStatus = (state: State) => state.saveEventDialogStatus;


