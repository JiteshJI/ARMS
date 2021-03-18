import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Deliverable } from '../../models/custom-deliverable';
import { ProjectDeliverableList } from '../../models/projectInfo';

@Component({
  selector: 'app-prj-deliverables',
  templateUrl: './prj-deliverables.component.html',
  styles: [
  ]
})
export class PrjDeliverablesComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.prjDeliverablesForm = this.fb.group({
      projectDeliverablesList: new Array < ProjectDeliverableList>()
    });
  }
  @Input() allDeliverables: Deliverable[];
  @Input() ProjectDeliverables: ProjectDeliverableList[];
  @Input() editedDeliverable: Deliverable;
  @Input() addedDeliverable: Deliverable;
  @Output() setcustomDeliverableDialog = new EventEmitter<boolean>();
  @Output() saveProjectDeliverables = new EventEmitter<ProjectDeliverableList[]>();
  public prjDeliverablesForm: FormGroup;

  ngOnInit(): void {
  console.log(this.ProjectDeliverables);
  this.prjDeliverablesForm.setValue({projectDeliverablesList: this.ProjectDeliverables});

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allDeliverables'] && this.allDeliverables) {
      console.log(this.allDeliverables);
    }

    if (changes['editedDeliverable'] && this.editedDeliverable) {
      console.log(this.editedDeliverable);
      const Index = this.ProjectDeliverables.findIndex(deliverable => deliverable.deliverableId === +this.editedDeliverable.deliverableId);
      this.ProjectDeliverables[Index].deliverableTxt = this.editedDeliverable.deliverableTxt;
      console.log(this.ProjectDeliverables);
    }
  }
  handleDeliverablesChange(deliverableList: any[]) {
    console.log(deliverableList);
    //this.setProjectDeliverableList(deliverableList);
  }

}
