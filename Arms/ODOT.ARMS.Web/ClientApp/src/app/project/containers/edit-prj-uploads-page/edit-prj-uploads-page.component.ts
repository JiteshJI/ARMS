import { Component, OnInit } from '@angular/core';
import { UploadSrc, EventUpload } from '../../models/event-upload';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromProject from "../../state/reducers";
import * as fromProjectUploads from '../../state/reducers/edit-project-uploads-page.reducer';
import * as fromProjectHeader from '../../state/reducers/project-shell-page.reducer';
import { deletePrjFile, setUploadProjectDialogStatus, updateUploadFileList } from '../../state/actions/edit-project-uploads-page.actions';
import { DownloadFileById, updateUpload } from '../../state/actions/file-uploads.actions';//Should I recycle this or build a new action and call ()

@Component({
  selector: 'app-edit-prj-uploads-page',
  templateUrl: './edit-prj-uploads-page.component.html',
  styles: [
  ]
})

export class EditPrjUploadsPageComponent implements OnInit {
  public uploads$: Observable<EventUpload[]>;
  public projAltId$: Observable<string>;
  public projId$: Observable<string>;
  public uploadPrjDlgStatus$: Observable<boolean>;

  constructor(public projectStore: Store<fromProject.State>, public projectHeaderStore: Store<fromProjectHeader.State>, public projectUploadsStore: Store<fromProjectUploads.State>) { }

  ngOnInit(): void {
    this.projId$ = this.projectStore.select(fromProject.getProjectId);
    this.projAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    this.uploads$ = this.projectStore.select(fromProject.getAllProjectUploads);
    this.uploadPrjDlgStatus$ = this.projectStore.select(fromProject.getUploadProjectDialogStatus);
  }

  public onDeleteFile(eventUploadId: string): void {
    this.projectUploadsStore.dispatch(deletePrjFile({ 'eventUploadId' : eventUploadId}));
  }

  public onDownload(downloadIds: EventUpload): void {
    //Check with Alex on this one
    this.projectStore.dispatch(DownloadFileById({ 'projAltId': downloadIds.projAltId, 'srcId': downloadIds.eventSrc, 'uploadId': downloadIds.eventUploadId }));
  }

  public onUpdateFileUpload(upload: EventUpload): void {    
    this.projectStore.dispatch(updateUpload({ upload: upload }));
  }

  public onUploadFilesChange(userFiles: Array<any>): void {
    this.projectStore.dispatch(updateUploadFileList({ files: userFiles }));//Force the file list to reload
  }

  public onSetUploadDialogStatus(dialogStatus: boolean): void {
    this.projectStore.dispatch(setUploadProjectDialogStatus({ status: dialogStatus }));
  }


}
