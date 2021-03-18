import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'financial-invoices-balances',
  templateUrl: './financial-invoices-balances.component.html',
  styles: [
  ],
})
export class FinancialInvoicesBalancesComponent implements OnInit {
  public activeTab: string = "overview";


  @Input() parentForm: FormGroup;//Pass the parents form group to the child

  public aggregates: any[] = [{ field: 'BudgetBalance', aggregate: 'average' }, { field: 'invAmt', aggregate: 'sum' }];

  public state: State = {
    skip: 0,
    group: [{ field: 'budgetCat', aggregates: this.aggregates }]
  };

  data: { 'phaseTxt': string, 'invNum': string, 'startDt': Date, 'endDt': Date, 'propInvDt': Date, 'finDt': Date, 'statusTxt': string, 'amt': number }[] = [
    {
      'phaseTxt': 'Phase 1',
      'invNum': '20-2343',
      'startDt': new Date(2019, 1, 1),
      'endDt': new Date(2019, 12, 1),
      'propInvDt': null,
      'finDt': null,
      'statusTxt': 'Approved',
      'amt': 10000
    },
    {
      'phaseTxt': 'Phase 1',
      'invNum': '323-44',
      'startDt': new Date(2020, 2, 2),
      'endDt': new Date(2020, 3, 1),
      'propInvDt': null,
      'finDt': null,
      'statusTxt': 'Approved',
      'amt': 13000
    },
    {
      'phaseTxt': 'Phase 2',
      'invNum': '33-545',
      'startDt': new Date(2020, 1, 2),
      'endDt': new Date(2020, 6, 1),
      'propInvDt': null,
      'finDt': null,
      'statusTxt': 'Denied',
      'amt': 10000
    }
  ];

  CostData: { 'budgetCat': string, 'itm': string, 'BudgetBalance': number, 'BudgetTxt': string, 'invAmt': number, availableFunds: number }[] = [
    {
      'budgetCat': 'Salaries and Wages', 'itm': 'Tips', 'BudgetBalance': 6966.70, 'BudgetTxt': '', 'invAmt': 1800, 'availableFunds': 0
    },
    {
      'budgetCat': 'Salaries and Wages', 'itm': 'Coin Jar', 'BudgetBalance': 6966.70, 'BudgetTxt': '', 'invAmt': 200, 'availableFunds': 0
    },
    {
      'budgetCat': 'Subcontractor', 'itm': 'Jimmy Johns', 'BudgetBalance': 2500, 'BudgetTxt': '', 'invAmt': 0, 'availableFunds': 0
    },
    {
      'budgetCat': 'Subcontractor', 'itm': 'Jill Hill', 'BudgetBalance': 2500, 'BudgetTxt': '', 'invAmt': 200, 'availableFunds': 0
    },
    {
      'budgetCat': 'Fringe Benefits', 'itm': 'Wet Bar', 'BudgetBalance': 541, 'BudgetTxt': '', 'invAmt': 152, 'availableFunds': 0
    },
    {
      'budgetCat': 'Travel', 'itm': '', 'BudgetBalance': 242.50, 'BudgetTxt': '', 'invAmt': 0, 'availableFunds': 0
    },
    {
      'budgetCat': 'Supplies', 'itm': 'Stationary', 'BudgetBalance': 0, 'BudgetTxt': '', 'invAmt': 0, 'availableFunds': 0
    }
  ];

  public gridCostData: any = process(this.CostData, this.state);

  constructor() {
    console.info('child Constructor');
  }

  ngOnInit(): void {
    console.info('child onInit');
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    if (state && state.group) {
      state.group.map(group => group.aggregates = this.aggregates);
    }

    this.state = state;

    this.gridCostData = process(this.data, this.state);
  }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });


}
