import { createAction, props } from '@ngrx/store';
import { EventRaw } from '../../models/event-raw';
import { PhaseRaw } from '../../models/phase-raw';

export const loadProjectEvents = createAction(
  '[EditPrjEventsPage] Load ProjectEvents',
  props<{ events: EventRaw[] }>()
);

export const loadProjectPhaseList = createAction(
  '[EditPrjEventsPage] Load PhaseList',
  props<{ phases: PhaseRaw[] }>()
);

export const setSelectedEvent = createAction(
  '[EditPrjEventsPage] Set Selected ProjectEvent',
  props<{ event: EventRaw }>()
);

export const setSelectedUploadEvent = createAction(
  '[EditPrjEventsPage] Set Selected ProjectUploadEvent',
  props<{ event: EventRaw }>()
);

export const updateEventDocCount = createAction(
  '[EditPrjEventsPage] Update Event Doc Count',
  props<{ event: EventRaw }>()
);

export const addEvent = createAction(
  '[EditPrjEventsPage] Add ProjectEvent',
  props<{ event: EventRaw }>()
);

export const addEventSuccess = createAction(
  '[EditPrjEventsPage] Add ProjectEvent Success',
  props<{ events: EventRaw[] }>()
);

export const addEventFailure = createAction(
  '[EditPrjEventsPage] Add ProjectEvent Failed',
  props<{ error: string }>()
);

export const updateEvent = createAction(
  '[EditPrjEventsPage] Update ProjectEvent',
  props<{ event: EventRaw }>()
);

export const updateEventSuccess = createAction(
  '[EditPrjEventsPage] Update ProjectEvent Success',
  props<{ event: EventRaw }>()
);

export const updateEventFailure = createAction(
  '[EditPrjEventsPage] Update ProjectEvent Failed',
  props<{ error: string }>()
);

export const setSaveEventDialogStatus = createAction(
  '[EditPrjEventsPage] Set Save Event Dialog Status',
  props<{ status: boolean }>()
);



export const editPrjEventsPageActionTypes = {
  loadProjectEvents,
  loadProjectPhaseList,
  setSelectedEvent,
  setSelectedUploadEvent,//remove
  updateEventDocCount,
  addEvent,
  addEventSuccess,
  addEventFailure,
  updateEvent,
  updateEventSuccess,
  updateEventFailure,
  setSaveEventDialogStatus
};

