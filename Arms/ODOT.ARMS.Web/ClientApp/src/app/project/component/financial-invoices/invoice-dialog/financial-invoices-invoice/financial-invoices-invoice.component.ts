import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'financial-invoices-invoice',
  templateUrl: './financial-invoices-invoice.component.html',
  styles: [
  ],
})
export class FinancialInvoicesInvoiceComponent implements OnInit {
  public activeTab: string = "invoice";

  @Input() parentForm: FormGroup;//Pass the parents form group to the child

  public listItems: Array<{ text: string, value: number }> = [
    { text: 'Hold', value: 1 },
    { text: 'Approved', value: 2 },
    { text: 'Denied', value: 3 }
  ];

  phaseItems: string[] = ["Phase 1", "Phase 2", "Phase 3"];

  constructor() { }

  ngOnInit(): void {
  }

  public onChangeInvStartDt(evt) {
    alert('test4');
  }

  public onChangeInvEndDt(evt) {
    alert('Test5');
  }

  public onChangeInvRecDt(evt) {
    alert('test');
  }

  public onChangePropInvDt(evt) {
    alert('Test6');
  }

  public onChangeInvFinPaidDt(evt) {
    alert('Test7');
  }

}
