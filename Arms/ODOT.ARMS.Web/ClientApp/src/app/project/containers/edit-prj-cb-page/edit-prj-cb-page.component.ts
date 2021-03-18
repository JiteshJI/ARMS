import { Component, OnInit } from '@angular/core';
import { ControllingBoardRaw } from '../../models/cb-raw';
import { UploadSrc, EventUpload } from '../../models/event-upload';
import { LookupItem } from '../../../shared/models/lookup-item';
import { Observable } from 'rxjs';
import { map, tap, catchError, switchMap, take, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromCore from '../../../core/state/reducers';
import * as fromProject from "../../state/reducers";
import { Console } from 'console';
import { setSelectedCB, setSelectedUploadCB, updateCB, addCB, setSaveCBDialogStatus, updateCBDocCount} from '../../state/actions/edit-prj-cb-page.actions';
import { setUploadDialogStatus, setSelectedUploadSrc, updateUploadFileList, DownloadFileById, updateUpload } from '../../state/actions/file-uploads.actions';

@Component({
  selector: 'app-edit-prj-cb-page',
  templateUrl: './edit-prj-cb-page.component.html',
  styles: [
  ]
})
export class EditPrjCbPageComponent implements OnInit {
  public projectId: string;//
  public projAltId$: Observable<string>;//
  public projAltId: string;//
  public controllingBoardList$: Observable<ControllingBoardRaw[]>;//
  public selectUploadSrc$: Observable<UploadSrc>;//
  public selectUploadCB$: Observable<ControllingBoardRaw>;//
  public uploads$: Observable<EventUpload[]>;
  public selectedCB$: Observable<ControllingBoardRaw>;

  public cbCategoryItems$: Observable<LookupItem[]>;
  public cbTypeItems$: Observable<LookupItem[]>;
  public cbStatusItems$: Observable<LookupItem[]>;
  public saveCBDialogStatus$: Observable<boolean>;
  public uploadDialogStatus$: Observable<boolean>;
  public uploads: any;



  constructor(public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>) { }

  ngOnInit(): void {
    this.projectStore.select(fromProject.getProjectId).pipe(take(1)).subscribe(value => this.projectId = value);
    this.projAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    this.projAltId$.pipe(take(1)).subscribe(value => this.projAltId = value);

    this.controllingBoardList$ = this.projectStore.select(fromProject.getAllCBs);
    this.cbCategoryItems$ = this.coreStore.select(fromCore.getCBCategoryItems);
    this.cbTypeItems$ = this.coreStore.select(fromCore.getCBtypeItems);
    this.cbStatusItems$ = this.coreStore.select(fromCore.getCBStatusItems);
    this.saveCBDialogStatus$ = this.projectStore.select(fromProject.getSaveCBDialogStatus); 

    this.selectUploadSrc$ = this.projectStore.select(fromProject.getSelectedUploadSrc);
    this.selectUploadCB$ = this.projectStore.select(fromProject.getSelectedUploadCB);

    this.uploadDialogStatus$ = this.projectStore.select(fromProject.getUploadEventDialogStatus);
    this.uploads$ = this.projectStore.select(fromProject.getAllUploads);

    this.selectedCB$ = this.projectStore.select(fromProject.getSelectedCB);
  }

  public onSaveControllingBoard(cb: ControllingBoardRaw): void {
    console.log('onSaveControllingBoard - container', cb.controllingBoardId);
    if (cb.controllingBoardId) {
      this.projectStore.dispatch(updateCB({ 'cb': cb }));
    } else {
      cb.projectId = this.projectId;
      this.projectStore.dispatch(addCB({ 'cb': cb }));
    }
    this.projectStore.dispatch(setSaveCBDialogStatus({ status: false }));//Close the form
  }

  public onSetSaveCBDialogStatus(dialogStatus: boolean): void {
    this.projectStore.dispatch(setSaveCBDialogStatus({ status: dialogStatus }));
  }

  public onSelectCB(cb: ControllingBoardRaw): void {
    console.info('onSelectCB');
    console.info(cb);
    this.projectStore.dispatch(setSelectedCB({ 'cb': cb }));
  }

  public onSelectUploadDoc(cb: ControllingBoardRaw) {
    console.info('onSelectUploadDoc');
    this.projectStore.dispatch(setSelectedUploadCB({ 'cb': cb }));//Keep track of this to update the document count
    this.projectStore.dispatch(setSelectedUploadSrc({ src: new UploadSrc(this.projAltId, cb.controllingBoardId) }));
  }

  public onDownload(downloadIds: EventUpload): void {
    this.projectStore.dispatch(DownloadFileById({ projAltId: downloadIds.projAltId, srcId: downloadIds.eventSrc, uploadId: downloadIds.eventUploadId }));
  }

  public onUpdateFileUpload(upload: EventUpload): void {
    this.projectStore.dispatch(updateUpload({ upload: upload }));
  }

  public onUploadFilesChange(userFiles: Array<any>): void {

    this.projectStore.dispatch(updateUploadFileList({ files: userFiles }));//Force the file list to reload
    // Is this a correct way of doing this?????
    this.selectUploadCB$.pipe(take(1)).subscribe(ev => {
      let updateCnt = Object.assign({}, ev);//Maky Maky copy copy
      updateCnt.docCnt += userFiles.length; //Add Add number
      this.projectStore.dispatch(updateCBDocCount({ cb: updateCnt }));//Force a new doc count
    });
  }

  public onSetUploadDialogStatus(dialogStatus: boolean): void {
    this.projectStore.dispatch(setUploadDialogStatus({ status: dialogStatus }));
  }

}
