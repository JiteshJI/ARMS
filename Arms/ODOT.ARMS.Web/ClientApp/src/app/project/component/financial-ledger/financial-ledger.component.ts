import { Component, OnInit } from '@angular/core';
import { GridDataResult, DataBindingDirective, DataStateChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-financial-ledger',
  templateUrl: './financial-ledger.component.html',
  styles: []
})
export class FinancialLedgerComponent implements OnInit {
 // public activeTabText: string = "Ledger";


  public data = [
    {
      'phaseId': 'guidstuff',
      'phaseTxt': 'Phase 1',
      'catId': 1,
      'catTxt': 'Salary and Wages',
      'titleTxt': '',
      'transId': 1,
      'transTxt': 'Budget',
      'amt': 10000,
      'balance': 10000,
      'dt': new Date()
    },
    {
      'phaseId': 'guidstuff',
      'phaseTxt': 'Phase 1',
      'catId': 2,
      'catTxt': 'Fringe Benefits',
      'titleTxt': '',
      'transId': 1,
      'transTxt': 'Budget',
      'amt': 1000,
      'balance': 1000,
      'dt': new Date()
    },
    {
      'phaseId': 'guidstuff',
      'phaseTxt': 'Phase 1',
      'catId': 3,
      'catTxt': 'Travel',
      'titleTxt': '',
      'transId': 1,
      'transTxt': 'Budget',
      'amt': 200,
      'balance': 200,
      'dt': new Date()
    },
    {
      'phaseId': 'guidstuff',
      'phaseTxt': 'Phase 1',
      'catId': 4,
      'catTxt': 'Subcontractor',
      'titleTxt': 'Indiana Jones',
      'transId': 1,
      'transTxt': 'Budget',
      'amt': 5000,
      'balance': 5000,
      'dt': new Date()
    },
    {
      'phaseId': 'guidstuff',
      'phaseTxt': 'Phase 1',
      'catId': 5,
      'catTxt': 'Funds Encumbered',
      'titleTxt': '',
      'transId': 2,
      'transTxt': 'Encumbrance',
      'amt': 25000,
      'balance': 25000,
      'dt': new Date()
    },
    {
      'phaseId': 'guidstuff',
      'phaseTxt': 'Phase 1',
      'catId': 1,
      'catTxt': 'Salary and Wages',
      'titleTxt': '',
      'transId': 3,
      'transTxt': 'Invoice',
      'amt': -5000,
      'balance': 5000,
      'dt': new Date()
    },
    {
      'phaseId': 'guidstuff',
      'phaseTxt': 'Phase 1',
      'catId': 2,
      'catTxt': 'Fringe Benefits',
      'titleTxt': '',
      'transId': 1,
      'transTxt': 'Budget',
      'amt': -200,
      'balance': 800,
      'dt': new Date()
    },
    {
      'phaseId': 'guidstuff',
      'phaseTxt': 'Phase 1',
      'catId': 1,
      'catTxt': 'Salary and Wages',
      'titleTxt': '',
      'transId': 1,
      'transTxt': 'Budget',
      'amt': -2000,
      'balance': 3000,
      'dt': new Date()
    },
    {
      'phaseId': 'guidstuff',
      'phaseTxt': 'Phase 1',
      'catId': 2,
      'catTxt': 'Fringe Benefits',
      'titleTxt': '',
      'transId': 1,
      'transTxt': 'Budget',
      'amt': -100,
      'balance': 700,
      'dt': new Date()
    },
  ]; 

  constructor() { }

  ngOnInit() {
  }

  public rowCallback = (context: RowClassArgs) => {
    return {
      deleteEven: true,
      deleteOdd: true
    };
  }

}
