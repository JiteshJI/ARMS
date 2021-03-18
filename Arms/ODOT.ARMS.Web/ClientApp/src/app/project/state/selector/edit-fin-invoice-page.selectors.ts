import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromInvoice from '../reducers/edit-fin-invoice-page.reducer';

export interface State { invoice: fromInvoice.InvoiceState };

export const getInvoiceState = createFeatureSelector<fromInvoice.InvoiceState>('invoice');

export const getSelectedInvoice = (state: fromInvoice.InvoiceState) => state.selectedInvoice;
export const getSelectedUploadInvoice = (state: fromInvoice.InvoiceState) => state.selectedUploadInvoice;
export const getSaveInvoiceDialogStatus = (state: fromInvoice.InvoiceState) => state.saveInvoiceDialogStatus;
export const getPhaseList = (state: fromInvoice.InvoiceState) => state.phases;
export const getBudgetCategoryList = (state: fromInvoice.InvoiceState) => state.budgetCategories;
export const getEncumbranceList = (state: fromInvoice.InvoiceState) => state.encumbranceSummary;
export const getProjectBalances = (state: fromInvoice.InvoiceState) => state.projectBalance;


export const selectSelectedInvoice = createSelector(
  getInvoiceState,
  (state: fromInvoice.InvoiceState) => state.selectedInvoice
);

export const selectUploadInvoice = createSelector(
  getInvoiceState,
  (state: fromInvoice.InvoiceState) => state.selectedUploadInvoice
);

export const selectSaveDialogStatus = createSelector(
  getInvoiceState,
  (state: fromInvoice.InvoiceState) => state.saveInvoiceDialogStatus
);

export const selectPhases = createSelector(
  getInvoiceState,
  (state: fromInvoice.InvoiceState) => state.phases
);

export const selectBudgetCategories = createSelector(
  getInvoiceState,
  (state: fromInvoice.InvoiceState) => state.budgetCategories
);

export const selectEncumbranceSummary = createSelector(
  getInvoiceState,
  (state: fromInvoice.InvoiceState) => state.encumbranceSummary
);

export const selectProjectBalances = createSelector(
  getInvoiceState,
  (state: fromInvoice.InvoiceState) => state.projectBalance
);

export const getInvoiceListState = createSelector(
  getInvoiceState,
  (state: fromInvoice.InvoiceState) => state.invoiceList
);

export const selectInvoices = createSelector(
  getInvoiceListState,
  (state: fromInvoice.InvoiceListState) => state
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
  selectIds: getInvoiceListIds,
  selectEntities: getInvoiceListEntities,
  selectAll: getAllInvoices,
  selectTotal: getTotalInvoiceList,
} = fromInvoice.adapterInvoice.getSelectors(getInvoiceListState);

