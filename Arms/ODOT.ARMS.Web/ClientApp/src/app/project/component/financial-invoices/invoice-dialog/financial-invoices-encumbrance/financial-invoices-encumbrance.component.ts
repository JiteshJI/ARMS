import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'financial-invoices-encumbrance',
  templateUrl: './financial-invoices-encumbrance.component.html',
  styles: [
  ],
})
export class FinancialInvoicesEncumbranceComponent implements OnInit {
  @Input() parentForm: FormGroup;//Pass the parents form group to the child

  SummaryData: { 'fiscalYr': string, 'encNum': string, 'sac': number, 'poLnAmt': number, 'adj': number, 'poLnDisb': number, 'poLinBal': number }[] = [
    {
      'fiscalYr': '2019',
      'encNum': '845584',
      'sac': 505,
      'poLnAmt': 400,
      'adj': 200,
      'poLnDisb': 150,
      'poLinBal': 300
    },
    {
      'fiscalYr': '2019',
      'encNum': '878458',
      'sac': 100,
      'poLnAmt': 100,
      'adj': 50,
      'poLnDisb': 25,
      'poLinBal': 80
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
