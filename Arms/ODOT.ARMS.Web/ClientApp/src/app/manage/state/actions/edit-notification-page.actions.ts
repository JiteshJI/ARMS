import { createAction, props } from '@ngrx/store';
import { ConfigRaw } from '../../models/config-raw';

export const loadEditNotificationPage = createAction(
  '[EditNotificationPage] Load EditNotificationPage'
);

export const loadEditNotificationPageSuccess = createAction(
  '[EditNotificationPage] Load EditNotificationPage Success',
  props<{ notification: ConfigRaw }>()
);

export const loadEditNotificationPageFailure = createAction(
  '[EditNotificationPage] Load EditNotificationPage Failure',
  props<{ error: string }>()
);

export const updateNotificationPage = createAction(
  '[EditNotificationPage] Update Edit Notification Page',
  props<{ notification: ConfigRaw }>()
);

export const updateNotificationPageSuccess = createAction(
  '[EditNotificationPage] Update Edit Notification Page Success',
  props<{ notification: ConfigRaw }>()
);

export const updateNotificationPageFailure = createAction(
  '[EditNotificationPage] Update Edit Notification Page Failure',
  props<{ error: string }>()
);


export const editNotificationPageActionTypes = {
  loadEditNotificationPage,
  loadEditNotificationPageSuccess,
  loadEditNotificationPageFailure,
  updateNotificationPage,
  updateNotificationPageSuccess,
  updateNotificationPageFailure
};




