import { Action, createReducer, on, createSelector, createFeatureSelector } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { InvoiceRaw, BudgetCatDDRaw } from '../../models/invoice-raw';
import { PhaseRaw } from '../../models/phase-raw';
import { EncumbranceRaw } from '../../models/encumbrance-raw';
import { ProjectBalanceRaw } from '../../models/project-balance-raw';
import { editFinInvoicePageActionTypes } from '../actions/edit-fin-invoice-page.actions';


export const editFinInvoicePageFeatureKey = 'editFinInvoicePage';

export interface InvoiceState extends EntityState<InvoiceRaw> {
  invoices: InvoiceRaw[];
  invoiceList: InvoiceListState;
  phases: PhaseRaw[],
  budgetCategories: BudgetCatDDRaw[];
  encumbranceSummary: EncumbranceRaw[];
  projectBalance: ProjectBalanceRaw;
  isLoading: boolean;
  error: string;
  selectedInvoice: InvoiceRaw;
  selectedUploadInvoice: InvoiceRaw;
  saveInvoiceDialogStatus: boolean;
}

export interface InvoiceListState extends EntityState<InvoiceRaw> { }

export const adapterInvoice: EntityAdapter<InvoiceRaw> = createEntityAdapter<InvoiceRaw>({
  selectId: (invoice: InvoiceRaw) => invoice.invoiceId,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
const invoiceListInitialState: InvoiceListState = adapterInvoice.getInitialState({});

export const initialState: InvoiceState = adapterInvoice.getInitialState({
  invoices: null,
  invoiceList: invoiceListInitialState,
  phases: null,
  budgetCategories: null,
  encumbranceSummary: null,
  projectBalance: null,
  isLoading: false,
  error: null,
  selectedInvoice: null,
  selectedUploadInvoice: null,
  saveInvoiceDialogStatus: false
});


export const invoiceReducer = createReducer(
  initialState,

  on(editFinInvoicePageActionTypes.loadInvoiceListSuccess, (state, action) => {
    console.log('loadInvoiceListSuccess reducer', action.invoices);
    return {
      ...state,
      invoiceList: adapterInvoice.setAll(action.invoices, state.invoiceList)
    };
  }),

  on(editFinInvoicePageActionTypes.loadInvoiceListFailure, (state, action) => {
    console.log('loadInvoiceListFailure reducer');
    return {
      ...state,
      error: action.error
    };
  }),

  on(editFinInvoicePageActionTypes.addInvoiceSuccess, (state, action) => {
    console.log('addInvoiceSuccess reducer');
    return {
      ...state,
      invoiceList: adapterInvoice.addOne(action.invoice, state.invoiceList)
    };
  }),

  on(editFinInvoicePageActionTypes.addInvoiceFailure, (state, action) => {
    console.log('addInvoiceFailure reducer');
    return {
      ...state,
      error: action.error
    };
  }),

  on(editFinInvoicePageActionTypes.updateInvoiceSuccess, (state, action) => {
    console.log('updateInvoiceSuccess reducer', action.invoice);
    return {
      ...state,
      invoiceList: adapterInvoice.upsertOne(action.invoice, state.invoiceList)
    };
  }),

  on(editFinInvoicePageActionTypes.updateInvoiceFailure, (state, action) => {
    console.log('updateInvoiceFailure reducer');
    return {
      ...state,
      error: action.error
    };
  }),

  on(editFinInvoicePageActionTypes.setSaveInvoiceDialogStatus, (state, action) => {
    console.info('setSaveInvoiceDialogStatus in Reducer');
    return {
      ...state,
      saveInvoiceDialogStatus: action.status
    };
  }),

  on(editFinInvoicePageActionTypes.setSelectedInvoice, (state, action) => {
    console.info('setSelectedInvoice in Reducer');
    return {
      ...state,
      selectedInvoice: action.invoice,
      saveInvoiceDialogStatus: true
    };
  }),

  on(editFinInvoicePageActionTypes.setSelectedUploadInvoice, (state, action) => {
    console.info('setSelectedUploadInvoice in Reducer');
    return {
      ...state,
      selectedUploadInvoice: action.invoice
    };
  }),

  on(editFinInvoicePageActionTypes.updateInvoiceDocCount, (state, action) => {
    console.info('updateInvoiceDocCount in Reducer');
    return {
      ...state,
      invoiceList: adapterInvoice.upsertOne(action.invoice, state.invoiceList)
    };
  }),

  on(editFinInvoicePageActionTypes.loadProjectPhaseList, (state, action) => {
    console.info('loadProjectPhaseList in Reducer');
    return {
      ...state,
      phases: action.phases
    };
  }),

  on(editFinInvoicePageActionTypes.loadBudgetCategoriesList, (state, action) => {
    console.info('loadBudgetCategoriesList in Reducer');
    return {
      ...state,
      budgetCategories: action.budgetCategories
    };
  }),


  on(editFinInvoicePageActionTypes.loadEncumbranceList, (state, action) => {
    console.info('loadEncumbranceList in Reducer');
    return {
      ...state,
      encumbranceSummary: action.encumbranceSummary
    };
  }),

  on(editFinInvoicePageActionTypes.loadProjectBalance, (state, action) => {
    console.info('loadProjectBalance in Reducer');
    return {
      ...state,
      projectBalance: action.projectBalance
    };
  })

);


