import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { EventUpload, PrivateFile } from '../../models/event-upload';
import { DialogRef, DialogContentBase, DialogService, DialogCloseResult, DialogResult } from '@progress/kendo-angular-dialog';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prj-uploads-list',
  templateUrl: './prj-uploads-list.component.html',
  styles: [
  ]
})
export class PrjUploadsListComponent implements OnInit {
  @Input() uploads: EventUpload[] = [];
  @Output() onDelete = new EventEmitter<string>();
  @Output() download = new EventEmitter<EventUpload>();
  @Output() updateFile = new EventEmitter<EventUpload>();
  @Output() openUploadDlg = new EventEmitter<boolean>();

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }


  public fileUploadClick(isNew: boolean) {
    //this.isNew = isNew;
    //this.UploadDialogOpened = true;
  }

  public delete(eventUploadId: string): void {
    const dialog: DialogRef = this.dialogService.open({
      title: 'Please confirm',
      content: 'Are you sure you want to delete this File?',
      actionsLayout: 'normal',
      actions: [
        { text: 'No', width: 20 },
        { text: 'Yes', primary: true }
      ],
      width: 450,
      height: 200,
      minWidth: 250
    });


    var test = dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        return false;
      } else if (result.text === 'Yes') {
        this.onDelete.emit(eventUploadId);
      }
    });

      
  }

  public isPrivate(data: any): boolean {
    return (data.privateInd === 'Y');
  }

  public flipPrivate(fileUpload: EventUpload): void {
    const data = Object.assign({}, fileUpload);
    data.privateInd = PrivateFile[PrivateFile[data.privateInd] ^ 1];//a little xor magic to flip between Y and N
    this.updateFile.emit(data);
  }

}
