import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '../../../core/state/reducers';
import * as fromProject from "../../state/reducers";
import * as fromLedger from "../../state/reducers/get-fin-ledger-page.reducer";

@Component({
  selector: 'app-get-fin-ledger-page',
  templateUrl: './get-fin-ledger-page.component.html',
  styles: [
  ]
})

export class GetFinLedgerPageComponent implements OnInit {
  ledgerList$: any;

  constructor(public coreStore: Store<fromCore.State>, public projectStore: Store<fromProject.State>, public ledgerStore: Store<fromLedger.LedgerState>
  ) { }

  ngOnInit(): void {
    this.ledgerList$ = this.ledgerStore.select(fromLedger.getAllLedgers);
  }

}
