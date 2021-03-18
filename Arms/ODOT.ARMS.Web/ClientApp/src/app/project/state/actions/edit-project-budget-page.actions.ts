import { createAction, props } from "@ngrx/store";
import { Budget, BudgetCategory } from "../../models/budget";


export const loadBudgetByProjectId = createAction(
    '[ProjectBudget] Load Budgets by BC Project Id',
    props<{ projId: string }>()
);

export const loadBudgetsByProjectIdSuccess = createAction(
    '[ProjectBudget] Load Budgets by BC Alt Id Success',
    props<{ budget: Budget[] }>()
);

export const loadBudgetsByProjectIdFail = createAction(
    '[ProjectBudget] Load Budgets by BC Alt Id Failure',
    props<{ error: string }>()
);

export const addBudget = createAction(
    '[ProjectBudget] Add Budget',
    props<{ budget: Budget, budgetCategory: BudgetCategory }>()
);

export const addBudgetSuccess = createAction(
    '[ProjectBudget] Add Budget Success',
    props<{ budget: Budget }>()
);

export const addBudgetFailure = createAction(
    '[ProjectBudget] Add Budget Failure',
    props<{ error: string }>()
);

export const updateBudget = createAction(
    '[ProjectBudget] Update Budget',
    props<{ budget: Budget }>()
);

export const updateBudgetSuccess = createAction(
    '[ProjectBudget] Update Budget Success',
    props<{ budget: Budget }>()
);

export const updateBudgetFailure = createAction(
    '[ProjectBudget] Update Budget Failure',
    props<{ error: string }>()
);

export const setSelectedBudget = createAction(
    '[ProjectBudget] Set Selected Budget',
    props<{ selectedBudget: Budget }>()
);

export const viewOtherCategoryGridStatus = createAction(
    '[ProjectBudget] Display OtherCategory Grid',
    props<{ status: boolean }>()
);

export const viewSalaryWagesGridStatus = createAction(
    '[ProjectBudget] Display SalaryWages Grid',
    props<{ status: boolean }>()
);

export const viewSubContractorGridStatus = createAction(
    '[ProjectBudget] Display SubContractor Grid',
    props<{ status: boolean }>()
);

export const hideGrids = createAction(
    '[ProjectBudget] Hide All Budget Grids',
);



export const projectBudgetActions = {
    addBudget,
    addBudgetSuccess,
    addBudgetFailure,
    loadBudgetByProjectId,
    loadBudgetsByProjectIdSuccess,
    loadBudgetsByProjectIdFail,
    updateBudget,
    updateBudgetSuccess,
    updateBudgetFailure,
    setSelectedBudget,
    viewOtherCategoryGridStatus,
    viewSalaryWagesGridStatus,
    viewSubContractorGridStatus,
    hideGrids
}
