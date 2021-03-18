import { Component, OnInit } from '@angular/core';
import { EventRaw } from '../../models/event-raw';
import { LookupItem } from '../../../shared/models/lookup-item';
import { PhaseRaw } from '../../models/phase-raw';
import { Observable } from 'rxjs';
import { map, tap, catchError, switchMap, take, filter } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromCore from '../../../core/state/reducers';
import { UploadSrc, EventUpload } from '../../models/event-upload';
import * as fromProject from "../../state/reducers";
import { setSaveEventDialogStatus, setSelectedEvent, addEvent, updateEvent, setSelectedUploadEvent, updateEventDocCount } from '../../state/actions/edit-project-events-page.actions';
import { setUploadDialogStatus, setSelectedUploadSrc, updateUploadFileList, DownloadFileById, updateUpload } from '../../state/actions/file-uploads.actions';
import { Deliverable } from '../../models/custom-deliverable';
import * as fromCustDeliverable from '../../state/reducers/cust-deliverable.reducer';
import * as fromCustDeliverableActions from '../../state/actions/cust-deliverable.actions';
import * as  fromCustDeliverableSelectors from '../../state/selector/cust-deliverable.selectors';
import { ProjectDeliverableList } from '../../models/projectInfo';
import * as fromProjectInfo from '../../state/reducers/project-info.reducer';
import * as fromProjectSelectors from '../../state/selector/project-info.selectors';
import * as fromProjectInfoActions from '../../state/actions/project-info.actions';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/projects';
import { Personnel } from '../../models/personnel';
import * as fromPersonnel from '../../state/reducers/personnel.reducer';
import * as fromPersonnelSelector from '../../state/selector/personnel.selectors';
@Component({
  selector: 'app-edit-prj-events-page',
  templateUrl: './edit-prj-events-page.component.html',
  styles: [
  ]
})

export class EditPrjEventsPageComponent implements OnInit {
  public projectId: string;
  public projAltId$: Observable<string>;
  public projAltId: string;
  public events$: Observable<EventRaw[]>;
  public selectUploadSrc$: Observable<UploadSrc>;
  public selectUploadEvent$: Observable<EventRaw>;
  public uploads$: Observable<EventUpload[]>;
  public selectedEvent$: Observable<EventRaw>;
  public phaseList$: Observable<PhaseRaw[]>;
  public primaryEvents$: Observable<LookupItem[]>;
  public secondaryEvents$: Observable<LookupItem[]>;
  public eventStatuses$: Observable<LookupItem[]>;
  public saveEventDialogStatus$: Observable<boolean>;
  public uploadDialogStatus$: Observable<boolean>;
  public allDeliverables$: Observable<Deliverable[]>;
  public ProjectDeliverables$: Observable<ProjectDeliverableList[]>;
  public customDeliverables$: Observable<Deliverable[]>;
  public saveDialogStatus$: Observable<boolean>;
  public customDialogStatus$: Observable<boolean>;
  public editedDeliverable$: Observable<Deliverable>;
  public addedDeliverable$: Observable<Deliverable>;
  public personnel$: Observable<Personnel[]>;

  constructor(public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>,
    public custDeliverableStore: Store<fromCustDeliverable.CustDeliverableState>,
    private projInfoStore: Store<fromProjectInfo.ProjectInfoState>,
    private projService: ProjectService, private personnelStore: Store<fromPersonnel.PersonnelState>,
  ) { }

  ngOnInit(): void {
    this.projectStore.select(fromProject.getProjectId).pipe(take(1)).subscribe(value => this.projectId = value);
    this.projAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    this.projAltId = this.projService.getParam(this.projAltId$);
    //console.info(this.projectId);
    this.events$ = this.projectStore.select(fromProject.getAllEvents);

    this.selectUploadSrc$ = this.projectStore.select(fromProject.getSelectedUploadSrc);
    this.selectUploadEvent$ = this.projectStore.select(fromProject.getSelectedUploadEvent);
    this.uploads$ = this.projectStore.select(fromProject.getAllUploads);

    this.selectedEvent$ = this.projectStore.select(fromProject.getSelectedEvent);

    this.phaseList$ = this.projectStore.select(fromProject.getPhaseList);
    this.saveEventDialogStatus$ = this.projectStore.select(fromProject.getSaveEventDialogStatus);

    this.uploadDialogStatus$ = this.projectStore.select(fromProject.getUploadEventDialogStatus);
       
    this.primaryEvents$ = this.coreStore.select(fromCore.getPrimaryEvents);
    this.secondaryEvents$ = this.coreStore.select(fromCore.getSecondaryEvents);
    this.eventStatuses$ = this.coreStore.select(fromCore.getEventStatuses);

   
    this.ProjectDeliverables$ = this.projInfoStore.select(fromProjectSelectors.selectProjInfoByAltId(this.projAltId)).pipe(map(projInfo => projInfo.projectDeliverableList));
    this.allDeliverables$ = this.custDeliverableStore.select(fromCustDeliverableSelectors.getAllDeliverables);
    this.customDeliverables$ = this.custDeliverableStore.select(fromCustDeliverableSelectors.getAllDeliverables).pipe(map(x => x.filter(d => d.projAltId !== null)));
    this.customDialogStatus$ = this.custDeliverableStore.select(fromCustDeliverableSelectors.selectDialogStatus);
    this.editedDeliverable$ = this.custDeliverableStore.select(fromCustDeliverableSelectors.getEditedDeliverable);
    this.personnel$ = this.personnelStore.pipe(select(fromPersonnelSelector.getAllPersonnel));
  }

  onSelectEvent(event: EventRaw): void {
    this.projectStore.dispatch(setSelectedEvent({ event: event }));
  }

  onSaveEvent(event: EventRaw): void {
    console.log('onSaveEvent - container', event.eventId);
    if (event.eventId) {
      this.projectStore.dispatch(updateEvent({ event: event }));
    } else {
      event.projectId = this.projectId;
      event.contactId = null;
      this.projectStore.dispatch(addEvent({ event: event }));
    }
    this.projectStore.dispatch(setSaveEventDialogStatus({ status: false }));//Close the form
  }

  onSetSaveEventDialogStatus(dialogStatus: boolean): void {
    this.projectStore.dispatch(setSaveEventDialogStatus({ status: dialogStatus }));
  }

  onSetUploadDialogStatus(dialogStatus: boolean): void {
    this.projectStore.dispatch(setUploadDialogStatus({ status: dialogStatus }));
  }

  onSelectUploadDoc(event: EventRaw): void {
    this.projectStore.dispatch(setSelectedUploadEvent({ event: event }));//Keep track of this to update the document count
    this.projectStore.dispatch(setSelectedUploadSrc({ src: new UploadSrc(this.projAltId, event.eventId) }));
  }

  onUploadFilesChange(userFiles: Array<any>): void {
    this.projectStore.dispatch(updateUploadFileList({ files: userFiles }));//Force the file list to reload
    // Is this a correct way of doing this?????
    this.selectUploadEvent$.pipe(take(1)).subscribe(ev => {
      let updateCnt = Object.assign({}, ev);//Maky Maky copy
      updateCnt.docCnt += userFiles.length; //Add Add number
      this.projectStore.dispatch(updateEventDocCount({ event: updateCnt }));//Force a new doc count
    });
  }

  onDownload(downloadIds: EventUpload): void {
    this.projectStore.dispatch(DownloadFileById({ projAltId: downloadIds.projAltId, srcId: downloadIds.eventSrc, uploadId: downloadIds.eventUploadId }));
  }

  onUpdateFileUpload(upload: EventUpload): void {
    this.projectStore.dispatch(updateUpload({ upload: upload }));
  }


  saveCustDeliverable(newDeliverable: Deliverable) {
    newDeliverable.projAltId = +this.projAltId;
    newDeliverable.deliverableType = 'C';
    this.custDeliverableStore.dispatch(fromCustDeliverableActions.AddPrjCustDeliverableSuccess({ deliverable: newDeliverable }));
    console.log('new Deliverable', newDeliverable);
  }

  delCustDeliverable(delDeliverable: Deliverable) {
    this.custDeliverableStore.dispatch(fromCustDeliverableActions.removePrjCustDeliverableSuccess({ deliverableId: delDeliverable.deliverableId }));
    console.log('del Deliverable', delDeliverable);
  }

  editCustDeliverable(editDeliverable: Deliverable) {
    this.custDeliverableStore.dispatch(fromCustDeliverableActions.editPrjCustDeliverableSuccess({ deliverable: editDeliverable }));
    this.custDeliverableStore.dispatch(fromCustDeliverableActions.setEditedPrjCustDeliverable({ deliverable: editDeliverable }));
    console.log('edit Deliverable', editDeliverable);
  }

  setcustomDeliverableDialog(status: boolean) {
    this.custDeliverableStore.dispatch(fromCustDeliverableActions.setPrjCustDeliverableDialog({ dialogStatus: status }));
  }

  saveProjectDeliverables(projectDeliverables: any) {
    const DeliverableList: ProjectDeliverableList[] = projectDeliverables.projectDeliverablesList;
    const projectDeliverableList = DeliverableList.map(prjDel => {
      return { ...prjDel, projectId: this.projectId };
    });
    this.custDeliverableStore.dispatch(fromCustDeliverableActions.savePrjDeliverable({ projectDeliverableList: projectDeliverableList}));

  }
}
