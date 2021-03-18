import { createAction, props } from '@ngrx/store';
import { InvoiceRaw, BudgetCatDDRaw } from '../../models/invoice-raw';
import { PhaseRaw } from '../../models/phase-raw';
import { EncumbranceRaw } from '../../models/encumbrance-raw';
import { ProjectBalanceRaw } from '../../models/project-balance-raw';

//========================================================================================================
//
// Get Phase
//
//=======================================================================================================
export const loadProjectPhaseList = createAction(
  '[EditFinInvoicePage] Load PhaseList',
  props<{ phases: PhaseRaw[] }>()
);

//========================================================================================================
//
// Get Budget Categories
//
//=======================================================================================================
export const loadBudgetCategoriesList = createAction(
  '[EditFinInvoicePage] Load BudgetCategoryList',
  props<{ budgetCategories: BudgetCatDDRaw[] }>()
);


//========================================================================================================
//
// Get Project Balances
//
//=======================================================================================================
export const loadProjectBalance = createAction(
  '[EditFinInvoicePage] Load Project Balance',
  props < { projectBalance: ProjectBalanceRaw }>()
);

export const loadProjectBalanceSuccess = createAction(
  '[EditFinInvoicePage] Load Project Balance',
  props<{ projectBalance: ProjectBalanceRaw }>()
);

//========================================================================================================
//
// Get Warehouse Encumbrance
//
//=======================================================================================================
export const loadEncumbranceList = createAction(
  '[EditFinInvoicePage] Load EncumbranceList',
  props<{ encumbranceSummary: EncumbranceRaw[] }>()
);



//========================================================================================================
//
// Invoice Load actions
//
//=======================================================================================================
export const loadInvoiceList = createAction(
  '[EditFinInvoicePage] Load loadInvoiceList'
);//probably won't use this...plan to call the service directly

export const loadInvoiceListSuccess = createAction(
  '[EditFinInvoicePage] Load loadInvoiceList Success',
  props<{ invoices: InvoiceRaw[] }>()
);

export const loadInvoiceListFailure = createAction(
  '[EditFinInvoicePage] Load loadInvoiceList Failure',
  props<{ error: string }>()
);

//========================================================================================================
//
// Invoice Crud actions
//
//========================================================================================================
export const addInvoice = createAction(
  '[EditFinInvoicePage] Add Invoice',
  props<{ invoice: InvoiceRaw }>()
);

export const addInvoiceSuccess = createAction(
  '[EditFinInvoicePage] Add Invoice Success',
  props<{ invoice: InvoiceRaw }>()
);

export const addInvoiceFailure = createAction(
  '[EditFinInvoicePage] Add Invoice Failed',
  props<{ error: string }>()
);

export const updateInvoice = createAction(
  '[EditFinInvoicePage] Update Invoice',
  props<{ invoice: InvoiceRaw }>()
);

export const updateInvoiceSuccess = createAction(
  '[EditFinInvoicePage] Update Invoice Success',
  props<{ invoice: InvoiceRaw }>()
);

export const updateInvoiceFailure = createAction(
  '[EditFinInvoicePage] Update Invoice Failed',
  props<{ error: string }>()
);

//========================================================================================================
//
// Invoice Dialog actions
//
//========================================================================================================
export const setSaveInvoiceDialogStatus = createAction(
  '[EditFinInvoicePage] Set Save Invoice Status',
  props<{ status: boolean }>()
);

//triggers Invoice dialog
export const setSelectedInvoice = createAction(
  '[EditFinInvoicePage] Set Selected Project Invoice',
  props<{ invoice: InvoiceRaw }>()
);

//triggers Invoice Upload dialog
export const setSelectedUploadInvoice = createAction(
  '[EditFinInvoicePage] Set Selected Project Upload Invoice',
  props<{ invoice: InvoiceRaw }>()
);

//========================================================================================================
//
// Force the Invoice grid to display current file upload count
//
//========================================================================================================
export const updateInvoiceDocCount = createAction(
  '[EditFinInvoicePage] Update Invoice Doc Count',
  props<{ invoice: InvoiceRaw }>()
);


export const editFinInvoicePageActionTypes = {
  loadProjectPhaseList,
  loadBudgetCategoriesList,
  loadEncumbranceList,
  loadProjectBalance,
  loadProjectBalanceSuccess,
  loadInvoiceList,
  loadInvoiceListSuccess,
  loadInvoiceListFailure,
  addInvoice,
  addInvoiceSuccess,
  addInvoiceFailure,
  updateInvoice,
  updateInvoiceSuccess,
  updateInvoiceFailure,
  setSaveInvoiceDialogStatus,
  setSelectedInvoice,
  setSelectedUploadInvoice,
  updateInvoiceDocCount
};





