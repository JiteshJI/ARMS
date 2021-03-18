import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TabStripComponent } from "@progress/kendo-angular-layout";
import { ModificationsBaseComponent } from "./modifications-base/modifications-base.component";

enum Changes {
  None = 0,
  Budget = 1, // 0001 -- the bitshift is unnecessary, but done for consistency
  BudgetCat = 2,     // 0010
  Funding = 4,    // 0100
  Review = 8,
  Personnel = 16,   // 1000
  Scope = 32,   // 10000
  Task = 64, // 100000
  Time = 128 // 100000
  
}

@Component({
  selector: 'app-modifications',
  templateUrl: './modifications.component.html',
  styles: [ ]
})

export class ModificationsComponent implements OnInit, AfterContentInit {
  modData: { 'modNum': string, 'addendumLetter': string, 'modType': string, 'requestDate': string, 'status': string, 'notes': string }[];
  public reqChangesList: Array<{ text: string, value: number, tabNme: string }> = [
    { text: 'Budget Reallocations (to move existing funds between)', value: 1, tabNme : 'Budget' },
    { text: 'Budget Categories', value: 2, tabNme: 'Budget Catories' },
    { text: 'Funding Changes (results in an addendum to the contract)', value: 4, tabNme: 'Funding' },
    { text: 'Permission to Disseminate Preliminary Results', value: 8, tabNme: 'Review' },
    { text: 'Personnel Changes', value: 16, tabNme: 'Personnel'},
    { text: 'Scope Change (results in an addendum to the contract)', value: 32, tabNme: 'Scope' },
    { text: 'Task Changes (changes to activities)', value: 64, tabNme: 'Task' },
    { text: 'Time Extension (results in an addendum to the contract)', value: 128, tabNme: 'Time'}
    
  ];

  public reqChangesMap: Map<number, string> = new Map<number, string>();
  public activeTab: { idx: number, tabTitle: string } = { idx: 0, tabTitle: ''};


  public reqChangesValues: Array<{ text: string, value: number }> = [];

  public isSelected(idx: number, tabTitle: string): any {

    if (this.reqChangesValues.length === 0) {
      this.activeTab.idx = 0;
      this.activeTab.tabTitle = '';
      return false;
    }

    if (idx === 0) {
      var tmp =  <Array<{ text: string, value: number}>>this.orderList(this.reqChangesValues);
      var i = tmp.findIndex(x => this.reqChangesMap.get(x.value) === this.activeTab.tabTitle);
      if (i === -1) {
        this.activeTab.idx = 0;
        this.activeTab.tabTitle = this.reqChangesMap.get(tmp[0].value);
      }
      else {
        if (i !== this.activeTab.idx) {
          this.activeTab.idx = i;
          this.activeTab.tabTitle = this.reqChangesMap.get(tmp[i].value);
        }
      }
    }

    return (idx === this.activeTab.idx);
  }

  public onTabSelect(e) {
    this.activeTab.idx = e.index;
    this.activeTab.tabTitle = e.title;
  }

  orderList(vals: any): any {

    var skiplist = [2, 8, 64];
    var junk = vals.slice();

    skiplist.forEach(function (val) {
      var idx = junk.findIndex(x => x.value === val);
      if (idx > -1) {
        junk.splice(idx, 1);
      }
    });

    junk.sort((a, b) => (a.value > b.value) ? 1 : -1);
    return junk;
  };

  @ViewChild('tabs') public tabs: TabStripComponent;
  @ViewChild('budgetComp') public budgetComp: ModificationsBaseComponent;

  modDataFlg: number = Changes.None;

  public modTypeList: Array<{ text: string, value: number }> = [
    { text: 'Non - Addendum', value: 1 },
    { text: 'Addendum', value: 2 }
  ];

  public modStatusList: Array<{ text: string, value: number }> = [
    { text: 'Approved', value: 1 },
    { text: 'Approved with modifications', value: 2 },
    { text: 'Denied', value: 3 }
  ];

  gridModData: any;
  AddEditDialogOpened: boolean;
  status: string[];
  public activeTab$: Observable<string>;
  constructor() {
    
  }

  ngOnInit(): void {
    this.modData = [
      {
        modNum : '1',
        addendumLetter: 'A',
        modType: 'Addendum',
        requestDate: '9/1/2019',
        status: 'Approved',
        notes: 'Moved salaries to travel'
      },
      {
        modNum : '2',
        addendumLetter: 'B',
        modType: 'Addendum',
        requestDate: '10/1/2019',
        status: 'Pending',
        notes: 'added 3 months to timeline'
      }
    ];
    this.gridModData = this.modData;

    this.reqChangesList.forEach((element) => {
      this.reqChangesMap.set(element.value, element.tabNme);
    });
    
    
  }

  ngAfterContentInit() {

  }

  public onAddClick(event) {
    this.AddEditDialogOpened = true;

  }

  public AddEditDialogClose(event){
    this.AddEditDialogOpened = false;
  }

  public AddEditDialogSave()
  {
    this.AddEditDialogOpened = false;
    
  }

  public onChangeRequestDate(event){

  }

  public onChangeCompletionDate(event){

  }

  public valueChange(event) {    
    this.modDataFlg = Changes.None;
    event.forEach((element) => {
      this.modDataFlg = this.modDataFlg | element.value;
    });
  }

  public test(value: number): any {
    console.info(value);
    return ((this.modDataFlg & value) === value);
  }


}
