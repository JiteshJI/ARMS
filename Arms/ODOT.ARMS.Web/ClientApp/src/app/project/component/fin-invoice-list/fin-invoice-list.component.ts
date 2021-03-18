import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { InvoiceRaw } from '../../models/invoice-raw';
import { LookupItem } from '../../../shared/models/lookup-item';
import { PhaseRaw } from '../../models/phase-raw';

@Component({
  selector: 'app-fin-invoice-list',
  templateUrl: './fin-invoice-list.component.html',
  styles: [
  ]
})
export class FinInvoiceListComponent implements OnInit, OnChanges {

  public phaseLookupList: LookupItem[] = [];
  public phasedropdownList: LookupItem[] = [];

  @Input() invoiceList: InvoiceRaw[] = [];
  @Input() phaseList: PhaseRaw[];
  @Input() fundingStatusItems: LookupItem[];//
  @Output() selectInvoiceUpload = new EventEmitter<InvoiceRaw>();
  @Output() selectInvoice = new EventEmitter<InvoiceRaw>();

  constructor() { }

  ngOnInit(): void {
    const gridPhaseArray = PhaseRaw.buildGridPhaseLookupList(this.phaseList);
    gridPhaseArray.forEach(val => this.phaseLookupList.push(Object.assign({}, val)));
    const ddPhaseArray = PhaseRaw.buildPhaseLookupList(this.phaseList);
    ddPhaseArray.forEach(val => this.phasedropdownList.push(Object.assign({}, val)));
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  public canDisable(): boolean {
    return (this.phasedropdownList.length < 1);
  }

  public getFundingStatusDescription(id: any): string {
    return LookupItem.getTxtById(id, this.fundingStatusItems);
  }

  public getPhaseDescription(id: any): string {
    return LookupItem.getTxtById(id, this.phaseLookupList);
  }

  public getInvoiceAmt(data: InvoiceRaw): number {
    let totAmnt: number = 0;
    data.invoiceDetails.forEach(invDtl => {
      totAmnt += invDtl.invAmt;
    });
    return totAmnt;
  }

  public formatDocCnt(cnt: number): string {
    if (cnt) {
      return cnt + ' Docs';
    }
    else {
      return '0 Docs';
    }
  }

}
