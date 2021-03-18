import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProjectLedger from '../reducers/get-fin-ledger-page.reducer';


export interface State { finLedger: fromProjectLedger.LedgerState; }
export const reducers: ActionReducerMap<State> = { finLedger: fromProjectLedger.LedgerReducer };


/* creating a feature selector */
export const selectLedgerState = createFeatureSelector<fromProjectLedger.LedgerState>('projectLedger');

/* creating default supported ngrx/entity selectors */

/** select IDs */
export const selectIds = createSelector(
  selectLedgerState,
  fromProjectLedger.selectIds
);

/** selectAll */
export const selectAllfinLedgers = createSelector(
  selectLedgerState,
  fromProjectLedger.selectAll
);

/** selectEntities */
export const selectEntities = createSelector(
  selectLedgerState,
  fromProjectLedger.selectAll
);


export const getLedgerList = createSelector(
  selectLedgerState,
  fromProjectLedger.getAllLedgers
);

export const {
  selectIds: getLedgerListIds,
  selectEntities: getLedgerListEntities,
  selectAll: getAllLedgers,
  selectTotal: getTotalLedgerList,
} = fromProjectLedger.adapterLedger.getSelectors(getLedgerList);



