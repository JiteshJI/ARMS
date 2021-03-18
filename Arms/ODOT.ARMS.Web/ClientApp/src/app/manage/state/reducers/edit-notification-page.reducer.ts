//import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector, Action, createReducer, on } from '@ngrx/store';
import * as editNotificationPageActionTypes from '../actions/edit-notification-page.actions';
import { ConfigRaw } from "../../models/config-raw";


export interface State {
  notification: ConfigRaw;
  notificationLoaded: boolean;
  error: string;
};

export const initialState: State = {
  notification: null,
  notificationLoaded: false,
  error: null
};


export const notificationReducer = createReducer(
  initialState,

  //on(editNotificationPageActionTypes.loadEditNotificationPage, (state, action) => {
  //  console.info('notificationReducer loadEditNotificationPage notificationLoaded: false');
    //return {
    //  ...state,
    //  notificationLoaded: false
    //}
  //}),

  on(editNotificationPageActionTypes.loadEditNotificationPageSuccess, (state, action) => {
    console.info('notificationReducer loadEditNotificationPageSuccess notificationLoaded: true');
    return {
      ...state,
      notification: action.notification,
      notificationLoaded: true//,
      //error: null
    }
  }),

  on(editNotificationPageActionTypes.loadEditNotificationPageFailure, (state, action) => {
    return {
      ...state,
      //notification: null,
      //notificationLoaded: false,
      error: action.error
    }
  }),

  on(editNotificationPageActionTypes.updateNotificationPageFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),

  on(editNotificationPageActionTypes.updateNotificationPageSuccess, (state, action) => {
    return {
      ...state,
      notification: action.notification//,
      //error: null
    }
  })

);

export const getNotificationError = (state: State) => state.error;
export const getNotificationLoaded = (state: State) => state.notificationLoaded;
export const getNotification = (state: State) => state.notification;
export const getNotificationTxt = (state: State) => state.notification.value;

