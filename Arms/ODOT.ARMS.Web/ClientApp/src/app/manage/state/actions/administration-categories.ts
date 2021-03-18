import { AdministrationCategory } from '../../models/administration-categories';
import { Update } from '@ngrx/entity';
import { props, createAction } from '@ngrx/store';

export const loadadministrationCategories = createAction(
  '[AdministrationCategory List] Load AdministrationCategory via Service',
);

export const administrationCategoryLoaded = createAction(
  '[AdministrationCategory Effect] AdministrationCategory Loaded Successfully',
  props<{ addadministrationCategoryList: AdministrationCategory[] }>()
);

export const addAdministrationCategoryAction = createAction(
  '[Create AdministrationCategory Component] Create AdministrationCategory',
  props<{ addadministrationCategory: AdministrationCategory }>()
);

export const deleteAgencyCompleteAction = createAction(
  '[AdministrationCategory List Operations] Delete AdministrationCategory',
  props<{ deleteAdministrationCategory: string }>()
);

export const editAdministrationCategoryAction = createAction(
  '[AdministrationCategory List Operations] Update AdministrationCategory',
  props<{ updateAdministrationCategory: Update<AdministrationCategory> }>()
);

export const AdministrationCategoryTypes = {
  loadadministrationCategories,
  administrationCategoryLoaded,
  addAdministrationCategoryAction,
  deleteAgencyCompleteAction,
  editAdministrationCategoryAction
};

