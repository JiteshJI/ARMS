import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { GridDataResult, RowClassArgs } from "@progress/kendo-angular-grid";

import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { LookupItem } from "src/app/shared/models/lookup-item";
import { GenericLookupListForDD } from "../../models/project-for-update";
import { PhaseRaw, PhaseStatus } from "../../models/phase-raw";



@Component({
  selector: 'app-prj-phase-list',
  templateUrl: './prj-phases-list.component.html'
})
export class PrjPhaseListComponent implements OnInit, OnChanges {

  @Input() phaseStatusList: Array<GenericLookupListForDD>;
  @Input() phases: Array<PhaseRaw>;
  @Input() mergePhases: Array<PhaseRaw>;
  @Output() selectPhase = new EventEmitter<PhaseRaw>();
  @Output() mergePhase = new EventEmitter<PhaseRaw[]>();

  public phaseString: string = null;
  public mergePhaseSum: number = 0.00;
  public gridView: GridDataResult;
  //public mergePhases: PhaseRaw[] = [];
  public sort: SortDescriptor[] = [{
    field: 'phaseNum',
    dir: 'asc'
  }];

  ngOnInit() {
    this.loadPhases()
    this.updateFooter();
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log('onchange', changes, this.phases);
    if (this.phases && this.phases?.length > 0) {
      //this.mergePhases = [];//Is this really correct?
      this.reconcileMergeItems();
      this.loadPhases();
      this.updateFooter();
    }
      
  }

  private reconcileMergeItems() {
    if (this.mergePhases.length === 0)
      return;
    //==========================================================================================================================
    //
    // If an authorized item is flagged to be merge is then set to be cancelled
    // We have to remove the item from the merge list
    // The good thing is that there are usually not a lot of phases
    //
    //==========================================================================================================================

    let idx: number = -1;
    this.phases.forEach(element => {
      idx = this.mergePhases.findIndex(x => x.phaseId === element.phaseId);
      if (idx > -1) {
        var status: number = +element.statusId;
        if ((status === PhaseStatus.Proposed) || (status === PhaseStatus.Canceled)) {
          this.mergePhases.splice(idx, 1);
        }
      }
    });
  }

  private loadPhases(): void {
    if (this.phases) {
      this.gridView = {
        data: orderBy(this.phases, this.sort),
        total: this.phases.length
      };
    }
  }

  public updateFooter() {
    this.mergePhaseSum = this.gridView.data.filter(item => item.mergeInd === 'M').reduce((sum, current) => sum + current.amount, 0);
    this.phaseString = this.gridView.data.filter(item => item.mergeInd === 'M').map(e => e.phaseNum).join(',');
  }

  public handleMerge(row: PhaseRaw, event: any) {
    let statusId: number = PhaseStatus.Proposed;
    if (row.statusId)
      statusId = +row.statusId;

    if (((row.mergeInd) || (row.mergeInd !== 'M')) && (statusId === PhaseStatus.Authorized) && (this.phases.length > 1)) {

      if (event.target.checked) {
        let phase = Object.assign({}, row);
        //phase.mergeInd = 'M';//Change the state prior to emitting or saving
        this.mergePhases.push(phase);
      }
      else {
        let index = this.mergePhases.findIndex(x => x.phaseId == row.phaseId);
        if (index > -1) {
          this.mergePhases.splice(index, 1);
        }
      }
    }
    else return false;        
  }

  public canMerge(): boolean {
    if ((this.phases.length < 2) || (this.mergePhases.length < 1))
      return true;
    let MergePrime = this.mergePhases.findIndex(x => x.phaseNum == 1);
    //========================================================================================================
    //
    //  I expect that the first first phase to be the starting point to a merge
    //
    //========================================================================================================
    if ((MergePrime > -1) && (this.mergePhases.length > 1))//Phase 1 + others to merge
    {
      return false;
    }
    MergePrime = this.phases.findIndex(x => x.phaseNum == 1 && x.mergeInd == "M");
    //=======================================================================================================
    //
    // Phase 1 has already been merged
    // We are need additional phases
    //
    //=======================================================================================================
    if ((MergePrime > -1) && (this.mergePhases.length > 0)) {
      return false;
    }
    return true;
  }

  public canCheck(row: PhaseRaw) {
    let idx: number = -1;
    //let statusId: number = PhaseStatus.Proposed;
    //if (row.statusId)
    //  statusId = +row.statusId;
    if ((row.mergeInd) && (row.mergeInd === 'M')) {
      return true;
    }
    else {
      if (this.mergePhases.length === 0)
        return false;
      idx = this.mergePhases.findIndex(x => x.phaseId == row.phaseId);
        return (idx > -1);
    }
  }

  public rowCallback = (context: RowClassArgs) => {
    if (context.dataItem.activeInd === 'I') {
      return {
        deleteEven: true,
        deleteOdd: true
      };
    }
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadPhases();
  }

  getStatusDescription(id: any) {
    return LookupItem.getTxtById(id, this.phaseStatusList);
  }

  public onMerge() {
    this.mergePhase.emit(this.mergePhases);
   // this.mergePhases = [];//Clear the merged phases here
  }

}
