import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PooledParticipating } from '../../models/pooled-participating';

@Component({
  selector: 'app-fin-pooled-participating-save',
  templateUrl: './fin-pooled-participating-save.component.html'
})
export class FinPooledParticipatingSaveComponent implements OnInit {
  public maxChars = 1000;
  dialogStatus = true;
  public pooledParticipatingForm: FormGroup;
  @Input() pooledParticipating: PooledParticipating;
  @Input() showDialogStatus: boolean;
  @Output() savePooledParticipating = new  EventEmitter<PooledParticipating>();
  public getTitle = (() => this.pooledParticipating ? 'Participating Amounts - Edit' : 'Participating Amounts - Add');
  public min = 1990;
  public max = 2050;

  constructor(private fb: FormBuilder) {
    this.pooledParticipatingForm = this.fb.group({
    fiscalYear: [''],
    amountCommited: [''],
    amountTransferred: [''],
    fundingType: [''],
    fundingSource: [''],
    transferCode: [''],
    transferRequestedDt: [''],
    financeRequestedDt: [''],
    transferReconciliationDt: [''],
    fhwaApprovedDt: [''],
    finalTransferDt: [''],
    leadStateNotificationDt: [''],
    publicCommentText: ['']
    });
  }

  ngOnInit(): void {
    if (this.pooledParticipating) {
    this.pooledParticipatingForm.setValue(this.pooledParticipating);
    }
  }

  setSaveDialogStatus() {
    this.dialogStatus = this.showDialogStatus;
  }

}
