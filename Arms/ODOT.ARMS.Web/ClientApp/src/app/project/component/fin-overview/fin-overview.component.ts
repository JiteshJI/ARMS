import { Component, Input,OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OverviewRaw } from '../../models/Overview-raw';

@Component({
  selector: 'app-fin-overview-list',
  templateUrl: './fin-overview.component.html'
})
export class FinancialOverviewComponent implements OnInit, OnChanges {
  phaseDataData: { 'Phase': string; 'Category': string; 'Budget': string; 'Invoiced': string; 'Available': string; }[];
  //public activeTabText: string = "Overview";

  listItems: any;
  phaseItems: string[];
  AddEditDialogOpened: boolean;
  constructor() { }
  public gridOverViewData: any[];
  public gridPhaseData: any[];

  @Input() overviewList: OverviewRaw[] = [];
  ngOnInit() {
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
    this.gridOverViewData = this.overviewList;
    this.gridPhaseData = this.phaseDataData;
  }
  ngOnChanges(changes: SimpleChanges) {
  }
}
