import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { Budget, BudgetCategory } from '../../models/budget';
import * as editProjectBudgetCategoryActionTypes from '../actions/edit-project-budgetCategory-page.actions';



export const editPrjBudgetCategoriesPageFeatureKey = 'editPrjBudgetCategoriesPage';

export interface State extends EntityState<BudgetCategory> {
    budgetCategories: BudgetCategory[],
    budgetCategoryList: BudgetCategoryListState,
    selectedBudgetCategory: BudgetCategory,
    error: string,
    addOtherCategoryBudgetDialogStatus: boolean,
    addSalaryWagesBudgetDialogStatus: boolean,
    addSubContractorBudgetDialogStatus: boolean,
}

export interface BudgetCategoryListState extends EntityState<BudgetCategory> { }

export const adapterBudgetCategory: EntityAdapter<BudgetCategory> = createEntityAdapter<BudgetCategory>({
    selectId: (budgetCategory: BudgetCategory) => budgetCategory.budgetCatId,
    sortComparer: false
});

export const budgetCategoryInitialListState: BudgetCategoryListState = adapterBudgetCategory.getInitialState({});

export const initialState: State = adapterBudgetCategory.getInitialState({
    budgetCategories: null,
    budgetCategoryList: budgetCategoryInitialListState,
    selectedBudgetCategory: null,
    error: null,
    addOtherCategoryBudgetDialogStatus: false,
    addSalaryWagesBudgetDialogStatus: false,
    addSubContractorBudgetDialogStatus: false
});

export const projectBudgetCategoryReducer = createReducer(
    initialState,

    on(editProjectBudgetCategoryActionTypes.loadProjectBudgetCategoriesSuccess, (state,action) => {
        console.log('reducer bc', action.budgetCategories);
        return {
            ...state,
            budgetCategoryList: adapterBudgetCategory.setAll(action.budgetCategories, state.budgetCategoryList),            
        }
    }),

    on(editProjectBudgetCategoryActionTypes.loadProjectBudgetCategoriesFailure, (state, action) => {
        console.log('reducer error bc');
        return { ...state, error: action.error };
    }),

    on(editProjectBudgetCategoryActionTypes.addBudgetCategory, (state, action) => {
        return {
            ...state,
            budgetCategoryList: adapterBudgetCategory.addOne(action.budgetCategory, state.budgetCategoryList)
        };
    }),

    on(editProjectBudgetCategoryActionTypes.updateBudgetCategory, (state, action) => {
        return {
            ...state,
            budgetCategoryList: adapterBudgetCategory.upsertOne(action.budgetCategory, state.budgetCategoryList)
        };
    }),

    on(editProjectBudgetCategoryActionTypes.setSelectedBudgetCategory, (state, action) => {
        return {
            ...state,
            selectedBudgetCategory: action.selectedBudgetCategory
        };
    }),

    on(editProjectBudgetCategoryActionTypes.setAddOtherCategoryBudgetDialogStatus, (state, action) => {
        return { ...state, addOtherCategoryBudgetDialogStatus: action.status };
    }),

    on(editProjectBudgetCategoryActionTypes.setAddSalaryWagesBudgetDialogStatus, (state, action) => {
        return { ...state, addSalaryWagesBudgetDialogStatus: action.status };
    }),

    on(editProjectBudgetCategoryActionTypes.setAddSubContractorBudgetDialogStatus, (state, action) => {
        return { ...state, addSubContractorBudgetDialogStatus: action.status };
    })

);

export const { selectAll, selectIds, selectEntities } = adapterBudgetCategory.getSelectors();

export const courseFeatureSelector = createFeatureSelector<State>('projectBudgetCategory');

export const getAllBudgetCategories = createSelector(
  courseFeatureSelector,
  selectAll
);

export const getBudgetCategories = (state: State) => state.budgetCategoryList;
export const getSelectedBudgetCategory = (state: State) => state.selectedBudgetCategory;
export const getAddOtherCategoryBudgetDialogStatus = (state: State) => state.addOtherCategoryBudgetDialogStatus;
export const getAddSalaryWagesBudgetDialogStatus = (state: State) => state.addSalaryWagesBudgetDialogStatus;
export const getAddSubContractorBudgetDialogStatus = (state: State) => state.addSubContractorBudgetDialogStatus;
