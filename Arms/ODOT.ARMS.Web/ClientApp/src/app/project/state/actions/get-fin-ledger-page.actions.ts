import { createAction, props } from '@ngrx/store';
import { LedgerRaw } from '../../models/ledger-raw';


export const loadLedgerByProjectId = createAction(
  '[ProjectLedger] Load Ledgers by Project Id',
  props<{ projId: string }>()
);

export const loadLedgersByProjectIdSuccess = createAction(
  '[ProjectLedger] Load Ledgers by Project Id Success',
  props<{ Ledger: LedgerRaw[] }>()
);

export const loadLedgersByProjectIdFail = createAction(
  '[ProjectLedger] Load Ledgers by Project Id Failure',
  props<{ error: string }>()
);

export const getFinLedgerPageActionType = {
  loadLedgerByProjectId,
  loadLedgersByProjectIdSuccess,
  loadLedgersByProjectIdFail
};
