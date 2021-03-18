import { Component, OnInit } from '@angular/core';
import { ModificationsBaseComponent } from '../modifications-base/modifications-base.component';
import { GridDataResult, DataBindingDirective, DataStateChangeEvent, RowClassArgs, GridItem } from '@progress/kendo-angular-grid';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { kendonotificationservice } from '../../../../shared/services/kendo-notification.service';
import * as fromAgencyreducer from '../../../../agency/state/reducers/agencies.reducer';
import * as fromProjectforDDreducer from '../../../state/reducers/projectForDD.reducer';
import * as fromProjectreducer from '../../../state/reducers/project.reducer';
import * as fromProjectTypereducer from '../../../state/reducers/projecttype.reducers';
//import { PersonnelRaw, Item } from '../../../models/projects';

@Component({
  selector: 'modifications-personnel',
  templateUrl: './modifications-personnel.component.html',
  styles: [
  ],
})
export class ModificationsPersonnelComponent extends ModificationsBaseComponent implements OnInit {

  public data = [{
    PersonnelID: 'randomgoooblygoop',
    ProjID: 'bahbahbah',
    ContactID: 'MoreRandomStuff',
    personNme: 'Ricado Montalban',
    RoleID: 1,
    roleNme: 'Researcher Supreme',
    isLead: 'Y',
    agencyNme: 'Ohio University',
    activeInd: 'A'
  },
  {
    PersonnelID: 'test',
    ProjID: 'bahbahbah',
    ContactID: 'ISEcondTheMotion',
    personNme: 'Freddy Flintstone',
    RoleID: 2,
    roleNme: 'Technical Liason',
    isLead: 'N',
    agencyNme: 'Ohio University',
    activeInd: 'A'
    },
    {
      PersonnelID: 'yahoo',
      ProjID: 'bahbahbah',
      ContactID: 'ItsUnanimus',
      personNme: 'Astro Boyd',
      RoleID: 3,
      roleNme: 'Technical Liason',
      isLead: 'N',
      agencyNme: 'Ohio State University',
      activeInd: 'I'
    }
  ];

  // Do not initially show the Dialog
  public PersonnelDialogOpened = false;
  public isNew = true;
  public personnelForm: FormGroup;

  constructor(public router: Router, public fb: FormBuilder, public route: ActivatedRoute, public projectStore: Store < fromProjectreducer.ProjectState >, public projectTypeStore: Store < fromProjectTypereducer.ProjectTypeState >, public projectForDDStore: Store < fromProjectforDDreducer.ProjectState >, public AgencyStore: Store < fromAgencyreducer.State >, public notificationService: kendonotificationservice) {
    super();

    this.personnelForm = this.fb.group({
      PersonnelID: [''],
      ProjID: [''],
      ContactID: [''],
      RoleID: [],
      IsLeadInd: [''],
      ActiveInd: ['']
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public rowCallback = (context: RowClassArgs) => {
    if (context.dataItem.ActiveInd === 'I') {
      return {
        deleteEven: true,
        deleteOdd: true
      };
    }
  }

  public PersonnelDialogClose(value: string) {
    this.PersonnelDialogOpened = false;
    console.log(value);
  }

  public savePersonnel() {
    this.PersonnelDialogOpened = false;
    //console.log(this.personnelForm.value);
  }

  public onPersonEditClick(obj) {
    this.isNew = false;
    //this.populatePersonnelForm(obj);
    this.PersonnelDialogOpened = true;
    //this.PhaseAddEditDialogOpened = true;
  }

  public onPersonnelAddClick() {
    this.isNew = true;
    //this.populateNewPersonnelForm();
    this.PersonnelDialogOpened = true;
    console.log('Personnel Add button Clicked');
    //this.personnelForm.reset();
  }

}
