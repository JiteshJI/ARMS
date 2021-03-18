import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromNotification from '../reducers/edit-notification-page.reducer';
import * as fromRoot from '../../../state/reducers';

export interface NotificationState {
  notification: fromNotification.State;
}

export interface State extends fromRoot.State {
  notification: NotificationState;
}

export const reducers: ActionReducerMap<NotificationState> = {
  notification: fromNotification.notificationReducer
};

//export interface State extends fromRoot.State {
//  notification: NotificationState
//}


/* creating a feature selector */
export const selectNotificationState = createFeatureSelector<fromNotification.State>('notification');

export const getNotificationEntityState = createSelector(selectNotificationState, state => state.notification);

//export const selectNotificationBaseState = createFeatureSelector<State, NotificationState>('notification');

//export const getNotificationState = createSelector(
//  selectNotificationState,
//  (state: NotificationState) => state.notification
//);

//export const selectNotificationState = createSelector(
//  selectNotificationState,
//  (state: NotificationState) => state.notification
//);


export const selectNotification = createSelector(
  selectNotificationState,
  state => state.notification
  //fromNotification.getNotification
);

export const selectNotificationTxt = createSelector(
  selectNotificationState,
  state => state.notification.value
  //fromNotification.getNotificationTxt
);

export const selectNotificationLoaded = createSelector(
  selectNotificationState,
  state => state.notificationLoaded
  //fromNotification.getNotificationLoaded
);


export const selectNotificationError = createSelector(
  selectNotificationState,
  state => state.error
  //fromNotification.getNotificationError
);

