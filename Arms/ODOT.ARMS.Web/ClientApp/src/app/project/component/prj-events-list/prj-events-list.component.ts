import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DataStateChangeEvent, GridDataResult, RowClassArgs } from '@progress/kendo-angular-grid';
import { process, SortDescriptor, State } from '@progress/kendo-data-query';
import { parse } from 'url';
import { LookupItem } from '../../../shared/models/lookup-item';
import { EventRaw, EventViewModel } from '../../models/event-raw';
import { Personnel } from '../../models/personnel';
import { PhaseRaw } from '../../models/phase-raw';
import { ContactRoleList } from '../../models/project-for-update';

@Component({
  selector: 'app-prj-events-list',
  templateUrl: './prj-events-list.component.html',
  styles: [
  ]
})
export class PrjEventsListComponent implements OnInit {

  private phaseLookupList: LookupItem[] = [];

  @Input() events: EventRaw[] = [];
  @Input() phaseList: PhaseRaw[];
  @Input() primaryEvents: LookupItem[];
  @Input() secondaryEvents: LookupItem[];
  @Input() eventStatuses: LookupItem[];
  @Input() personnel: Personnel[] = [];
  @Output() selectEvent = new EventEmitter<EventRaw>();
  @Output() selectEventUpload = new EventEmitter<EventRaw>();//test to be removed
  public state: State = { skip: 0, take: 20 };
  public data: GridDataResult = process(this.events, this.state);
  public sort: SortDescriptor[] = [{
    field: 'phaseNum',
    dir: 'asc'
  }];
    gridData: any;
    personnelList: any[];

  constructor() { }

  ngOnInit(): void {
    this.personnelList = this.personnel;
    this.loadData();
  }

  loadData() {
    if (this.events) {
      this.gridData = this.events.map(item => {
        var phaseTxt = LookupItem.getTxtById(item.eventSrc, this.phaseLookupList);
        var primaryTypeTxt = this.primaryEvents.find(e => parseInt(e.value) == item.primaryTypeId)?.text;
        var secondaryTypeTxt = this.secondaryEvents.find(e => parseInt(e.value) == item.secondaryTypeId)?.text;
        var statusTxt = LookupItem.getTxtById(String(item.activeInd), this.eventStatuses);
        var contactRoleName = this.personnelList?.find(e => e.contactId == item.contactId)?.contactName + ' ' + this.personnelList?.find(e => e.contactId == item.contactId)?.contactRole;
        contactRoleName = contactRoleName === 'undefined undefined' ? '' : contactRoleName;
        return new EventViewModel(item.eventSrc, phaseTxt, item.primaryTypeId, primaryTypeTxt, item.secondaryTypeId, secondaryTypeTxt, item.invoiceNumber, item.publicCommentTxt, item.privateCommentTxt, item.userId, item.beginDate, item.endDate, item.activeInd, statusTxt, item.eventId, item.docCnt, item.projectId, item.contactId, contactRoleName)
      });
      this.data = process(this.gridData, this.state);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.phaseLookupList = PhaseRaw.buildGridPhaseLookupList(this.phaseList);
    this.loadData();
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.data = process(this.gridData, this.state);
  }


  public rowCallback = (context: RowClassArgs) => {
    if ((context.dataItem.activeInd === 'I') || (context.dataItem.activeInd === 'C')) {
      return {
        deleteEven: true,
        deleteOdd: true
      };
    }
  }

  public formatDocCnt(cnt: number): string {
    if (cnt) {
      return cnt + ' Docs';
    }
    else { 
      return '0 Docs';
    }
  }

}
