import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from "rxjs/operators";
import * as fromCore from '../../../core/state/reducers';
import * as fromProjectInfo from '../../state/reducers/project-info.reducer';
import { LookupItem } from '../../../shared/models/lookup-item';
import { EventUpload, UploadSrc } from '../../models/event-upload';
import { FundingRaw } from '../../models/fundings-raw';
import { addFunding, setSaveFundingDialogStatus, setSelectedFunding, setSelectedUploadFunding, updateFunding, updateFundingDocCount } from '../../state/actions/edit-funding-page.actions';
import { DownloadFileById, setSelectedUploadSrc, setUploadDialogStatus, updateUpload, updateUploadFileList } from '../../state/actions/file-uploads.actions';
import * as fromProject from "../../state/reducers";
import * as fromFunding from "../../state/reducers/edit-fin-funding-page.reducer";
import * as fromFundingReducer from "../../state/selector/project.funding.selectors";
import * as fundingSelector from "../../state/selector/project.funding.selectors";
import { ProjectInfo } from '../../models/projectInfo';
import * as fromProjectSelectors from '../../state/selector/project-info.selectors';
import * as fromProjectInfoActions from '../../state/actions/project-info.actions';
import { filter, map } from '@progress/kendo-data-query/dist/npm/transducers';
import { Budget } from '../../models/budget';
import * as fromProjectBudgetSelectors from '../../state/selector/project-budget.selectors';
import * as fromProjectBudget from '../../state/reducers/edit-project-budget-page.reducer';

@Component({
  selector: 'app-edit-fin-funding-page',
  templateUrl: './edit-fin-funding-page.component.html',
  styles: [
  ]
})

export class EditFinFundingPageComponent implements OnInit {
  public projectId: string;
  public fundingType$: Observable<LookupItem[]>;
  public fundingSource$: Observable<LookupItem[]>;
  public saveFundingDialogStatus$: Observable<boolean>;
  public uploadDialogStatus$: Observable<boolean>;
  public selectUploadSrc$: Observable<UploadSrc>;
  public uploads$: Observable<EventUpload[]>;
  public selectUploadFunding$: Observable<FundingRaw>;
  public selectedFunding$: Observable<FundingRaw>;
  public projAltId$: Observable<string>;
  public projAltId: string;
  public ProjectInfo$: Observable<ProjectInfo>;
  public budgets$: Observable<Budget[]>;

  public fundings$: any;
  public fundingCategory$: Observable<LookupItem[]>;
  fundingData$: any;
    contingencyAmount: number;
  constructor(public coreStore: Store<fromCore.State>, public projectStore: Store<fromProject.State>, private projInfoStore: Store<fromProjectInfo.ProjectInfoState>,
    public fundingStore: Store<fromFunding.State>, public projectBudgetStore: Store<fromProjectBudget.State>) { }
  ngOnInit(): void {
    this.projectStore.select(fromProject.getProjectId).pipe(take(1)).subscribe(value => this.projectId = value);

    this.projectBudgetStore.pipe(select(fromProjectBudgetSelectors.getBudgetByProjectId)).subscribe(data => {
      this.contingencyAmount = data.find(e => e.budgetCategory == 43)?.orgCostSharing;
    });

    this.fundingStore.pipe(select(fromFundingReducer.getAllFundings)).subscribe(data => {
      this.fundings$ = data.filter(e => e.categoryId != 189),
        this.fundingData$ = data.filter(e => e.categoryId != 187 && e.categoryId != 188);
    });


    this.selectUploadFunding$ = this.fundingStore.select(fromFundingReducer.getSelectedUploadFunding);
    this.projAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    this.projAltId$.pipe(take(1)).subscribe(value => this.projAltId = value);
    this.selectUploadSrc$ = this.projectStore.select(fromProject.getSelectedUploadSrc);
    this.uploads$ = this.projectStore.select(fromProject.getAllUploads);
    this.saveFundingDialogStatus$ = this.projectStore.select(fundingSelector.getSaveFundingDialogStatus);
    //this.projectStore.select(fromProject.getProjectId).pipe(take(1)).subscribe(value => this.projectId$ = value);
    this.ProjectInfo$ = this.projInfoStore.select(fromProjectSelectors.selectProjInfoByAltId(this.projAltId));
    this.fundingType$ = this.coreStore.select(fromCore.getFundingType);
    this.fundingSource$ = this.coreStore.select(fromCore.getFundingSource);
    this.fundingCategory$ = this.coreStore.select(fromCore.getFundingCategory);
    this.uploadDialogStatus$ = this.projectStore.select(fromProject.getUploadEventDialogStatus);
    this.selectedFunding$ = this.fundingStore.select(fromFundingReducer.getSelectedFunding);

  }
  onSelectFunding(funding: FundingRaw): void {
    

    if (funding === undefined) {
      this.fundingStore.dispatch(setSelectedFunding({ Funding: funding }));
    }
    else {
      var result = new FundingRaw();
      this.fundingStore.dispatch(setSelectedFunding({
        Funding: {
          activeInd: funding.activeInd, docCnt: funding.docCnt, encubranceTypeCD: funding.encubranceTypeCD, entryDate: funding.entryDate, fiscalYr: funding.fiscalYr, amount: funding.amount, fundingSrcCD: funding.fundingSrcCD, fundingTypeCD: funding.fundingTypeCD, encubrancePONum: funding.encubrancePONum, encumbranceId: funding.encumbranceId, notes: funding.notes, projectId: funding.projectId, userId: funding.userId, categoryId: funding.categoryId
        }
      }));
    }
  }
  onSetSaveFundingDialogStatus(dialogStatus: boolean): void {
    this.fundingStore.dispatch(setSaveFundingDialogStatus({ status: dialogStatus }));
  }
  onSetUploadDialogStatus(dialogStatus: boolean): void {
    this.projectStore.dispatch(setUploadDialogStatus({ status: dialogStatus }));
  }
  onUploadFilesChange(userFiles: Array<any>): void {
    
    this.projectStore.dispatch(updateUploadFileList({ files: userFiles }));//Force the file list to reload
    // Is this a correct way of doing this?????
    this.selectUploadFunding$.pipe(take(1)).subscribe(ev => {
      let updateCnt = Object.assign({}, ev);
      updateCnt.docCnt += userFiles.length;
      this.fundingStore.dispatch(updateFundingDocCount({ Funding: updateCnt }));//Force a new doc count
    });
  }
  onDownload(downloadIds: EventUpload): void {
    this.projectStore.dispatch(DownloadFileById({ projAltId: downloadIds.projAltId, srcId: downloadIds.eventSrc, uploadId: downloadIds.eventUploadId }));
  }
  onUpdateFileUpload(upload: EventUpload): void {
    this.projectStore.dispatch(updateUpload({ upload: upload }));
  }

  onSelectUploadDoc(funding: FundingRaw): void {
    this.projectStore.dispatch(setSelectedUploadFunding({ Funding: funding }));//Keep track of this to update the document count
    this.projectStore.dispatch(setSelectedUploadSrc({ src: new UploadSrc(this.projAltId, funding.encumbranceId) }));
  }
  onSaveFunding(Funding: FundingRaw): void {
    console.log('onSaveFunding - container', Funding.encumbranceId);
    if (Funding.encumbranceId) {
      this.fundingStore.dispatch(updateFunding({ Funding: Funding }));
    } else {
      Funding.projectId = this.projectId;
      Funding.entryDate = new Date();
      Funding.encubranceTypeCD = 0;
      this.fundingStore.dispatch(addFunding({ Funding: Funding }));
    }
    this.fundingStore.dispatch(setSaveFundingDialogStatus({ status: false }));//Close the form
  }
  public saveProjInfo(projectInfo: ProjectInfo) {
    this.projInfoStore.dispatch(fromProjectInfoActions.editSelectedProject({ project: projectInfo }));
  }
}
