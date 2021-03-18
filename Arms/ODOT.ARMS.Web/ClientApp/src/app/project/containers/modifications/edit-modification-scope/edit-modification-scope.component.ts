import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, NgModule, ViewChild, Output, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromProjectTypereducer from "../../../state/reducers/projecttype.reducers";
import * as fromProjectforDDreducer from '../../../state/reducers/projectForDD.reducer';
import * as fromProjectreducer from "../../../state/reducers/project.reducer";
import { ModificationsBaseComponent } from '../../../component/modifications/modifications-base/modifications-base.component';
import { ComponentToDeactivate } from '../../../../shared/models/component-to-deactivate';

@Component({
  selector: 'edit-modification-scope',
  templateUrl: './edit-modification-scope.component.html',
  styles: [
  ],
})

export class EditModificationScopeComponent extends ModificationsBaseComponent implements OnInit, ComponentToDeactivate {
  public modAbstractForm: FormGroup;
  public buffer: { 'newVal': string, 'oldVal': string } = { 'newVal': '', 'oldVal': '' };

  constructor(public router: Router, public fb: FormBuilder, public route: ActivatedRoute, public projectStore: Store<fromProjectreducer.ProjectState>, public projectTypeStore: Store<fromProjectTypereducer.ProjectTypeState>, public projectForDDStore: Store<fromProjectforDDreducer.ProjectState>) {
    super();
    this.modAbstractForm = this.fb.group({
      objectiveTxt: ['']
    });

  }

  ngOnInit(): void {
  }

  public isComponentDirty(): boolean {
    return this.modAbstractForm.dirty;
  }


  public cancel() {
    if (this.modAbstractForm.get('objectiveTxt').dirty) {
      this.modAbstractForm.get('objectiveTxt').setValue(this.buffer.oldVal);
      this.buffer.newVal = this.buffer.oldVal;
      this.modAbstractForm.get('objectiveTxt').markAsPristine();
    }
  }

  public change(val: any) {
    this.buffer.newVal = val;
  }

  public save() {
    //if (super.save()) {
    //  this.buffer.oldVal = this.projectEditForm.get('objectiveTxt').value;
    //  this.buffer.newVal = this.buffer.oldVal;
    //  this.buffer
    //  return true;
    //}
    //else {
      return false;
    //}
  }

}
