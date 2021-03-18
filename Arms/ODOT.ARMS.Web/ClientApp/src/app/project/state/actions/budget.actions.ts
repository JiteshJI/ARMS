import { createAction, props } from "@ngrx/store";
import { Budget, BudgetCategory } from "../../models/budget";
import { Update } from "@ngrx/entity";

export const addBudget = createAction(
  '[Add Budget Component] Add Budget',
  props<{ budget: Budget }>()
);

export const budgetAdded = createAction(
  '[Budget Component] Budget Added',
  props<{ budget: Budget }>()
);

export const budgetCategoriesLoaded = createAction(
  '[Budget Category List] Budget Categories loaded',
  props<{ BudgetCategories: BudgetCategory[] }>()
);

export const loadBudgetCategories = createAction(
  '[Budget Category List] Load BudgetCategories via Service',
);

export const loadBudgets = createAction(
  '[Budget Category List] Load Budgets via Service',
);

export const budgetsLoaded = createAction(
  '[Budget List] Budgets loaded',
  props<{ budgets: Budget[] }>()
);

export const getBudgetByProjectId = createAction(
  '[Budget List By Category] Get Budgets by projectId',
  props<{ projectId: string }>()
);

export const budgetByProjectIdLoaded = createAction(
  '[Budget List By Category] Get Budgets by Category Loaded',
  props<{ Budgets: Budget[] }>()
);

export const updateBudget = createAction(
  '[Budget Update] Update Budget',
  props<{ updateBudget: Update<Budget> }>()
);

export const budgetUpdated = createAction(
  '[Budget Update] Updated Budget',
  props<{ updatedBudget: Budget }>()
);

export const budgetActionTypes = {
  addBudget,
  budgetAdded,
  loadBudgetCategories,
  budgetCategoriesLoaded,
  getBudgetByProjectId,
  budgetByProjectIdLoaded,
  loadBudgets,
  budgetsLoaded,
  updateBudget,
  budgetUpdated
}
