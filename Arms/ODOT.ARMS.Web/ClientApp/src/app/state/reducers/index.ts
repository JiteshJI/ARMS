import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { Params, RouterStateSnapshot, Data } from '@angular/router';
import { Injectable } from '@angular/core';
import { browserWindowEnv } from 'src/app/core/services/env.service';
//import * as fromRoot from '../../../state/reducers';

/**
 * Treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

/**
 * State is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer
};

export const metaReducers: MetaReducer<State>[] = !browserWindowEnv.production ? [] : [];

export const routerState = createFeatureSelector<State, fromRouter.RouterReducerState<RouterStateUrl>>('router');

export const getRouterInfo = createSelector(
  routerState,
  state => state && state.state
);

export interface RouterStateUrl {
  url: string;
  params: Params;
  data: Data;
  queryParams: Params;  
}

@Injectable()
export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;    
    let params = {};
    let data = {};

    while (route) {
      params = {
        ...params,
        ...route.params
      };

      data = {
        ...data,
        ...route.data
      };
      
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;

    // Only return an object including the URL, params, data and query params
    // instead of the entire snapshot
    return { url, params, data, queryParams };
  }
}


