import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromProject from "../../state/reducers";

@Component({
  selector: 'app-financial-header',
  templateUrl: './financial-header.component.html',
  styles: []
})

export class FinancialHeaderComponent implements OnInit {
  public activeFinanceTab$: Observable<string>;

  constructor(public projectStore: Store<fromProject.State>) { }

  ngOnInit() {
    this.activeFinanceTab$ = this.projectStore.select(fromProject.selectActiveFinanceTab);
  }


}
