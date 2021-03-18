import { createAction, props } from '@ngrx/store';
import { Budget, BudgetCategory } from '../../models/budget';


export const loadProjectBudgetCategories = createAction(
    '[ProjectBudgetCategories] Load Project Budget Categories',
    props<{ projectId: string }>()
);

export const loadProjectBudgetCategoriesSuccess = createAction(
    '[ProjectBudgetCategories] Load Project Budget Categories Success',
    props<{ budgetCategories: BudgetCategory[] }>()
);

export const loadProjectBudgetCategoriesFailure = createAction(
    '[ProjectBudgetCategories] Load Project Budget Categories Failure',
    props<{ error: string }>()
);

export const setSelectedBudgetCategory = createAction(
    '[ProjectBudgetCategories] Set Selected Budget Category',
    props<{ selectedBudgetCategory: BudgetCategory }>()
);

export const setAddOtherCategoryBudgetDialogStatus = createAction(
    '[ProjectBudgetCategories] Set Add OtherCategory Dialog Status',
    props<{ status: boolean }>()
);

export const setAddSalaryWagesBudgetDialogStatus = createAction(
    '[ProjectBudgetCategories] Set Add SalaryWages Dialog Status',
    props<{ status: boolean }>()
);

export const setAddSubContractorBudgetDialogStatus = createAction(
    '[ProjectBudgetCategories] Set Add SubContractor Dialog Status',
    props<{ status: boolean }>()
);

export const addBudgetCategory = createAction(
    '[ProjectBudgetCategories] Add Budget Category',
    props<{ budgetCategory: BudgetCategory }>()
);

export const updateBudgetCategory = createAction(
    '[ProjectBudgetCategories] Update Budget Category',
    props<{ budgetCategory: BudgetCategory }>()
);

export const editProjectBudgetActionTypes = {
    loadProjectBudgetCategories,
    loadProjectBudgetCategoriesSuccess,
    loadProjectBudgetCategoriesFailure,
    setSelectedBudgetCategory,
    setAddOtherCategoryBudgetDialogStatus,
    setAddSalaryWagesBudgetDialogStatus,
    setAddSubContractorBudgetDialogStatus,
    addBudgetCategory,
    updateBudgetCategory
}