import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromProjectBudgetCategory from '../reducers/edit-project-budgetCategory-page.reducer';


export interface State { projectBudgetCategories: fromProjectBudgetCategory.State; }
export const reducers: ActionReducerMap<State> = { projectBudgetCategories: fromProjectBudgetCategory.projectBudgetCategoryReducer };


/* creating a feature selector */
export const selectProjectBudgetCategoryState = createFeatureSelector<fromProjectBudgetCategory.State>('projectBudgetCategories');

/* creating default supported ngrx/entity selectors */

// /** select IDs */
// export const selectIds = createSelector(
//     selectProjectBudgetCategoryState,
//     fromProjectBudgetCategory.selectIds
// );

// /** selectAll */
// export const selectAllProjectBudgetCategories = createSelector(
//     selectProjectBudgetCategoryState,
//     fromProjectBudgetCategory.selectAll
// );


export const getBudgetCategories= createSelector(
    selectProjectBudgetCategoryState,
    fromProjectBudgetCategory.getBudgetCategories
);

// export const getProjectBudgetCategoryById = (projectId: string) => createSelector(
//     selectProjectBudgetCategoryState,
//     (projectBudgetCategoryId) => projectBudgetCategoryId.entities[projectId]
// );

export const getSelectedBudgetCategory = createSelector(
    selectProjectBudgetCategoryState,
    fromProjectBudgetCategory.getSelectedBudgetCategory
);

export const getOtherCategoryBudgetDialogStatus = createSelector(
    selectProjectBudgetCategoryState,
    fromProjectBudgetCategory.getAddOtherCategoryBudgetDialogStatus
);

export const getSalaryWagesBudgetDialogStatus = createSelector(
    selectProjectBudgetCategoryState,
    fromProjectBudgetCategory.getAddSalaryWagesBudgetDialogStatus
);

export const getSubContractorBudgetDialogStatus = createSelector(
    selectProjectBudgetCategoryState,
    fromProjectBudgetCategory.getAddSubContractorBudgetDialogStatus
);

export const budgetCategoryExists = (budgetCatId: number) => createSelector(
    selectProjectBudgetCategoryState,
    (budgetCategoryById) => budgetCategoryById.entities[budgetCatId]
);


export const {
    selectAll: getBudgetCategoriesByProject,
    selectTotal: getTotalBudgetCategoriesList,
    selectIds: getBudgetCategoryIds
  } = fromProjectBudgetCategory.adapterBudgetCategory.getSelectors(getBudgetCategories);


