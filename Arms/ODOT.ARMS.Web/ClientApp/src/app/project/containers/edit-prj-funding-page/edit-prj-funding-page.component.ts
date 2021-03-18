/// <reference path="../../state/reducers/funding.reducer.ts" />
/// <reference path="../../state/reducers/funding.reducer.ts" />
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FundingRaw } from '../../models/fundings-raw';
import * as fromCore from '../../../core/state/reducers';
import * as fromFunding from "../../state/reducers/funding.reducer";


import { take } from "rxjs/operators";

@Component({
  selector: 'app-edit-prj-fundings-page',
  templateUrl: './edit-prj-funding-page.component.html',
  styles: [
  ]
})

export class EditPrjFundingPageComponent implements OnInit {
  public fundingData$: Observable<FundingRaw[]>;
  public  projectId$: string;
  constructor(public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromFunding.FundingState>) { }
  ngOnInit(): void {
    //this.projectStore.select(fromProject.getProjectId).pipe(take(1)).subscribe(value => this.projectId$ = value);
    //this.events$ = this.projectStore.select(fromProject.);
  }
}
