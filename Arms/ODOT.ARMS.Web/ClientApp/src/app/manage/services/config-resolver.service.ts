import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, take, tap, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromAdmin from '../state/reducers/index';
import * as fromNotification from '../state/reducers/edit-notification-page.reducer';
import * as fromNotificationActions from '../state/actions/edit-notification-page.actions';
import * as fromNotificationSelectors from '../state/selector/edit-notification-page.selectors';
import { ConfigRaw } from '../models/config-raw';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigResolverService {

  constructor(
    private configService: ConfigService,
    private notificationStore: Store<fromNotification.State>,
    public adminStore: Store<fromAdmin.State>,
  ) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      console.info('ConfigResolverService Resolve');
      return this.configService.getNotification().pipe(
          tap((notification: ConfigRaw) => {
              this.notificationStore.dispatch(fromNotificationActions.loadEditNotificationPageSuccess({ notification: notification }));
          }),
          map((notification) => !!notification),
          catchError((error) => {
              //console.info('ConfigResolverService Failed ' + error);
              return of(false);
          })
      );
  }
}
