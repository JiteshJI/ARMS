import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromAdminNotificationActions from '../../state/actions/edit-notification-page.actions';
import * as fromAdmin from '../../state/reducers/index';
import * as fromNotification from '../../state/reducers/edit-notification-page.reducer';
import * as fromNotificationSelectors from '../../state/selector/edit-notification-page.selectors';
import { ConfigRaw } from '../../models/config-raw';

@Component({
  selector: 'app-edit-notification-page',
  templateUrl: './edit-notification-page.component.html',
  styles: [
  ]
})
export class EditNotificationPageComponent implements OnInit {
  public notificationTxt$: Observable<string>;

  constructor(public adminStore: Store<fromAdmin.State>,
    public notificationStore: Store<fromNotification.State>) { }

  ngOnInit(): void {
    this.notificationTxt$ = this.notificationStore.select(fromNotificationSelectors.selectNotificationTxt);
  }

  public saveNotificationTxt(notificationTxt: string) {
    this.notificationStore.dispatch(fromAdminNotificationActions.updateNotificationPage({ notification: ConfigRaw.CreateNotification(notificationTxt)}));
  }

}
