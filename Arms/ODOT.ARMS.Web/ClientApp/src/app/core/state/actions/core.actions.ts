import { createAction, props } from '@ngrx/store';

export const navigateToNotFound = createAction(
  '[Core] Navigate to Not Found'
);

export const coreActionTypes = {
  navigateToNotFound,
};
