import { Component, OnInit } from '@angular/core';
import { InvoiceRaw, BudgetCatDDRaw } from '../../models/invoice-raw';
import { LookupItem } from '../../../shared/models/lookup-item';
import { PhaseRaw } from '../../models/phase-raw';
import { EncumbranceRaw } from '../../models/encumbrance-raw';
import { ProjectBalanceRaw } from '../../models/project-balance-raw';
import { Observable } from 'rxjs';
import { map, tap, catchError, switchMap, take, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromCore from '../../../core/state/reducers';
import { UploadSrc, EventUpload } from '../../models/event-upload';
import * as fromProject from '../../state/reducers';
//import * as fromInvoice from '../../state/reducers/edit-fin-invoice-page.reducer';
import * as fromInvoiceSelector from '../../state/selector/edit-fin-invoice-page.selectors';
import { setSelectedInvoice, setSelectedUploadInvoice, updateInvoiceDocCount, setSaveInvoiceDialogStatus, updateInvoice, addInvoice } from '../../state/actions/edit-fin-invoice-page.actions';
import { setUploadDialogStatus, setSelectedUploadSrc, updateUploadFileList, DownloadFileById, updateUpload } from '../../state/actions/file-uploads.actions';

@Component({
  selector: 'app-edit-fin-invoice-page',
  templateUrl: './edit-fin-invoice-page.component.html',
  styles: [
  ]
})
export class EditFinInvoicePageComponent implements OnInit {
  public projectId: string;
  public projAltId$: Observable<string>;
  public projAltId: string;
  public invoices$: Observable<InvoiceRaw[]>;
  public selectUploadSrc$: Observable<UploadSrc>;
  public selectUploadInvoice$: Observable<InvoiceRaw>;
  public uploads$: Observable<EventUpload[]>;
  public selectedInvoice$: Observable<InvoiceRaw>;
  public phaseList$: Observable<PhaseRaw[]>;
  public saveInvoiceDialogStatus$: Observable<boolean>;
  public uploadDialogStatus$: Observable<boolean>;
  public fundingStatuses$: Observable<LookupItem[]>;
  public budgetCategories$: Observable<BudgetCatDDRaw[]>;
  public encumbranceSummary$: Observable<EncumbranceRaw[]>;
  public projectBalances$: Observable<ProjectBalanceRaw>;

  constructor(public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>//,
    //public invoiceStore: Store<fromInvoice.InvoiceState>
  ) { }

  ngOnInit(): void {
    this.projectStore.select(fromProject.getProjectId).pipe(take(1)).subscribe(value => this.projectId = value);
    this.projAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    this.projAltId$.pipe(take(1)).subscribe(value => this.projAltId = value);
    this.invoices$ = this.projectStore.select(fromInvoiceSelector.getAllInvoices);

    this.selectUploadSrc$ = this.projectStore.select(fromProject.getSelectedUploadSrc);
    this.selectUploadInvoice$ = this.projectStore.select(fromInvoiceSelector.selectUploadInvoice);
    this.uploads$ = this.projectStore.select(fromProject.getAllUploads);

    this.selectedInvoice$ = this.projectStore.select(fromInvoiceSelector.selectSelectedInvoice);

    this.phaseList$ = this.projectStore.select(fromInvoiceSelector.selectPhases);
    this.saveInvoiceDialogStatus$ = this.projectStore.select(fromInvoiceSelector.selectSaveDialogStatus);

    this.uploadDialogStatus$ = this.projectStore.select(fromProject.getUploadEventDialogStatus);

    this.fundingStatuses$ = this.coreStore.select(fromCore.getFundingStatus);
    this.budgetCategories$ = this.projectStore.select(fromInvoiceSelector.selectBudgetCategories);
    this.projectBalances$ = this.projectStore.select(fromInvoiceSelector.selectProjectBalances);
    this.encumbranceSummary$ = this.projectStore.select(fromInvoiceSelector.selectEncumbranceSummary);
    //this.budgetCategories$ = this.coreStore.select(fromCore.getBudgetCategory);    
  }

  onSelectUploadDoc(inv: InvoiceRaw): void {
    this.projectStore.dispatch(setSelectedUploadInvoice({ invoice: inv }));//Keep track of this to update the document count
    this.projectStore.dispatch(setSelectedUploadSrc({ src: new UploadSrc(this.projAltId, inv.invoiceId) }));
  }

  onUploadFilesChange(userFiles: Array<any>): void {
    this.projectStore.dispatch(updateUploadFileList({ files: userFiles }));//Force the file list to reload
    // Is this a correct way of doing this?????
    this.selectUploadInvoice$.pipe(take(1)).subscribe(ev => {
      let updateCnt = Object.assign({}, ev);//Maky Maky copy
      updateCnt.docCnt += userFiles.length; //Add Add number
      this.projectStore.dispatch(updateInvoiceDocCount({ invoice: updateCnt }));//Force a new doc count
    });
  }

  onSetSaveInvoiceDialogStatus(dialogStatus: boolean): void {
    this.projectStore.dispatch(setSaveInvoiceDialogStatus({ status: dialogStatus }));
  }

  onSetUploadDialogStatus(dialogStatus: boolean): void {
    this.projectStore.dispatch(setUploadDialogStatus({ status: dialogStatus }));
  }

  onDownload(downloadIds: EventUpload): void {
    this.projectStore.dispatch(DownloadFileById({ projAltId: downloadIds.projAltId, srcId: downloadIds.eventSrc, uploadId: downloadIds.eventUploadId }));
  }

  onUpdateFileUpload(upload: EventUpload): void {
    this.projectStore.dispatch(updateUpload({ upload: upload }));
  }

  onSaveInvoice(inv: InvoiceRaw): void {
    console.log('onSaveInvoice - container', inv.invoiceId);
    if (inv.invoiceId) {
      this.projectStore.dispatch(updateInvoice({ invoice: inv }));
    } else {
      inv.projId = this.projectId;
      this.projectStore.dispatch(addInvoice({ invoice: inv }));
    }
    this.projectStore.dispatch(setSaveInvoiceDialogStatus({ status: false }));//Close the form
  }

  onSelectInvoice(inv: InvoiceRaw) {
    console.info("onSelectInvoice");
    this.projectStore.dispatch(setSelectedInvoice({ invoice: inv }));
  }

}
