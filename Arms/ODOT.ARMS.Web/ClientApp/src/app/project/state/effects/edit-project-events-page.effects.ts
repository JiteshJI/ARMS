import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, concatMap, map, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { editPrjEventsPageActionTypes } from '../actions/edit-project-events-page.actions';
import { EventService } from '../../services/event.service';
import { of } from 'rxjs';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { EventRaw } from '../../models/event-raw';


@Injectable() 

export class EditPrjEventsPageEffects {

  constructor(private eventService: EventService,  private actions$: Actions, private notificationService: kendonotificationservice) { }
 
  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editPrjEventsPageActionTypes.addEvent),
      concatMap(action => this.eventService.addEvent(action.event).pipe(
        map((events: EventRaw[]) => {
          this.notificationService.showSuccess('Create Event Successful');
          return editPrjEventsPageActionTypes.addEventSuccess({ events });
        }),
        catchError(err => {
          this.notificationService.showError('Create Event failed');
          return of(editPrjEventsPageActionTypes.addEventFailure({ error: err }));
        })
      )
    )
  )
);
  
  updateEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editPrjEventsPageActionTypes.updateEvent),
      concatMap(action => this.eventService.updateEvent(action.event).pipe(

        map((event: EventRaw) => {
          this.notificationService.showSuccess('Update Event Successful');
          return editPrjEventsPageActionTypes.updateEventSuccess({ event });
        }),
        catchError(err => {
          this.notificationService.showError('Update Event failed');
          return of(editPrjEventsPageActionTypes.updateEventFailure({ error: err }));
        })
      )
    )
  )
  );

}
