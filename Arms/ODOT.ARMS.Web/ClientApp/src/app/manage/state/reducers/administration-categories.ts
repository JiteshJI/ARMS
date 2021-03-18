import { createSelector, on, createReducer, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AdministrationCategory } from '../../models/administration-categories';
import {AdministrationCategoryTypes } from '../actions/administration-categories';

export interface State extends EntityState<AdministrationCategory> {
  isLoading: false;
  error: null;
}

export const adapter: EntityAdapter<AdministrationCategory> = createEntityAdapter<AdministrationCategory>({
  selectId: (administrationCategory: AdministrationCategory) => administrationCategory.administrationCategoryID,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  isLoading: false,
  error: null
});

export const courseReducer = createReducer(
  initialState,
  on(AdministrationCategoryTypes.administrationCategoryLoaded, (state, action) => {
    return adapter.setAll(
    //return adapter.addAll(
      action.addadministrationCategoryList,
      { ...state, coursesLoaded: true }
    );
  }),
  on(AdministrationCategoryTypes.addAdministrationCategoryAction, (state, action) => {
    return adapter.addOne(action.addadministrationCategory, state);
  }),

  on(AdministrationCategoryTypes.deleteAgencyCompleteAction, (state, action) => {
    return adapter.removeOne(action.deleteAdministrationCategory, state);
  }),
  on(AdministrationCategoryTypes.editAdministrationCategoryAction, (state, action) => {
    return adapter.updateOne(action.updateAdministrationCategory, state);
  })
);
export const { selectAll, selectIds } = adapter.getSelectors();

export const courseFeatureSelector = createFeatureSelector<State>('administrationCategory');

export const getAllAdministrationCategory = createSelector(
  courseFeatureSelector,
  selectAll
);
