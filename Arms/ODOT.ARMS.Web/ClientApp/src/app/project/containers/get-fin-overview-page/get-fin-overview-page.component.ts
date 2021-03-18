import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCore from '../../../core/state/reducers';
import { OverviewRaw } from '../../models/Overview-raw';
import * as fromProject from "../../state/reducers";
import * as fromoverview from "../../state/reducers/get-fin-overview-page.reducer";

@Component({
  selector: 'app-get-fin-overview-page',
  templateUrl: './get-fin-overview-page.component.html',
  styles: [
  ]
})

export class GetFinOverviewPageComponent implements OnInit {
  overviewList$: Observable<OverviewRaw[]>;
    test: OverviewRaw[];

  constructor(public coreStore: Store<fromCore.State>, public projectStore: Store<fromProject.State>, public overviewStore: Store<fromoverview.OverviewState>
  ) { }

  ngOnInit(): void {
    this.overviewList$ = this.overviewStore.select(fromoverview.getAllOverviews);
  }

}
