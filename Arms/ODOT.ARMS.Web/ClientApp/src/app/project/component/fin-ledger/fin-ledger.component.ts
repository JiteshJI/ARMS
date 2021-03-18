import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from "@progress/kendo-angular-grid";
import { process, SortDescriptor, State } from '@progress/kendo-data-query';
import { LedgerRaw } from '../../models/ledger-raw';


@Component({
  selector: 'app-fin-ledger-list',
  templateUrl: './fin-ledger.component.html'
})
export class FinLedgerComponent implements OnInit, OnChanges {

  @Input() ledgerList: LedgerRaw[] = [];
  public state: State = { skip: 0, take: 16 };
  public data: GridDataResult = process(this.ledgerList, this.state);

  public sort: SortDescriptor[] = [{
    field: 'phase',
    dir: 'asc'
  }];
  ngOnInit() {
    this.data = process(this.ledgerList, this.state);
  }

  ngOnChanges(changes: SimpleChanges) {
  }
  public dataStateChange(state: DataStateChangeEvent): void {

    //const dateFilterDescriptor = state.filter.filters.find(f => f.field === 'date');
    //const dateFilterIndex = state.filter.filters.findIndex(f => f.field === 'date');

    //if (dateFilterDescriptor) {
    //  const incomingDate = dateFilterDescriptor.value;
    //  const newDate = new Date(incomingDate.valueOf());
    //  newDate.setDate(newDate.getDate() + 1);

    //  const newFilter = {
    //    filters: [{ field: 'date', operator: 'gte', value: dateFilterDescriptor.value }, { field: 'date', operator: 'lt', value: newDate }], logic: 'and'
    //  };

    //  state.filter.filters.splice(dateFilterIndex, 1, newFilter);
    //}
    this.state = state;
    this.data = process(this.ledgerList, this.state);
  }
}
