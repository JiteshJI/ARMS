import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {ContactsDataService} from '../../services/contactInfo.data.service';
import * as fromContactActions from '../actions/contacts.actions';
import { mergeMap, map, tap, switchMap, catchError, concatMap } from 'rxjs/operators';
import { ContactItemRaw } from '../../models/contacts.items';
import { of, from } from 'rxjs';
import { ActionSequence } from 'protractor';
import { contactActionTypes, UpdateContact, UpdateContactAgency } from '../actions/contacts.actions';
import { ContactAgencyDataService } from '../../services/contactagencyinfo.service';
import { ContactAgencyRaw } from '../../models/contacts.agency';

@Injectable()
export class ContactsEffects {
    constructor(private actions$: Actions,
        private contactsDataService: ContactsDataService,
        private contactAgencyDataService: ContactAgencyDataService) { }


        /*
The loadContacts$ effect is listening for all dispatched actions through the Actions stream,
but is only interested in the LoadContacts action using the ofType operator.
The stream of actions is then flattened and mapped into a new observable using the mergeMap operator.
The contactsDataService.getContactsList() method returns an observable that maps the movies to a new action on success,
and currently returns an empty observable if an error occurs. The action is dispatched to the Store
where it can be handled by reducers when a state change is needed. Its also important to handle errors
when dealing with observable streams so that the effects continue running.
*/

@Effect()
loadContacts$ = this.actions$.pipe(
      ofType<fromContactActions.LoadContacts>(fromContactActions.contactActionTypes.LoadContacts),
      tap(() => console.log(' effect executed LoadContacts$')),
      switchMap((action: fromContactActions.LoadContacts) =>
                  this.contactsDataService.getContactsList().pipe(
                     map((contacts: ContactItemRaw[]) => new fromContactActions.LoadContactsSuccess( contacts)),
                     catchError(err => of(new fromContactActions.LoadContactsFail(err)))
                    )
                  )
  );

  /*
The createNewContact$ effect is listening for all dispatched actions through the Actions stream,
but is only interested in the createNewContacts action using the ofType operator.
The stream of actions is then flattened and mapped into a new observable using the mergeMap operator.
The contactsDataService.createNewContact() method returns an observable that maps the created contact to a new action on success,
and currently returns an empty observable if an error occurs. The action is dispatched to the Store
where it can be handled by reducers when a state change is needed. Its also important to handle errors
when dealing with observable streams so that the effects continue running.
*/
  @Effect()
  createNewContact$ = this.actions$.pipe(
      ofType<fromContactActions.CreateNewContact>(fromContactActions.contactActionTypes.CreateNewContact),
    tap(() => console.log('effect executed createNewContact')),
      mergeMap((action: fromContactActions.CreateNewContact) =>
                 this.contactsDataService.createNewContact(action.payload).pipe(
                    map((newContact: ContactItemRaw) => new fromContactActions.CreateNewContactSuccess(newContact)),
                    catchError(err => of(new fromContactActions.CreateNewContactFail(err)))
                )
            )
  );

    /*
The UpdateContact$ effect is listening for all dispatched actions through the Actions stream,
but is only interested in the UpdateContact action using the ofType operator.
The stream of actions is then flattened and mapped into a new observable using the mergeMap operator.
The contactsDataService.UpdateContact() method returns an observable that maps the updated contact to a new action on success,
and returns an empty observable if an error occurs. The appropriate action (success/failure) is dispatched to the Store
where it can be handled by reducers when a state change is needed. Its also important to handle errors
when dealing with observable streams so that the effects continue running.
*/

  @Effect()
  UpdateContact$ = this.actions$.pipe(
    ofType<fromContactActions.UpdateContact>(fromContactActions.contactActionTypes.UpdateContact),
    tap(() => console.log('effect executed UpdateContact')),
     mergeMap((action: fromContactActions.UpdateContact) =>
                this.contactsDataService.UpdateExistingContact(action.payload).pipe(
                  map((updatedContact: ContactItemRaw) => new fromContactActions.UpdateContactSuccess(updatedContact)),
                  catchError(err => of(new fromContactActions.UpdateContactFail(err)))
                )
             )
  );

  @Effect()
loadContactAgencies$ = this.actions$.pipe(
      ofType<fromContactActions.LoadContactAgency>(fromContactActions.contactActionTypes.LoadContactAgency),
      tap(() => console.log(' effect executed LoadContactAgencies')),
      switchMap((action: fromContactActions.LoadContactAgency) =>
                   this.contactAgencyDataService.getSpecificContactAgencyList(action.payload).pipe(
                      map((contactAgencies: ContactAgencyRaw[]) => new fromContactActions.LoadContactAgencySuccess(contactAgencies)),
                      catchError(err => of(new fromContactActions.LoadContactAgencyFail(err)))
                    )
                )
  );

  @Effect()
  AddNewContactAgency$ = this.actions$.pipe(
    ofType<fromContactActions.AddNewContactAgency>(fromContactActions.contactActionTypes.AddNewContactAgency),
    tap(() => console.log('effect executed AddNewContactAgencies')),
    mergeMap((action: fromContactActions.AddNewContactAgency) =>
                this.contactAgencyDataService.AddNewContactAgency(action.payload).pipe(
                map((newContactAgency: ContactAgencyRaw)  => new fromContactActions.AddNewContactAgencySuccess(newContactAgency)),
                catchError(err => of(new fromContactActions.AddNewContactAgencyFail(err)))
                )
             )
  );

  @Effect()
  UpdateContactAgency$ = this.actions$.pipe(
    ofType<fromContactActions.UpdateContactAgency>(fromContactActions.contactActionTypes.UpdateContactAgency),
    tap(() => console.log('effect executed UpdateContactAgency')),
    mergeMap((action: fromContactActions.UpdateContactAgency) =>
              this.contactAgencyDataService.UpdateExistingContactAgency(action.payload).pipe(
                map((updatedContactAgency: ContactAgencyRaw) => new fromContactActions.UpdateContactAgencySuccess(updatedContactAgency)),
                catchError(err => of(new fromContactActions.UpdateContactAgencyFail(err)))
              )
    )

  );

  @Effect()
  setContactsLoadedStateFalse$ = this.actions$.pipe(
    ofType<fromContactActions.SetContactsLoadedStateFalse>(fromContactActions.contactActionTypes.SetContactsLoadedStateFalse),
    tap(() => console.log('effect executed setContactsLoadedStateFalse')),
    map((action => new fromContactActions.SetContactsLoadedStateFalse(action.payload)),
    catchError(err => {
      return of(new fromContactActions.LoadContactsFail(err));
    })
  ));

}




