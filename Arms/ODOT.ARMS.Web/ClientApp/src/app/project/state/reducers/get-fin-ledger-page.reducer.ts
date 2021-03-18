import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { LedgerRaw } from '../../models/ledger-raw';
import { getFinLedgerPageActionType } from '../actions/get-fin-ledger-page.actions';

//**************************************Ledgers***********************************************************************//

export interface LedgerState extends EntityState<LedgerRaw> {
  isLoading: false;
  error: null;
  SelectedLedgers: LedgerRaw;
}

export const adapterLedger: EntityAdapter<LedgerRaw> = createEntityAdapter<LedgerRaw>({
  selectId: (event: LedgerRaw) => event.rowNum,
  sortComparer: false,
});

export const initialState: LedgerState = adapterLedger.getInitialState({
  isLoading: false,
  error: null,
  SelectedLedgers: null,
});

export const LedgerReducer = createReducer(
  initialState,

  on(getFinLedgerPageActionType.loadLedgersByProjectIdSuccess, (state, action) => {
    //return adapterLedger.addAll(
    return adapterLedger.setAll(
      action.Ledger,    //.SelectedLedgers,
      { ...state, projectLoaded: false }
    );
  }),
);
export const { selectAll, selectIds } = adapterLedger.getSelectors();

export const courseFeatureSelector = createFeatureSelector<LedgerState>('Ledgers');

export const getAllLedgers = createSelector(
  courseFeatureSelector,
  selectAll
);

//**************************************Ledgers***********************************************************************//
