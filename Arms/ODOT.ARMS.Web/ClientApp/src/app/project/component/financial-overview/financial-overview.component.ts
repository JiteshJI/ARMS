import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financial-overview',
  templateUrl: './financial-overview.component.html'
})
export class FinancialOverviewComponent implements OnInit {
  overViewData: { 'Description': string; 'Amount': string; }[];
  phaseDataData: { 'Phase': string; 'Category': string; 'Budget': string; 'Invoiced': string; 'Available': string; }[];
  //public activeTabText: string = "Overview";
 
  listItems: any;
  phaseItems: string[];
  AddEditDialogOpened: boolean;
  constructor() { }
  public gridOverViewData: any[];
  public gridPhaseData: any[];
 
  ngOnInit() {
this.overViewData = [{
      'Description': 'Total Contract Amount',
      'Amount': '$130,696.90'
    },
    {
      'Description': 'Total Encumbered Amount',
      'Amount': '$130,696.90'
    },
    {
      'Description': 'Total Contract Amount',
      'Amount': '$7677'
    }, {
      'Description': 'Expense not to exceed',
      'Amount': '$130,696.90'
    }, {
      'Description': 'Amount Expended to Date',
      'Amount': '$96,786.18'
    }, {
      'Description': 'Withholding',
      'Amount': '$26,139.38'
    }, {
      'Description': 'Contingency',
      'Amount': '$0.00'
    },
{
      'Description': 'Contract Amount - Withholding - Contingency - Expended',
      'Amount': '$7,771.34'
    },
    {
      'Description': 'Available Encumbered Funds',
      'Amount': '$33,910.72'
    }
    
    ];
    this.phaseDataData = [{
      'Phase': 'Default',
      'Category': 'Salary and Wages',
      'Budget': '$39,513.94',
      'Invoiced': '$35,123,20',
      'Available': '$4,390.74'
    },
    {
      'Phase': 'Default',
      'Category': 'Fringe Benifits',
      'Budget': '$39,513.94',
      'Invoiced': '$35,123,20',
      'Available': '$4,390.74'
    },
    {
      'Phase': 'Default',
      'Category': 'Travel',
      'Budget': '$39,513.94',
      'Invoiced': '$35,123,20',
      'Available': '$4,390.74'
    },
    {
      'Phase': 'Default',
      'Category': 'Printing',
      'Budget': '$39,513.94',
      'Invoiced': '$35,123,20',
      'Available': '$4,390.74'
    },
    {
      'Phase': 'Default',
      'Category': 'In-Direct Costs',
      'Budget': '$39,513.94',
      'Invoiced': '$35,123,20',
      'Available': '$4,390.74'
    },
    {
      'Phase': 'Default',
      'Category': 'SubContract 1',
      'Budget': '$39,513.94',
      'Invoiced': '$35,123,20',
      'Available': '$4,390.74'
      },
      {
        'Phase': 'Default',
        'Category': 'SubContract 2',
        'Budget': '$39,513.94',
        'Invoiced': '$35,123,20',
        'Available': '$4,390.74'
      },
      {
        'Phase': 'Default',
        'Category': 'Funds Relesed aft...',
        'Budget': '$39,513.94',
        'Invoiced': '$35,123,20',
        'Available': '$4,390.74'
      },
      {
        'Phase': 'Default',
        'Category': 'Refund',
        'Budget': '$39,513.94',
        'Invoiced': '$35,123,20',
        'Available': '$4,390.74'
      }
    ];
   

    this.gridOverViewData = this.overViewData;
    this.gridPhaseData = this.phaseDataData;
    
   
  }


}
