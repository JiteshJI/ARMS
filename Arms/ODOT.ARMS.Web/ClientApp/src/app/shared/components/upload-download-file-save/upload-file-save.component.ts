import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SuccessEvent } from '@progress/kendo-angular-upload';
import { EnvService } from '../../../core/services/env.service';
//import { OAuthStorage } from 'angular-oauth2-oidc';
import { EventUpload, PrivateFile} from '../../../project/models/event-upload';

@Component({
  selector: 'app-upload-file-save',
  templateUrl: './upload-file-save.component.html',
  styles: [
  ]
})


export class UploadFileSaveComponent implements OnInit {

  public checked = false;

  @Input() dlgTitle: string;
  @Input() projAltId: string;
  @Input() srcId: string;
  @Input() uploadFiles: Array<EventUpload>;
  @Output() setUploadEventDialogStatus = new EventEmitter<boolean>();//Not used
  @Input() uploadDialogStatus: boolean;
  @Output() updateUploadFiles = new EventEmitter<Array<EventUpload>>();
  @Output() download = new EventEmitter<EventUpload>();
  @Output() updateFile = new EventEmitter<EventUpload>();

  get uploadSaveUrl(): string {
    return `${this.env.apiUrl}/projects/${this.projAltId}/uploads/${this.srcId}/upload`;
  }

  public data: any = {
    files: []
  };

  constructor(private env: EnvService) { }

  ngOnInit(): void { }

  public onSuccessEvent(e: SuccessEvent) {
    // what I should emit an event to container a
    if (e.operation === 'upload') {
      let uploadedFiles: Array<EventUpload> = e.response.body;
      this.updateUploadFiles.emit(uploadedFiles);
    }
  }

  public isPrivate( data: any): boolean {
    return (data.privateInd === 'Y');
  }

  public flipPrivate(fileUpload: EventUpload): void {
    const data = Object.assign({}, fileUpload);
    data.privateInd = PrivateFile[PrivateFile[data.privateInd] ^ 1];//a little xor magic to flip between Y and N
    this.updateFile.emit(data);
  }

}
