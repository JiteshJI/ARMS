import { Injectable} from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
//import { Action } from '@ngrx/store';
import { Observable, of as observableOf, of } from 'rxjs';
import { catchError, map, startWith, switchMap, mergeMap, concatMap } from 'rxjs/operators';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { ConfigService } from '../../services/config.service';
import { editNotificationPageActionTypes } from '../actions/edit-notification-page.actions';
import { ConfigRaw } from '../../models/config-raw';


@Injectable()
export class EditNotificationPageEffects {

  constructor(private actions$: Actions, private configService: ConfigService, private notificationService: kendonotificationservice) { }

  loadNotification$ = createEffect(() => this.actions$.pipe(
    ofType(editNotificationPageActionTypes.loadEditNotificationPage),
    concatMap(action => this.configService.getNotification().pipe(
      map((notification: ConfigRaw) => {
        return editNotificationPageActionTypes.loadEditNotificationPageSuccess({ notification });
      }),
      catchError(err => {
        this.notificationService.showError('Notification Load Failed');
        return of(editNotificationPageActionTypes.loadEditNotificationPageFailure({ error: err }));
      })
    )
    )
  )
  );

  updateNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editNotificationPageActionTypes.updateNotificationPage),
      concatMap(action => this.configService.updateNotification(action.notification).pipe(

        map((notification: ConfigRaw) => {
          this.notificationService.showSuccess('Notification Updated Successfully');
          return editNotificationPageActionTypes.updateNotificationPageSuccess({ notification });
        }),
        catchError(err => {
          this.notificationService.showError('Notification Failed to Update');
          return of(editNotificationPageActionTypes.updateNotificationPageFailure({ error: err }));
        })
      )
      )
    )
  );

}
