import { Component, OnInit } from '@angular/core';
import { ModificationsBaseComponent } from '../modifications-base/modifications-base.component';
import { UploadEvent, FileInfo } from '@progress/kendo-angular-upload';
import { fileservice } from '../../../../shared/services/files.services';

@Component({
  selector: 'modifications-uploads',
  templateUrl: './modifications-uploads.component.html',
  styles: [
  ],
})
export class ModificationsUploadsComponent extends ModificationsBaseComponent implements OnInit {

  public maxChars: number = 255;
  public uploadSaveUrl = 'saveUrl'; // Has to represent an actual API endpoint.
  public myFiles: Array<FileInfo> = new Array<FileInfo>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  uploadEventHandler(e: UploadEvent) {
    /*
    this._kendoFiles = e.files;
    this._filesSet = new Set<File>();
    this.sendable = new FormData();
    for (var i = 0; i < this._kendoFiles.length; i++) {
      let rawFile: File = this._kendoFiles[i].rawFile;
      this.sendable.append('file' + this._kendoFiles[i].uid, rawFile, this._kendoFiles[i].name);
      this._filesSet.add(rawFile);

      this.UploadedDocumentList.push({
        eventUploadId: this._kendoFiles[i].uid,
        eventId: this.EventAddEditForm.value.eventId,
        documentName: rawFile.name,
        fileSize: rawFile.size,
        privateInd: 'A',
        activeInd: 'A',
        userId: 'Sai',
        uploadDate: new Date(),
        extension: '.' + this._kendoFiles[i].name.split('.')[1]
      });
      this.EventAddEditForm.patchValue(
        {
          eventUploadForDD: this.UploadedDocumentList
        }
      );
    }
    */
  }

}
