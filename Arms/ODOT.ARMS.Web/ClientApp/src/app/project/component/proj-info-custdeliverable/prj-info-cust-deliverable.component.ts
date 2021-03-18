import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import { Deliverable } from '../../models/custom-deliverable';
import { BooleanPipe } from '../../../shared/pipes/boolean.pipe';


@Component({
  selector: 'app-prj-info-cust-deliverable',
  templateUrl: './prj-info-cust-deliverable.component.html',
})

export class PrjInfoCustDeliverableComponent implements OnInit {
  @Input() custDeliverableDialogStatus: boolean;
  @Input() customDeliverables: Deliverable[];
  @Output() saveCustDeliverable = new EventEmitter<Deliverable>();
  @Output() editCustDeliverable = new EventEmitter<Deliverable>();
  @Output() delCustDeliverable = new EventEmitter<Deliverable>();
  @Output() setcustomDeliverableDialog = new EventEmitter<BooleanPipe>();
  public group: FormGroup;
  private editedRowIndex: number;
  public prjCustDeliverable: FormGroup;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    console.log('executing ng onit for dialog');
    console.log(this.customDeliverables);
  }

  public close() {
    this.custDeliverableDialogStatus = false;
  }

  public onStateChange(state: State) {
    this.gridState = state;
    console.log(state);
  }

  public cancel({ sender, rowIndex }) {
    console.log('cancel triggered');
    // close the editor for the given row
    this.closeEditor(sender, rowIndex);
  }

  public add({ sender }) {
    this.closeEditor(sender);
    console.log('add triggered');
    // define all editable fields validators and default values
    this.prjCustDeliverable = this.fb.group({
      projectDeliverableId: [null],
      projectId: [null],
      deliverableId: [null],
      deliverableTxt: [''],
      projAltId: [''],
      deliverableType: [''],
      activeInd: ['A'],
      userId: ['']
    });
    // show the new row editor, with the `FormGroup` build above
    sender.addRow(this.prjCustDeliverable);
  }

  public edit({ sender, rowIndex, dataItem }) {
    console.log('edit triggered');
    this.closeEditor(sender);
    this.prjCustDeliverable = this.fb.group({
      projectDeliverableId: [dataItem.projectDeliverableId],
      projectId: [dataItem.projectId],
      deliverableId: [dataItem.deliverableId],
      deliverableTxt: [dataItem.deliverableTxt],
      projAltId: [dataItem.projAltId],
      activeInd: [dataItem.activeInd],
      deliverableType: [dataItem.deliverableType],
      userId: [dataItem.userId]
    });
    this.editedRowIndex = rowIndex;
    // put the row in edit mode, with the `FormGroup` build above
    sender.editRow(rowIndex, this.prjCustDeliverable);
  }

  public remove({ dataItem }) {
    console.log('remove triggered');
    // remove the current dataItem from the current data source,
    this.delCustDeliverable.emit(dataItem);
    console.log(dataItem);
  }

  private closeEditor( grid, rowIndex = this.editedRowIndex) {
    console.log('close triggered');
    // close the editor, that is, revert the row back into view mode
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.prjCustDeliverable = undefined;
  }

  public save({ sender, rowIndex, formGroup, isNew }) {
    console.log('save triggered');
    const deliverable: Deliverable = formGroup.value;
    console.log(isNew);
    if (isNew) {
    this.saveCustDeliverable.emit(deliverable);
    } else {
    this.editCustDeliverable.emit(deliverable);
    }
    // close the editor, that is, revert the row back into view mode
    sender.closeRow(rowIndex);
  }

}
