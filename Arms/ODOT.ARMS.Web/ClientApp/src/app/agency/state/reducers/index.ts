/// <reference path="../../../state/reducers/index.ts" />
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../../state/reducers';
import * as fromAgency from './agency';
import * as fromAdministrationCategory from './administration-categories';

export interface AgencyState {
  specificlist: fromAgency.State;
  administrationCategoryList: fromAdministrationCategory.State;
}

export interface State extends fromRoot.State {
  agency: AgencyState;
}

export const reducers: ActionReducerMap<AgencyState> = {
  administrationCategoryList: fromAdministrationCategory.reducer,
  specificlist: fromAgency.reducer
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.booksState$ = state$.pipe(select(getBooksState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getAdminstrationState = createFeatureSelector<State, AgencyState>('agency');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getSpecificListEntitiesState = createSelector(getAdminstrationState, state => state.specificlist);

export const getSpecificListState = createSelector(
  getSpecificListEntitiesState,
  fromAgency.getSpecificListState
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getSpecificListIds,
  selectEntities: getSpecificListEntities,
  selectAll: getAllSpecificList,
  selectTotal: getTotalSpecificList,
} = fromAgency.adapter.getSelectors(getSpecificListState);


/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getAdminstrationCategoryEntitiesState = createSelector(getAdminstrationState, state => state.administrationCategoryList);

export const getSelectedAdminstrationCategoryId = createSelector(getAdminstrationCategoryEntitiesState,
  fromAdministrationCategory.getSelectedAdminstrationCategoryId);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getAdminstrationCategoryIds,
  selectEntities: getAdminstrationCategoryEntities,
  selectAll: getAllAdminstrationCategory,
  selectTotal: getTotalAdminstrationCategory,
} = fromAdministrationCategory.adapter.getSelectors(getAdminstrationCategoryEntitiesState);




