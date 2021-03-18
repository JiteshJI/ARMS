import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { Budget } from "../../models/budget";
import * as projectBudgetActions from '../actions/edit-project-budget-page.actions';

export const editPrjBudgetPageFeatureKey = 'editPrjBudgetPage';

export interface State extends EntityState<Budget> {
    budgetList: BudgetListState,
    selectedBudget: Budget,
    editBudgetDialogStatus: boolean
    error: string,
    viewOtherCategoryGrid: boolean,
    viewSalaryWagesGrid: boolean,
    viewSubContractorGrid: boolean
}

export interface BudgetListState extends EntityState<Budget> { }

export const adapterBudget: EntityAdapter<Budget> = createEntityAdapter<Budget>({
    selectId: (budget: Budget) => budget.budgetId,
    sortComparer: false
});

export const budgetInitialListState: BudgetListState = adapterBudget.getInitialState({});

export const initialState: State = adapterBudget.getInitialState({
    budgetList: budgetInitialListState,
    selectedBudget: null,
    editBudgetDialogStatus: false,
    error: null,
    viewOtherCategoryGrid: false,
    viewSalaryWagesGrid: false,
    viewSubContractorGrid: false
});

export const projectBudgetReducer = createReducer(
    initialState,

    on(projectBudgetActions.loadBudgetsByProjectIdSuccess, (state, action) => {
        return {
          ...state,
          budgetList: adapterBudget.setAll(action.budget, state.budgetList)
          //budgetList: adapterBudget.addAll(action.budget, state.budgetList)
        }
    }),

    on(projectBudgetActions.loadBudgetsByProjectIdFail, (state, action) => {
        return { ...state, error: action.error };
    }),


    on(projectBudgetActions.addBudgetSuccess, (state, action) => {
        return {
            ...state,
            budgetList: adapterBudget.addOne(action.budget, state.budgetList)
        }
    }),

    on(projectBudgetActions.addBudgetFailure, (state, action) => {
        return {...state, error: action.error }
    }),

    on(projectBudgetActions.updateBudgetSuccess, (state, action) => {
        return {
            ...state,
            budgetList: adapterBudget.upsertOne(action.budget, state.budgetList)
        }
    }),

    on(projectBudgetActions.updateBudgetFailure, (state, action) => {
        return {...state, error: action.error }
    }),

    on(projectBudgetActions.setSelectedBudget, (state, action) => {
        return {
            ...state,
            selectedBudget: action.selectedBudget
        }
    }),

    on(projectBudgetActions.viewOtherCategoryGridStatus, (state, action) => {
        console.info('other ctageory reducer');
        return {
            ...state,
            viewOtherCategoryGrid: action.status,
            viewSalaryWagesGrid: false,
            viewSubContractorGrid: false
        }
    }),

    on(projectBudgetActions.viewSalaryWagesGridStatus, (state, action) => {
        return {
            ...state,
            viewSalaryWagesGrid: action.status,
            viewOtherCategoryGrid: false,
            viewSubContractorGrid: false
        }
    }),

    on(projectBudgetActions.viewSubContractorGridStatus, (state, action) => {
        return {
            ...state,
            viewSubContractorGrid: action.status,
            viewOtherCategoryGrid: false,
            viewSalaryWagesGrid: false
        }
    }),

    on(projectBudgetActions.hideGrids, (state, action) => {
        return { 
            ...state,
            viewSubContractorGrid: false,
            viewOtherCategoryGrid: false,
            viewSalaryWagesGrid: false
         }
    })




);

export const { selectAll, selectIds } = adapterBudget.getSelectors();

export const courseFeatureSelector = createFeatureSelector<State>('projectBudget');

export const getAllBudgets = createSelector(
  courseFeatureSelector,
  selectAll
);

export const getBudgets = (state: State) => state.budgetList;
export const getSelectedBudget = (state: State) => state.selectedBudget;
export const getEditBudgetDialogStatus = (state: State) => state.editBudgetDialogStatus;
export const getOtherCategoryGridStatus = (state: State) => state.viewOtherCategoryGrid;
export const getSalaryWagesGridStatus = (state: State) => state.viewSalaryWagesGrid;
export const getSubContractorGridStatus = (state: State) => state.viewSubContractorGrid;









