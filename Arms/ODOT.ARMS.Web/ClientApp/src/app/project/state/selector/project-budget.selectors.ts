import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromProjectBudget from '../reducers/edit-project-budget-page.reducer';


export interface State { projectBudget: fromProjectBudget.State; }
export const reducers: ActionReducerMap<State> = { projectBudget: fromProjectBudget.projectBudgetReducer };


/* creating a feature selector */
export const selectProjectBudgetState = createFeatureSelector<fromProjectBudget.State>('projectBudget');


export const getBudgets = createSelector(
    selectProjectBudgetState,
    fromProjectBudget.getBudgets
);

export const getSelectedBudget = createSelector(
    selectProjectBudgetState,
    fromProjectBudget.getSelectedBudget
);

export const getEditBudgetDialogStatus = createSelector(
    selectProjectBudgetState,
    fromProjectBudget.getEditBudgetDialogStatus
);

export const getOtherCategoryGridStatus = createSelector(
    selectProjectBudgetState,
    fromProjectBudget.getOtherCategoryGridStatus
);

export const getSalaryWagesGridStatus = createSelector(
    selectProjectBudgetState,
    fromProjectBudget.getSalaryWagesGridStatus
);

export const getSubContractorGridStatus = createSelector(
    selectProjectBudgetState,
    fromProjectBudget.getSubContractorGridStatus
);


export const {
    selectAll: getBudgetByProjectId,
    selectTotal: getTotalBudgetList,
  } = fromProjectBudget.adapterBudget.getSelectors(getBudgets);


