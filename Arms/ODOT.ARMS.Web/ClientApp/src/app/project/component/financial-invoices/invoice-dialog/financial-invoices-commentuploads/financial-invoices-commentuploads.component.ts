import { Component, OnInit, Input } from '@angular/core';
import { ChunkSettings, FileState, SelectEvent, UploadEvent, FileInfo } from '@progress/kendo-angular-upload';
//import { EventsRaw, IEvents, IEventUpload, EventUpload } from '../../../../models/events';
import { EventUpload } from '../../../../models/event-upload';
import { fileservice } from '../../../../../shared/services/files.services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpInterceptor, HttpResponse, HttpEventType, HttpRequest, HttpHandler, HttpProgressEvent, HttpEvent, HttpClient } from '@angular/common/http';

@Component({
  selector: 'financial-invoices-commentuploads',
  templateUrl: './financial-invoices-commentuploads.component.html',
  styles: [
  ],
})

export class FinancialInvoicesCommentuploadsComponent implements OnInit {
  public activeTab: string = "upload";
  public maxChars = 500;
  public UploadedDocumentList: Array<EventUpload> = new Array<EventUpload>();
  private _kendoFiles: FileInfo[];
  private _filesSet: Set<File>;
  public sendable;
  public myFiles: Array<FileInfo>;
  @Input() parentForm: FormGroup;//Pass the parents form group to the child
  public uploadSaveUrl = 'saveUrl'; // Has to represent an actual API endpoint.

  constructor(public router: Router, public fb: FormBuilder, public route: ActivatedRoute, private http: HttpClient, public fielserviceExt: fileservice) { }

  ngOnInit(): void {
  }

  public getIconFilePath(fileExtension: string): string {
    var ext = fileExtension.split('.')[1];
    return this.fielserviceExt.GetFileByExtension(ext);
  }

  /*
  uploadEventHandler(e: UploadEvent) {
    this._kendoFiles = e.files;
    this._filesSet = new Set<File>();
    this.sendable = new FormData();
    for (var i = 0; i < this._kendoFiles.length; i++) {
      let rawFile: File = this._kendoFiles[i].rawFile;
      this.sendable.append('file' + this._kendoFiles[i].uid, rawFile, this._kendoFiles[i].name);
      this._filesSet.add(rawFile);

      this.UploadedDocumentList.push({
        eventUploadId: this._kendoFiles[i].uid,
        eventSrc: 'boogertime',//this.EventAddEditForm.value.eventId,
        docName: rawFile.name,
        fileSize: rawFile.size,
        privateInd: 'A',
        activeInd: 'A',
        userId: 'Sai',
        uploadDate: new Date()//,
        //extension: '.' + this._kendoFiles[i].name.split('.')[1]
      });
      //this.EventAddEditForm.patchValue(
      //  {
      //    eventUploadForDD: this.UploadedDocumentList
      //  }
      //);
    }
  }
  */

  public getChecked(uid) {
    const updatedArray = Object.assign([], this.UploadedDocumentList);
    var foundIndex = updatedArray.findIndex(e => e.eventUploadId === uid);
    const newArray = updatedArray.map(a => ({ ...a }));
    newArray[foundIndex].privateInd = updatedArray[foundIndex].privateInd === "I" ? "A" : "I";
    this.UploadedDocumentList = newArray;
  }

  public remove(upload, uid: string) {
    upload.removeFilesByUid(uid);
    const updatedArray = Object.assign([], this.UploadedDocumentList);
    var foundIndex = updatedArray.findIndex(e => e.eventUploadId === uid);

    const newArray = updatedArray.map(a => ({ ...a }));
    newArray[foundIndex].activeInd = "I";

    this.UploadedDocumentList = newArray;
    //this.EventAddEditForm.patchValue(
    //  {
    //    eventUploadForDD: newArray
    //  }
    // );
  }

}
