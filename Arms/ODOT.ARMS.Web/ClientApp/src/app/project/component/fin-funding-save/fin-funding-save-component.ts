import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FileInfo, UploadEvent } from '@progress/kendo-angular-upload';
import { LookupItem } from '../../../shared/models/lookup-item';
import { fileservice } from '../../../shared/services/files.services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FundingRaw } from '../../models/fundings-raw';

@Component({
  selector: 'app-fin-funding-save',
  templateUrl: './fin-funding-save.component.html',
  styles: [
  ]
})
export class FinFundingSaveComponent implements OnInit, OnChanges {
  public fundingForm: FormGroup;
  @Input() saveFundingDialogStatus: boolean;
  @Input() fundingType: LookupItem[];
  @Input() fundingSource: LookupItem[];
  @Input() fundingCategory: LookupItem[];
  @Output() setSaveFundingDialogStatus = new EventEmitter<boolean>();
  @Input() selectedfunding: FundingRaw;
  @Output() saveFunding = new EventEmitter<FundingRaw>();

  public myFiles: Array<FileInfo>;
  constructor(public fielserviceExt: fileservice, private fb: FormBuilder) { }
  get title(): string { return this.selectedfunding ? 'Funding - Add' : 'Funding - Update'; }
  get fundingSrcCD(): FormControl { return this.fundingForm.get('fundingSrcCD') as FormControl; }
  get fundingTypeCD(): FormControl { return this.fundingForm.get('fundingTypeCD') as FormControl; }
  get notes(): FormControl { return this.fundingForm.get('notes') as FormControl; }
  public maxChars = 255;
  ngOnInit(): void {
    this.loadFunding();
  }

  public loadFunding() {
    
    if (this.selectedfunding) {
      this.fundingForm = this.fb.group({
        encumbranceId: [this.selectedfunding.encumbranceId],
        projectId: [this.selectedfunding.projectId], // this is also the phase id for events created in this form
        encubranceTypeCD: [0],
        fundingSrcCD: [this.selectedfunding.fundingSrcCD, Validators.required],
        fundingTypeCD: [this.selectedfunding.fundingTypeCD, Validators.required],
        categoryId: [this.selectedfunding.categoryId, Validators.required],
        fiscalYr: [this.selectedfunding.fiscalYr, Validators.required],
        encubrancePONum: [this.selectedfunding.encubrancePONum],
        amount: [this.selectedfunding.amount, Validators.required],
        userId: [this.selectedfunding.userId],
        entryDate: [this.selectedfunding.entryDate],
        activeInd: [this.selectedfunding.activeInd],
        notes: [this.selectedfunding.notes],
        docCnt: [this.selectedfunding.docCnt]
      });
    }
    else {
      this.fundingForm = this.fb.group({
        encumbranceId: [''], 
        projectId: [null], // this is also the phase id for events created in this form
        encubranceTypeCD: [0],
        fundingSrcCD: [null, Validators.required],
        fundingTypeCD: [null, Validators.required],
        categoryId: [null, Validators.required],
        fiscalYr: [null, Validators.required],
        encubrancePONum: [null],
        amount: [null, Validators.required],
        userId: [null],
        entryDate: new Date(),
        activeInd: ['A'],
        notes: [''],
        docCnt: [0]
      });
    }
  }
  public onSaveFunding(): void {
    const updatedFunding = Object.assign({}, this.selectedfunding, automapper.map('FundingFormModel', 'FundingForUpdate', this.fundingForm.value));
    this.saveFunding.emit(updatedFunding);
  }

  uploadEventHandler(e: UploadEvent) {
  }
  public getIconFilePath(fileExtension: string): string {
    return this.fielserviceExt.GetFileByExtension(fileExtension);
  }
  public remove(upload, uid: string) {
    upload.removeFilesByUid(uid);
  }
  public getChecked(uid) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadFunding();
  }
}
