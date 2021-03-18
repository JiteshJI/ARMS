import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAdmin from "../../state/reducers";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styles: [
  ],
})
export class AdminHeaderComponent implements OnInit {
  public activeAdminTab$: Observable<string>;

  constructor(public adminStore: Store<fromAdmin.State>) { }

  ngOnInit(): void {
    this.activeAdminTab$ = this.adminStore.select(fromAdmin.selectActiveAdminTab);
  }
}
