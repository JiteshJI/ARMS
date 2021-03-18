import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProjectService } from '../../services/project.service';
import * as fromPersonnel from '../../state/reducers/personnel.reducer';
import * as fromPersonnelActions from '../../state/actions/personnel.actions';
import * as fromProject from '../../state/reducers/index';
import { Observable } from 'rxjs';
import { Personnel } from '../../models/personnel';
import { GenericLookupListForDD } from '../../services/project-for-update';
import * as fromPersonnelSelector from '../../state/selector/personnel.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prj-personnel-info',
  templateUrl: './prj-personnel-page.component.html',
  styles: [
  ]
})
export class PrjPersonnelPageComponent implements OnInit {
  projectId$: Observable<string>;
  projId: string;
  personnel$: Observable<Personnel[]>;
  EditPersonnel$: Observable<Personnel>;
  contactRoles: GenericLookupListForDD[];
  contactNames: GenericLookupListForDD[];
  saveDialogStatus$: Observable<boolean>;


  constructor(
   private projectStore: Store<fromProject.State>,
   private personnelStore: Store<fromPersonnel.PersonnelState>,
    private getcontactsService: ProjectService,
    private route: ActivatedRoute
  ) {
    this.projectId$ = this.projectStore.pipe(select(fromProject.getProjectId));
    this.projId = this.getcontactsService.getParam(this.projectId$);
  }

  ngOnInit() {
    console.log('Starting the personnel component');
    this.personnel$ = this.personnelStore.pipe(select(fromPersonnelSelector.getAllPersonnel));
    this.EditPersonnel$ = this.personnelStore.pipe(select(fromPersonnelSelector.getEditedPersonnel));
    this.contactRoles = this.route.snapshot.data.data.contactRoles;
    this.contactNames = this.route.snapshot.data.data.contactNames;
    this.saveDialogStatus$ = this.personnelStore.pipe(select(fromPersonnelSelector.getSaveDialogStatus));
    this.personnelStore.pipe(select(fromPersonnelSelector.getSaveDialogStatus)).subscribe((status) => console.log( 'save dialog:' , status));
    this.personnelStore.pipe(select(fromPersonnelSelector.getEditedPersonnel)).subscribe((personnel) => console.log('edited personnel', personnel));
  }

  public addEditSelectedPersonnel(personnel: any) {
    this.personnelStore.dispatch(fromPersonnelActions.setEditPersonnel({Personnel: personnel}));
  }

  public addNewEditPersonnelDialogClose() {
    this.personnelStore.dispatch(fromPersonnelActions.setSavePersonnelDialog({showDialog: false}));
  }


  public saveEdit(personnel: Personnel) {
    console.log(personnel.personnelId);
    if (personnel.personnelId) {
    this.personnelStore.dispatch(fromPersonnelActions.UpdatePersonnel({Personnel: personnel}));
    } else {
      console.log('entering save new personnel');
    personnel.projId = this.projId;
    this.personnelStore.dispatch(fromPersonnelActions.AddPersonnel({Personnel: personnel}));
    }
    this.personnelStore.dispatch(fromPersonnelActions.setSavePersonnelDialog({showDialog: false}));
  }
}
