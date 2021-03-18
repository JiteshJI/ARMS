import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DataStateChangeEvent, GridDataResult, RowClassArgs } from '@progress/kendo-angular-grid';
import { process, SortDescriptor, State } from '@progress/kendo-data-query';
import { LookupItem } from '../../../shared/models/lookup-item';
import { FundingGridViewModel, FundingRaw } from '../../models/fundings-raw';

@Component({
  selector: 'app-fin-funding-list',
  templateUrl: './fin-funding-list.component.html',
  styles: [
  ]
})
export class FinFundingListComponent implements OnInit {
  // public activeTabText: string = "Funding";
  AddEditDialogOpened: boolean;
  gridFundingData: any;
  phaseItems: string[];
  @Input() funding: FundingRaw[] = [];
  @Input() fundingType: LookupItem[];
  @Input() fundingSource: LookupItem[];
  @Input() fundingCategory: LookupItem[];

  @Output() selectFunding = new EventEmitter<FundingRaw>();
  @Output() selectFundingUpload = new EventEmitter<FundingRaw>();
  public gridData: FundingGridViewModel[] = [];

  public state: State = { skip: 0, take: 5 };
  public data: GridDataResult = process(this.gridData, this.state);

  public sort: SortDescriptor[] = [{
    field: 'phaseNum',
    dir: 'asc'
  }];

  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('funding list - on changes', this.funding);
    this.loadData();
  }

  loadData() {
    
    if (this.funding) {
      this.gridData = this.funding.map(item => {
        if (this.fundingType && this.fundingSource && this.fundingCategory) {
          var fundingTypeObj = this.fundingType.find(x => x.value.toString() === item.fundingTypeCD.toString());
          var fundingsrcObj = this.fundingSource.find(x => x.value.toString() === item.fundingSrcCD.toString());
          var fundingCategoryObj = this.fundingCategory.find(x => x.value.toString() === item.categoryId.toString());
          return new FundingGridViewModel(item.encumbranceId, item.projectId, item.encubranceTypeCD, item.fundingSrcCD, fundingsrcObj.text, item.fundingTypeCD, fundingTypeObj.text, item.categoryId, fundingCategoryObj.text, item.fiscalYr, item.encubrancePONum, item.amount, item.userId, item.entryDate, item.activeInd, item.docCnt, item.notes)
        }
      });
      this.data = process(this.gridData, this.state);
    }
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

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.data = process(this.gridData, this.state);
  }
}
