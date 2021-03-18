
import { ContactItemRaw } from '../../models/contacts.items';
import * as fromRoot from '../../../state/reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { contactActionTypes, contactActions, UpdateContactAgency } from '../actions/contacts.actions';
import { ContactAgencyRaw } from '../../models/contacts.agency';

/* Purpose of the reducer is to make state changes in a predicatble fashion.
   Reducer updates the State based on the actions dispatched by a component */

/* extend the global state to include the Contact State -if the module is lazy loaded always extend the global state  */
export interface State extends fromRoot.State {
  contacts: ContactState;
}
/*  Creating an interface to define a State. A state is basically an equivalent of an in memory database that
    contains the properties and an array of objects of a certain type.
     The object is mainly defined in the models folders and is a representation of the database table */

export interface ContactState {
  currentContactID: string;
  contacts: ContactItemRaw[];
  contactAgencies: ContactAgencyRaw[];
  currentContactAgencyId: number;
  error: string;
  contactsloaded: boolean;
}

/*Creating an initial state */
const initialState: ContactState = {
  currentContactID: '',
  contacts: [],
  contactAgencies: [],
  currentContactAgencyId: null,
  error: '',
  contactsloaded: false
};

/* Selectors are like a reusable query of our store.
Components use selectors to select properties from store instead of directly accessing the store
1. Selectors are memoized(cached) so they wont be reevaluated each time
*/

/* helps us get the feature/specific slice of the State based on the specified name */
export const getContactsFeatureState = createFeatureSelector<ContactState>('contacts');

/* createSelector- helps us get any part/property  of the slice using the feature slice and specifying the property */
export const getContacts = createSelector(
  getContactsFeatureState,
  state => state.contacts
);

export const getCurrentContactID = createSelector(
  getContactsFeatureState,
  state => state.currentContactID
);

export const getContactsloaded = createSelector(
  getContactsFeatureState,
  state => state.contactsloaded
);

export const getcurrentContact = createSelector(
  getContactsFeatureState,
  getCurrentContactID,
  (state, CurrentContactID) => {
    if (CurrentContactID === '') {
      return CurrentContactID ? state.contacts.find(c => c.contactID === CurrentContactID) : null;
    }
  }
);

/* helps us get the feature/specific slice of the State based on the specified name */
const getContactAgencyFeatureState = createFeatureSelector<ContactState>('contactAgencies');

/* createSelector- helps us get any part/property  of the slice using the feature slice and specifying the property */
export const getContactAgencies = createSelector(
  getContactAgencyFeatureState,
  state => state.contactAgencies
);



/*  Refactor for future - you can also combine mutiple selectors to simplify complexity */

/* You can additionally combine selectors by using  something like

 export const getContacts = createSelector(
    getContactsFeatureState,
    state => state.contacts
);

export const getCurrentProductId = createSelector(
    getContactsFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct=createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state,currentProductId) =>
    state.products.find(p =>p.id === currentProductId)
); */


/* syntax: export function reducer(state,action).The reducer evaluates the action type and processes the appropriate action accordingly */
// tslint:disable-next-line: max-line-length
export function contactsreducer(state = initialState, action: contactActions): ContactState { /* contactActions is the type specified in the action.ts file */
  switch (action.type) {

    case contactActionTypes.SaveCurrentContact:
      console.log('existing state: ' + JSON.stringify(state));
      console.log('payload' + action.payload);
      return {
        ...state,
        currentContactID: action.payload.contactID
      };

    case contactActionTypes.UpdateContactSuccess:
      console.log('existing state: ' + JSON.stringify(state));
      console.log('payload' + action.payload);


      /* Build a new contacts array to include the updated contact */

      // const updatedContactsArray: ContactItemRaw[] = state.contacts;

      const updatedContactsArray = Object.assign([], state.contacts);

      /* find the index of the updated contact in the new contacts array */
      const foundIndex = updatedContactsArray.findIndex(contact => contact.contactID === action.payload.contactID);

      /* Replace the updated contact in the new contacts array using the index */
      updatedContactsArray[foundIndex] = action.payload;



      console.log(' Update contact array: ' + JSON.stringify(updatedContactsArray));
      /*---------------------------------------*/
      return {
        ...state,
        contacts: updatedContactsArray,  /* replacing the contacts array in state with the new  updatedContacts Array */
        currentContactID: action.payload.contactID,
        error: ''
      };


    case contactActionTypes.UpdateContactFail:
      console.log('existing state: ' + JSON.stringify(state));
      console.log('payload' + action.payload);
      return {
        ...state,
        error: action.payload
      };

    case contactActionTypes.InitializeCurrentContact:
      console.log('existing state: ' + JSON.stringify(state));
      return {
        ...state,
        currentContactID: null
      };
    case contactActionTypes.LoadContactsSuccess:
      console.log('load contacts success');
      console.log(action.payload);
      return {
        ...state,
        contacts: action.payload,
        contactsloaded: true
      };

    case contactActionTypes.LoadContactsFail:
      console.log('existing state: ' + JSON.stringify(state));
      console.log('payload' + action.payload);
      return {
        ...state,
        error: action.payload,
        contactsloaded: false
      };
    /* adding the new contact to the existing state */
    case contactActionTypes.CreateNewContactSuccess:
      console.log('existing state: ' + JSON.stringify(state));
      console.log('payload' + action.payload);
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    /* adding the error from the create new contact to the state to display */
    case contactActionTypes.CreateNewContactFail:
      console.log('existing state: ' + JSON.stringify(state));
      console.log('payload' + action.payload);
      return {
        ...state,
        error: action.payload
      };
    case contactActionTypes.SaveCurrentContactAgency:
      console.log('existing state: ' + JSON.stringify(state));
      console.log('payload' + action.payload);
      return {
        ...state,
        currentContactAgencyId: action.payload.contactAgencyId
      };

    case contactActionTypes.AddNewContactAgencySuccess:
      console.log('existing state:' + JSON.stringify(state));
      console.log('payload' + action.payload);
      return {
        ...state,
        contactAgencies: [...state.contactAgencies, action.payload]
      };
    case contactActionTypes.AddNewContactAgencyFail:
      console.log('Adding new Contact Agency Failed');
      console.log('existing state:' + JSON.stringify(state));
      console.log('payload' + action.payload);
      return {
        ...state,
        error: action.payload
      };

    case contactActionTypes.UpdateContactAgencySuccess:
      // console.log('existing state: ' + JSON.stringify(state));
      // console.log('payload' + action.payload);


      /* Build a new contactagencies array to include the updated contactagency */

      // const updatedContactAgencyArray: ContactAgencyRaw[] = state.contactAgencies;
      const updatedContactAgencyArray = Object.assign([], state.contactAgencies);
      /* find the index of the updated contactagency in the new contactagencies array */

      const foundAgencyIndex = updatedContactAgencyArray.findIndex(contact => contact.contactAgencyId === action.payload.contactAgencyId);

      /* Replace the updated contactagency in the new contactagencies array using the index */
      updatedContactAgencyArray[foundAgencyIndex] = action.payload;
      console.log(' Update contact array: ' + JSON.stringify(updatedContactAgencyArray));
      /*---------------------------------------*/
      return {
        ...state,
        // tslint:disable-next-line: max-line-length
        contactAgencies: updatedContactAgencyArray,  /* replacing the contactAgencies array in state with the new  updatedContactAgency Array */
        currentContactID: action.payload.ContactId,
        error: ''
      };


    case contactActionTypes.UpdateContactAgencyFail:
      console.log('payload' + action.payload);
      return {
        ...state,
        error: action.payload
      };

    case contactActionTypes.LoadContactAgencySuccess:
      console.log('payload' + action.payload);
      return {
        ...state,
        contactAgencies: action.payload
      };

    case contactActionTypes.LoadContactAgencyFail:
      console.log('payload' + action.payload);
      return {
        ...state,
        error: action.payload
      };

     /* resetting the contacts loaded state to false */
    case contactActionTypes.SetContactsLoadedStateFalse:
      console.log('payload' + action.payload);
      console.log('setting contactloaded state to false');
      return {
        ...state,
        contactsloaded: action.payload
      };


    default:
      return state;
  }
}
