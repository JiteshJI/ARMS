import { Component, OnInit, Inject, Injectable } from '@angular/core';
//import { process, State } from '@progress/kendo-data-query';
//import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
//import { EventsRaw, IEvents, IEventUpload, EventUpload } from '../../models/events';
import { EventUpload } from '../../models/event-upload';
//import { EventRaw } from '../../models/event-raw';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';


export interface DialogData {
  animal: string;
  name: string;
}

@Injectable()
export class DataService {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-financial-invoices',
  templateUrl: './financial-invoices.component.html',
  //styles: []
  styles: [`:host /deep/ .k-grouping-header{
    display: none !important;
  }`,
    `:host /deep/ .k-grid tr.k-grouping-row{
    color: white !important;
    background-color: #a8a99e !important;
  };`]
})

export class FinancialInvoicesComponent implements OnInit {
  //public activeTabText: string = "Invoices";
  AddEditDialogOpened: boolean;


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


 

  public formData: FormData;

  itemsList: EventUpload[];
  public itemToRemove: string;

  constructor(public router: Router, public fb: FormBuilder, public route: ActivatedRoute, /*public projectStore: Store<fromProjectreducer.ProjectState>, public projectTypeStore: Store<fromProjectTypereducer.ProjectTypeState>, public projectForDDStore: Store<fromProjectforDDreducer.ProjectState>, public AgencyStore: Store<fromAgencyreducer.State>,*/ public notificationService: kendonotificationservice/*, public eventStore: Store<fromEventReducer.EventState>, private http: HttpClient, public fielserviceExt: fielservice*/) { }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  

  ngOnInit() {
  }

  public AddEditDialogClose() {
    this.AddEditDialogOpened = false;
  }
  public onAddClick(event) {
    this.AddEditDialogOpened = true;
  }




  public onChangeInvDt(evt) {
    alert('test2');
  }

  public handleStatusChange(evt) {
    alert('test3');
  }









}
