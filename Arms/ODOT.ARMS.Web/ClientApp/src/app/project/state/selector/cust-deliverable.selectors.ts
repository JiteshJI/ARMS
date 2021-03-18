
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustDeliverable from '../reducers/cust-deliverable.reducer';


export interface State  {custDeliverable: fromCustDeliverable.CustDeliverableState; }

/* helps us get the feature/specific slice of the State based on the specified name */

export const getCustDeliverableFeatureState = createFeatureSelector<fromCustDeliverable.CustDeliverableState>('custDeliverable');

/* createSelector- helps us get any part/property  of the slice using the feature slice and specifying the property */

export const getAllDeliverables = createSelector(
  getCustDeliverableFeatureState,
  fromCustDeliverable.selectAll
);

export const getCustDeliverableLoaded = (state: fromCustDeliverable.CustDeliverableState) => state.DeliverableStateloaded;
export const getDialogStatus = (state: fromCustDeliverable.CustDeliverableState) => state.DeliverableDialogStatus;
export const getEditedDeliverable = (state: fromCustDeliverable.CustDeliverableState) => state.EditedDeliverable;


export const getLoaded = createSelector(
  getCustDeliverableFeatureState,
  getCustDeliverableLoaded
);

export const selectDialogStatus = createSelector(
  getCustDeliverableFeatureState,
  getDialogStatus
);

export const selectEditedDeliverable = createSelector(
  getCustDeliverableFeatureState,
  getEditedDeliverable
);



