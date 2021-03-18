import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'financial-invoices-budget-categories',
  templateUrl: './financial-invoices-budget-categories.component.html',
  styles: [
  ],
})
export class FinancialInvoicesBudgetCategoriesComponent implements OnInit {
  public activeTab: string = "budget-cat";
  @Input() parentForm: FormGroup;//Pass the parents form group to the child
  AddInvoiceDialogOpened: boolean;

  InvoiceData: { 'budgetCat': string, 'invAmt': number }[] = [
    { 'budgetCat': 'Subcontractor - Jimmy Johns', 'invAmt': 50 }
  ];

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

  public onAddInvoiceClick() {
    this.AddInvoiceDialogOpened = true;
  }

  public AddInvoiceDialogClose() {
    this.AddInvoiceDialogOpened = false;
  }

}
