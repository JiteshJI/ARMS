import { Component, OnInit, Input } from '@angular/core';
import { ModificationsBaseComponent } from '../modifications-base/modifications-base.component';

@Component({
  selector: 'modifications-budget',
  templateUrl: './modifications-budget.component.html',
  styles: [
  ],
})
export class ModificationsBudgetComponent extends ModificationsBaseComponent implements OnInit {
  modBudgetData: { 'budgetCategory': string, 'title': string, 'budgetAmount': string, 'status': string}[];
  AddEditDialogOpened: Boolean;
  gridModBudgetData: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.modBudgetData = [
      {
        budgetCategory: 'Salaries and Wages',
        title:'',
        budgetAmount: '6966.70',
        status: 'Active'
      },
      {
        budgetCategory: 'SubContractor',
        title:'Jimmy John',
        budgetAmount: '5000',
        status: 'Active'
      }
    ]
    this.gridModBudgetData = this.modBudgetData;
  }

  public onAddClick(event) {
    this.AddEditDialogOpened = true;
  }

  public AddEditDialogClose(event){
    this.AddEditDialogOpened = false;
  }

}
