import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { EnvService } from '../../../core/services/env.service';
import { EventUpload } from '../../../project/models/event-upload';
import { SuccessEvent } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-prj-upload-save',
  templateUrl: './prj-upload-save.component.html',
  styles: [
  ]
})
export class PrjUploadSaveComponent implements OnInit {

  @Input() dlgTitle: string;
  @Input() projAltId: string;
  @Input() srcId: string;//ProjId
  @Input() uploadPrjDlgStatus: boolean; 
  @Output() updateUploadFiles = new EventEmitter<Array<EventUpload>>();
  @Output() setUploadDialogStatus = new EventEmitter<boolean>();//Not used

  get uploadSaveUrl(): string {
    return `${this.env.apiUrl}/projects/${this.projAltId}/uploads/${this.srcId}/upload`;
  }

  constructor(private env: EnvService) { }

  ngOnInit(): void {}

  public onSuccessEvent(e: SuccessEvent) {
    // what I should emit an event to container a
    if (e.operation === 'upload') {
      let uploadedFiles: Array<EventUpload> = e.response.body;
      this.updateUploadFiles.emit(uploadedFiles);
    }
  }

}
