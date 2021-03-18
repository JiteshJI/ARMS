import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IBudget, Budget } from "../../models/budget";
import { createReducer, on, createFeatureSelector, createSelector } from "@ngrx/store";
import * as budgetActionTypes from '../actions/budget.actions';


export interface BudgetState extends EntityState<Budget> {
  isLoading: false;
  error: null;
  addedBudget: Budget;
  editedBudget: Budget;
}

export const adapterBudget: EntityAdapter<Budget> = createEntityAdapter<Budget>({
  selectId: (budget: Budget) => budget.budgetId,
  sortComparer: false,
});

export const initialState: BudgetState = adapterBudget.getInitialState({
  isLoading: false,
  error: null,
  addedBudget: null,
  editedBudget: null
});

export const budgetReducer = createReducer(
  initialState,

  on(budgetActionTypes.budgetAdded, (state, action) => {
    return adapterBudget.addOne(action.budget, { ...state, addedBudget: action.budget, editedBudget: null });
  }),
  on(budgetActionTypes.addBudget, (state, action) => {
    return { ...state, addedBudget: null, editedBudget: null }
  }),
  on(budgetActionTypes.budgetsLoaded, (state, action) => {
    //return adapterBudget.addAll(
    return adapterBudget.setAll(
      action.budgets,
      { ...state, isLoading: false }
    );
  }),
  on(budgetActionTypes.budgetUpdated, (state, action) => {
    console.log('in reducer', action.updatedBudget);
    return adapterBudget.updateOne({ id: action.updatedBudget.budgetId, changes: action.updatedBudget }, { ...state, editedBudget: action.updatedBudget, addedBudget: null });
  }),

);
export const { selectAll, selectIds } = adapterBudget.getSelectors();

export const courseFeatureSelector = createFeatureSelector<BudgetState>('budgets');

export const getAllBudgets = createSelector(
  courseFeatureSelector,
  selectAll
);
