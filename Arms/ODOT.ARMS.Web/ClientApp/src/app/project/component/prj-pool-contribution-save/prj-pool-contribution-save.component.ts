import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ControllingBoardRaw } from '../../models/cb-raw';
import { LookupItem } from '../../../shared/models/lookup-item';

@Component({
  selector: 'app-prj-cb-save',
  templateUrl: './prj-cb-save.component.html',
  styles: [
  ]
})
export class PrjCbSaveComponent implements OnInit, OnChanges {
  public cbEditForm: FormGroup;
  public maxChars = 255;

  @Input() controllingBoard: ControllingBoardRaw; 
  @Input() cbCategoryItems: LookupItem[];
  @Input() cbtypeItems: LookupItem[];
  @Input() cbStatusItems: LookupItem[];
  @Input() saveCBDialogStatus: boolean;
  @Output() saveControllingBoard = new EventEmitter<ControllingBoardRaw>();
  @Output() setSaveCBDialogStatus = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCB();
  }

  get controllingBoardId(): FormControl { return this.cbEditForm.get('controllingBoardId') as FormControl; }
  get projectId(): FormControl { return this.cbEditForm.get('projectId') as FormControl; }
  get controllingBoardNumber(): FormControl { return this.cbEditForm.get('controllingBoardNumber') as FormControl; }
  get controllingBoardType(): FormControl { return this.cbEditForm.get('controllingBoardType') as FormControl; }
  get controllingBoardStatus(): FormControl { return this.cbEditForm.get('controllingBoardStatus') as FormControl; }
  get controllingBoardDate(): FormControl { return this.cbEditForm.get('controllingBoardDate') as FormControl; }
  get submissionDate(): FormControl { return this.cbEditForm.get('submissionDate') as FormControl; }
  get controllingBoardCategory(): FormControl { return this.cbEditForm.get('controllingBoardCategory') as FormControl; }
  get entryDate(): FormControl { return this.cbEditForm.get('entryDate') as FormControl; }
  get activeInd(): FormControl { return this.cbEditForm.get('activeInd') as FormControl; }
  get publicCommentTxt(): FormControl { return this.cbEditForm.get('publicCommentTxt') as FormControl; }
  get title(): string { return this.controllingBoard ? 'Controlling Board – Add' : 'Controlling Board – Edit'; }

  public loadCB(): void {
    if (this.controllingBoard) {
      this.cbEditForm = this.fb.group({
        controllingBoardId: [this.controllingBoard.controllingBoardId],//
        projectId: [this.controllingBoard.projectId],//
        controllingBoardNumber: [this.controllingBoard.controllingBoardNumber],//
        controllingBoardType: [this.controllingBoard.controllingBoardType],//
        controllingBoardStatus: [this.controllingBoard.controllingBoardStatus],//
        publicCommentText: [this.controllingBoard.publicCommentText],//
        userId: [this.controllingBoard.userId],//Do I need this??
        entryDate: [this.controllingBoard.entryDate],
        activeInd: [this.controllingBoard.activeInd],//
        controllingBoardDate: [this.controllingBoard.controllingBoardDate],
        submissionDate: [this.controllingBoard.submissionDate],
        controllingBoardCategory: [this.controllingBoard.controllingBoardCategory]
      });
    }
    else {
      this.cbEditForm = this.fb.group({
        controllingBoardId: [''],
        projectId: [''],
        controllingBoardNumber: [''],
        controllingBoardType: [null, Validators.required],
        controllingBoardStatus: [null, Validators.required],
        publicCommentText: [''],
        userId: [''],
        entryDate: new Date(),
        activeInd: ['A'],
        controllingBoardDate: new Date(),
        submissionDate: new Date(),
        controllingBoardCategory: [null, Validators.required]
      });
    }
    this.controllingBoardType.markAsTouched();
    this.controllingBoardStatus.markAsTouched();
    this.controllingBoardCategory.markAsTouched();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadCB();
  }

  get f() { return this.cbEditForm.controls; }

  public onSaveCB(): void {
    const updatedCB = Object.assign({}, this.controllingBoard, automapper.map('CBFormModel', 'CBForUpdate', this.cbEditForm.value));
    this.saveControllingBoard.emit(updatedCB);
  }

}
