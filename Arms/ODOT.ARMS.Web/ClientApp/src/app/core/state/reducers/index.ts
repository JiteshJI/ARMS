import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../state/reducers';
import * as fromReferenceData from "./reference-data.reducer";


export interface CoreState {
  referenceData: fromReferenceData.State;
}

export interface State extends fromRoot.State {
  core: CoreState;
}

export const reducers: ActionReducerMap<CoreState> = {
  referenceData: fromReferenceData.reducer,
};


/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `project` state.
 *
 * Selectors are used with the `select` operator.
 *
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.projectState$ = state$.pipe(select(getProjectState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getCoreState = createFeatureSelector<State, CoreState>('core');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */

/* Reference Data Selectors */
export const getReferenceDataState = createSelector(
  getCoreState,
  (state: CoreState) => state.referenceData
);

export const getPrimaryEvents = createSelector(
  getReferenceDataState,
  fromReferenceData.getPrimaryEvents
);

export const getSecondaryEvents = createSelector(
  getReferenceDataState,
  fromReferenceData.getSecondaryEvents
);

export const getEventStatuses = createSelector(
  getReferenceDataState,
  fromReferenceData.getEventStatuses
);

export const getProjectEventReferenceDataLoaded = createSelector(
  getReferenceDataState,
  fromReferenceData.getProjectEventReferenceDataLoaded
);

export const getProjectEventReferenceDataLoadError = createSelector(
  getReferenceDataState,
  fromReferenceData.getProjectEventReferenceDataLoadError
);

export const getProjectEventReferenceDataLoading = createSelector(
  getReferenceDataState,
  fromReferenceData.getProjectEventReferenceDataLoading
);

export const getProjectCBReferenceDataLoading = createSelector(
  getReferenceDataState,
  fromReferenceData.getProjectCBReferenceDataLoading
);

export const getProjectCBReferenceDataLoaded = createSelector(
  getReferenceDataState,
  fromReferenceData.getProjectCBReferenceDataLoaded
);

export const getProjectCBReferenceDataLoadError = createSelector(
  getReferenceDataState,
  fromReferenceData.getProjectCBReferenceDataLoadError
);

export const getCBStatusItems = createSelector(
  getReferenceDataState,
  fromReferenceData.getCBStatusItems
);

export const getCBCategoryItems = createSelector(
  getReferenceDataState,
  fromReferenceData.getCBCategoryItems
);

export const getCBtypeItems = createSelector(
  getReferenceDataState,
  fromReferenceData.getCBtypeItems
);

export const getPhaseStatuses = createSelector(
  getReferenceDataState,
  fromReferenceData.getPhaseStatuses
);

export const getProjectPhaseReferenceDataLoaded = createSelector(
  getReferenceDataState,
  fromReferenceData.getProjectPhaseReferenceDataLoaded
);

export const getProjectPhaseReferenceDataLoading = createSelector(
  getReferenceDataState,
  fromReferenceData.getProjectPhaseReferenceDataLoading
);

export const getProjectPhaseReferenceDataLoadError = createSelector(
  getReferenceDataState,
  fromReferenceData.getProjectPhaseReferenceDataLoadError
);

export const getBudgetCategories = createSelector(
  getReferenceDataState,
  fromReferenceData.getBudgetCategories
);

export const getBudgetCategoriesDataLoaded = createSelector(
  getReferenceDataState,
  fromReferenceData.getBudgetCategoriesDataLoaded
);

export const getBudgetCategoriesDataLoading = createSelector(
  getReferenceDataState,
  fromReferenceData.getBudgetCategoriesDataLoading
);

export const getBudgetCategoriesDataLoadError = createSelector(
  getReferenceDataState,
  fromReferenceData.getBudgetCategoriesDataLoadError
);


export const getFundingReferenceDataLoaded = createSelector(
  getReferenceDataState,
  fromReferenceData.getFundingReferenceDataLoaded
);

export const getFundingReferenceDataLoadError = createSelector(
  getReferenceDataState,
  fromReferenceData.getFundingReferenceDataLoadError
);
export const getFundingReferenceDataLoading = createSelector(
  getReferenceDataState,
  fromReferenceData.getFundingReferenceDataLoading
);

export const getFundingType = createSelector(
  getReferenceDataState,
  fromReferenceData.getFundingType
);

export const getFundingSource = createSelector(
  getReferenceDataState,
  fromReferenceData.getFundingSource
);

export const getFundingStatus = createSelector(
  getReferenceDataState,
  fromReferenceData.getFundingStatus
);

export const getInvoiceReferenceDataLoading = createSelector(
  getReferenceDataState,
  fromReferenceData.getInvoiceReferenceDataLoading
);

export const getInvoiceReferenceDataLoaded = createSelector(
  getReferenceDataState,
  fromReferenceData.getInvoiceReferenceDataLoaded
);

export const getInvoiceReferenceDataLoadError = createSelector(
  getReferenceDataState,
  fromReferenceData.getInvoiceReferenceDataLoadError
);

export const getFundingCategory = createSelector(
  getReferenceDataState,
  fromReferenceData.getFundingCategory
);

export const getBudgetCategory = createSelector(
  getReferenceDataState,
  fromReferenceData.getBudgetCategory
);
