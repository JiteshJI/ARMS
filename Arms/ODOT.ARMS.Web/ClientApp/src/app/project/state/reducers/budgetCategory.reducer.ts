import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IBudgetCategory, BudgetCategory } from "../../models/budget";
import { createReducer, on, createFeatureSelector, createSelector } from "@ngrx/store";
import * as budgetActionTypes from '../actions/budget.actions';


export interface BudgetCategoryState extends EntityState<BudgetCategory> {
  isLoading: false;
  error: null;
  BudgetCategories: null;
}

export const adapterBudgetCategory: EntityAdapter<BudgetCategory> = createEntityAdapter<BudgetCategory>({
  selectId: (budget: BudgetCategory) => budget.budgetCatId,
  sortComparer: false,
});

export const initialState: BudgetCategoryState = adapterBudgetCategory.getInitialState({
  isLoading: false,
  error: null,
  BudgetCategories: null
});

export const budgetCategoryReducer = createReducer(
  initialState,

  on(budgetActionTypes.budgetCategoriesLoaded, (state, action) => {
    //return adapterBudgetCategory.addAll(
    return adapterBudgetCategory.setAll(
      action.BudgetCategories,
      { ...state, isLoading: false }
    );
  })
);
export const { selectAll, selectIds } = adapterBudgetCategory.getSelectors();

export const courseFeatureSelector = createFeatureSelector<BudgetCategoryState>('budgetCategory');

export const getAllBudgetCatgeories = createSelector(
  courseFeatureSelector,
  selectAll
);
