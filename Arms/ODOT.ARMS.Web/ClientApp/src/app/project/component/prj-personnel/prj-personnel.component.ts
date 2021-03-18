import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  GridDataResult,
  DataBindingDirective,
} from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { State } from '@progress/kendo-data-query';
import { ComponentToDeactivate } from '../../../shared/models/component-to-deactivate';
import * as fromPersonnel from '../../state/reducers/personnel.reducer';
import * as fromPersonnelActions from '../../../project/state/actions/personnel.actions';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import * as fromAgencyreducer from '../../../agency/state/reducers/agencies.reducer';
import * as fromProjectforDDreducer from '../../state/reducers/projectForDD.reducer';
import * as fromProjectreducer from '../../state/reducers/project.reducer';
import * as fromProjectTypereducer from '../../state/reducers/projecttype.reducers';
import {  Personnel} from '../../models/personnel';
import { Item, IProject} from '../../models/projects';
import { ContactsDataService } from 'src/app/contacts/services/contactInfo.data.service';
import { ProjectService } from '../../services/project.service';
import * as fromPersonnelSelector from '../../state/selector/personnel.selectors';


@Component({
  selector: 'app-prj-personnel',
  templateUrl: './prj-personnel.component.html',
  styles: [
    '.template { display: inline-block; background: #333; color: #fff; border-radius: 50%; width: 18px; height: 18px; text-align: center; } ',
  ]
})
export class PrjPersonnelComponent implements  OnInit, ComponentToDeactivate {
  public view: Observable<GridDataResult>;
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public isNew = true;

  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public prjID: string;
  public prj: IProject;
  public projectAltId: string;
  public personnelForm: FormGroup;
  public personnelEditForm: FormGroup;
  public personnelAddForm: FormGroup;
  public personnelEditFormDialogOpened: boolean;
  public personnelAddFormDialogOpened: boolean;
  public contactArray: Array<Item>;
  public personnelSendItem: Personnel;
  public personnelUpdateItem: Personnel;
  public project: IProject;
  public personnel: Array<Personnel>;
  public rolesArray: Array<Item>;
  public gridData: any[];
  public gridView: any[];
  public message: any;
  public defaultContactName: Item;
  public defaultActiveInItem: Item = { text: 'Active', value: 'A' };
  public ActiveIn: Array<Item> = [
    { text: 'Active', value: 'A' },
    { text: 'Inactive', value: 'I' }
  ];
  public defaultisLeanInd: Item = { text: 'No', value: 'N' };
  public isLeadInd: Array<Item> = [
    { text: 'Yes', value: 'Y' },
    { text: 'No', value: 'N' }
  ];

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private personnelStore: Store<fromPersonnel.PersonnelState>,
    public route: ActivatedRoute,
    public projectStore: Store<fromProjectreducer.ProjectState>,
    public projectTypeStore: Store<fromProjectTypereducer.ProjectTypeState>,
    public projectForDDStore: Store<fromProjectforDDreducer.ProjectState>,
    public AgencyStore: Store<fromAgencyreducer.State>,
    public notificationService: kendonotificationservice,
    public mycontactsDataService: ContactsDataService,
    public getcontactsService: ProjectService
  ) {
    this.personnelForm = this.fb.group({
      PersonnelID: [''],
      ProjID: [''],
      ContactID: [''],
      ContactName: [''],
      ContactRole: [''],
      AgencyName: [''],
      RoleID: [''],
      IsLeadInd: [''],
      ActiveInd: [''],
      EmailAddress: [''],
      MobilePhone: ['']
    });

    // Do not initially Show the dialog

    this.personnelEditForm = this.fb.group({
      PersonnelID: [''],
      ProjID: [''],
      ContactID: [''],
      ContactName: [''],
      ContactRole: [''],
      AgencyName: [''],
      RoleID: [''],
      IsLeadInd: [''],
      ActiveInd: [''],
      EmailAddress: [''],
      MobilePhone: ['']
    });

    this.personnelAddForm = this.fb.group({
      PersonnelID: [''],
      ProjID: [''],
      ContactID: [''],
      ContactName: [''],
      ContactRole: [''],
      AgencyName: [''],
      RoleID: [''],
      IsLeadInd: [''],
      ActiveInd: [''],
      EmailAddress: [''],
      MobilePhone: ['']
    });
    this.personnelEditFormDialogOpened = false;
    this.personnelAddFormDialogOpened = false;
  }

  public isComponentDirty(): boolean {
    return this.personnelEditForm.dirty;
  }

  ngOnInit() {
    console.log('I am executing personnel ngOnInit');
    this.route.parent.parent.paramMap.subscribe((params: ParamMap) => {
      //console.log(params);
      this.projectAltId = params.get('projectAltId');
      //console.log(this.projectAltId);
      this.getProjectID(this.projectAltId);
    });
  }

  public PersonnelAddFormDialogClose(value: string) {
    this.personnelAddFormDialogOpened = false;
    this.personnelAddForm.markAsPristine();
  }

  public PersonnelEditFormDialogClose(value: string) {
    this.personnelEditFormDialogOpened = false;
    this.personnelEditForm.markAsPristine();
  }

  public loadPersonnel(prjID: string) {
    this.personnelStore.dispatch(
      fromPersonnelActions.LoadSelectedPersonnel({ projectId: this.prjID })
    );
    this.personnelStore
      .pipe(select(fromPersonnelSelector.getAllPersonnel))
      .subscribe((personnel) => {
        this.personnel = personnel;
        //console.log('Personnel array' + JSON.stringify(personnel));
        this.getValues();
        this.getContacts_Roles();
        this.gridView = this.gridData;
      });
  }
  public getProjectID(projectAltId: string) {
    console.log('get projectID method executing');
    this.getcontactsService
      .getSelectedProjectByProjectAltId(this.projectAltId)
      .subscribe((projID) => {
        this.prjID = projID;
        //console.log(this.prjID);
        this.loadPersonnel(this.prjID);
      });
  }

  /*method used for setting the gridData of the kendo Grid to the local personnel variable. */
  public getValues() {
    this.gridData = this.personnel;
    //console.log('GridData' + JSON.stringify(this.gridData));
  }

  public getContacts_Roles() {
    this.getcontactsService
    .getContactNames()
    .subscribe((contacts) => (this.contactArray = contacts));

  this.getcontactsService
    .getContactRoles()
    .subscribe((roles) => {
      return this.rolesArray = roles;
    }

    );
  }

  //#region
  public onPersonnelAddClick(personnel: FormGroup) {
    this.personnelAddFormDialogOpened = true;
    //console.log(this.contactArray);
    //console.log('Personnel Add button clicked');
    this.isNew = true;
    this.personnelAddForm.reset();
    /* use for debugging a form */
    this.personnelAddForm.valueChanges.subscribe((value) => {
      console.log(JSON.stringify(value));
    });
    this.personnelAddForm.patchValue({
      IsLeadInd: 'N',
      ActiveInd: 'A',
    });
  }

  public saveAddPersonnel() {
    console.log(this.prjID);
    this.personnelAddFormDialogOpened = false;
    if (this.personnelAddForm.dirty && this.personnelAddForm.valid) {
      this.personnelAddForm.patchValue({
        ProjID: this.prjID,
      });
      console.log(this.personnelAddForm.value);
      console.log('dispatching add new personnel request to store');
      this.personnelSendItem = this.personnelAddForm.value;
      this.personnelStore.dispatch(
        fromPersonnelActions.AddPersonnel({Personnel: this.personnelSendItem})
      );
    }
  }

  public saveEditedPersonnel() {
    console.log('checking on edit close button for save');
    this.personnelEditFormDialogOpened = false;
    if (this.personnelEditForm.dirty && this.personnelEditForm.valid) {
      console.log(this.personnelEditForm.get('RoleID').value);
      const RoleName = this.rolesArray.find(role => role.value === this.personnelEditForm.get('RoleID').value);
      console.log(RoleName);
      this.personnelEditForm.patchValue({
        ContactRole: RoleName['text']
      });
      console.log(this.personnelEditForm.value);
      this.personnelUpdateItem = this.personnelEditForm.value;
      console.log('dispatching edit personnel request to store');
      this.personnelStore.dispatch(
        fromPersonnelActions.UpdatePersonnel({Personnel: this.personnelEditForm.value})
      );
      this.personnelEditForm.markAsPristine();
    }
  }
  //#endregion
  public displayAddNewPersonnelForm(personnnelid: string) {
    this.personnelAddForm.patchValue({
      PersonnelId: personnnelid
    });
  }

  public EditPersonnelForm(obj: any) {
    this.onEditPersonnelClick();
    console.log(obj);
    this.displayEditPersonnelForm(obj);
    this.personnelEditForm.valueChanges.subscribe((value) => {
      console.log(JSON.stringify(value));

    });
  }

  public onEditPersonnelClick() {
    this.personnelEditFormDialogOpened = true;
    console.log('Edit Personnel button clicked');
  }

  public displayEditPersonnelForm(obj: any) {
    this.personnelEditForm.patchValue({
      PersonnelID: String(Object(obj)['personnelId']),
      ProjID: String(Object(obj)['projId']),
      ContactID: String(Object(obj)['contactId']),
      RoleID: Number(Object(obj)['roleId']),
      IsLeadInd: String(Object(obj)['isLeadInd']),
      ActiveInd: String(Object(obj)['activeInd']),
      ContactName: String(Object(obj)['contactName']),
      isLeadInd: String(Object(obj)['contactRole']),
      AgencyName: String(Object(obj)['AgencyName'])
    });
  }
}
