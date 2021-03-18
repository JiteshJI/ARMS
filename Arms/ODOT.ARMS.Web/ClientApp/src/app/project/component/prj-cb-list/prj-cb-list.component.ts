import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { ControllingBoardRaw } from '../../models/cb-raw';
import { LookupItem } from '../../../shared/models/lookup-item';
import { process, State, SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-prj-cb-list',
  templateUrl: './prj-cb-list.component.html',
  styles: [
  ]
})
export class PrjCbListComponent implements OnInit {
  @Input() controllingBoardList: ControllingBoardRaw[] = [];
  @Input() cbCategoryItems: LookupItem[];//
  @Input() cbTypeItems: LookupItem[];//
  @Input() cbStatusItems: LookupItem[];//
  @Output() selectCB = new EventEmitter<ControllingBoardRaw>();
  @Output() selectCBUpload = new EventEmitter<ControllingBoardRaw>();//test to be removed


  constructor() { }

  ngOnInit(): void {
  }

  public rowCallback = (context: RowClassArgs) => {
    if ((context.dataItem.activeInd === 'I') || (context.dataItem.activeInd === 'C')) {
      return {
        deleteEven: true,
        deleteOdd: true
      };
    }
  }

  public sort: SortDescriptor[] = [{
    field: 'activeInd',
    dir: 'asc'
  }];

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
  }

  public getCBCategoryDescription(id: any): string {
    return LookupItem.getTxtById(id, this.cbCategoryItems);
  }

  public getCBTypeDescription(id: any): string {
    return LookupItem.getTxtById(id, this.cbTypeItems);
  }

  public getCBStatusDescription(id: any): string {
    return LookupItem.getTxtById(id, this.cbStatusItems);
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
