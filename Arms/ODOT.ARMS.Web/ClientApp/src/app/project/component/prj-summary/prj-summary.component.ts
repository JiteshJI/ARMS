import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectSummary } from '../../models/project-summary';

@Component({
  selector: 'app-prj-summary',
  templateUrl: './prj-summary.component.html',
  styles: []
})
export class PrjSummaryComponent implements OnInit {

  @Input() currentSummary: ProjectSummary;
  @Output() saveCurrSummary = new EventEmitter<ProjectSummary>();
  public prjCurrSummaryForm: FormGroup;
  maxChars = 500;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.assignSummaryForm(this.currentSummary);
  }

  public assignSummaryForm(currSummary: ProjectSummary) {
    this.prjCurrSummaryForm = this.fb.group({
      summaryTxt: [currSummary.summaryTxt],
      projectAltId: [currSummary.projectAltId],
      projId: [currSummary.projId],
      userId: [currSummary.userId]
    });
  }

   Save() {
     let prjsummary: ProjectSummary;
     prjsummary = this.prjCurrSummaryForm.value;
     this.saveCurrSummary.emit(prjsummary);
  }

  CheckSummTextLength() {
    var length = 0;
    if (this.prjCurrSummaryForm.controls.summaryTxt.value) {
      length = this.prjCurrSummaryForm.controls.summaryTxt.value.length;
    }
    return length;

  }


}



