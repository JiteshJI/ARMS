/* ********************************************************************************************************** */
/* EntityState Interface

interface EntityState<V> {
 ids: string[] | number[];
 entities: { [id: string | id: number]: V };
}

ids: An array of all the primary ids in the collection
entities: A dictionary of entities in the collection indexed by the primary id *

Extend this interface to provide any additional properties for the entity state. */
/* ********************************************************************************************************** */

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Deliverable } from '../../models/custom-deliverable';
import { custDeliverableActions } from '../actions/cust-deliverable.actions';


export interface CustDeliverableState extends EntityState<Deliverable> {
  DeliverableStateloaded: boolean;
  DeliverableDialogStatus: boolean;
  EditedDeliverable: Deliverable;
  error: string;
}

export const adapterDeliverable: EntityAdapter<Deliverable> = createEntityAdapter<Deliverable>({
  /** overriding the default id in ngrx/entity by specifying actual id  */
  selectId: (deliverable: Deliverable) => deliverable.deliverableId,
  sortComparer: false
});

export const initialState: CustDeliverableState = adapterDeliverable.getInitialState({
  error: '',
  DeliverableStateloaded: false,
  DeliverableDialogStatus: false,
  EditedDeliverable: null
});

export const custDeliverableReducer = createReducer(
  initialState,

  on(custDeliverableActions.loadSelectedPrjDeliverableSuccess, (state, action) => {
    return adapterDeliverable.setAll(action.deliverable, { ...state, DeliverableStateloaded: true });
  }),

  on(custDeliverableActions.editPrjCustDeliverableSuccess, (state, action) => {
    return adapterDeliverable.upsertOne(action.deliverable, state);
  }),

  on(custDeliverableActions.AddPrjCustDeliverableSuccess, (state, action) => {
    return adapterDeliverable.addOne(action.deliverable, state);
  }),

  on(custDeliverableActions.removePrjCustDeliverableSuccess, (state, action) => {
    return adapterDeliverable.removeOne(action.deliverableId, state);
  }),


  /** set additional state properties using the normal way without using the entity adapter methods for errors **/
  on(custDeliverableActions.loadSelectedPrjDeliverableFailure, (state, action) => {
    return { ...state, error: action.error };
  }),

  on(custDeliverableActions.AddPrjCustDeliverableFailure, (state, action) => {
    return { ...state, error: action.error };
  }),

  on(custDeliverableActions.editPrjCustDeliverableFailure, (state, action) => {
    return { ...state, error: action.error };
  }),

  on(custDeliverableActions.setPrjCustDeliverableLoadedSuccess, (state, action) => {
    return { ...state, DeliverableStateloaded: action.loaded };
  }),

  on(custDeliverableActions.setPrjCustDeliverableDialogSuccess, (state, action) => {
    return { ...state, DeliverableDialogStatus: action.dialogStatus };
  }),

  on(custDeliverableActions.setEditedPrjCustDeliverable, (state, action) => {
    return { ...state, EditedDeliverable: action.deliverable };
  }),

  on(custDeliverableActions.savePrjDeliverableFailure, (state, action) => {
    return { ...state, error: action.error }
  })

);
export function reducer(state: CustDeliverableState | undefined, action: Action) {
  return custDeliverableReducer(state, action);
}

/***************Selectors -used for getting a slice of the state *******************/

// get the ngrx entity specific selectors
export const { selectAll } = adapterDeliverable.getSelectors();
