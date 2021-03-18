import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SortDescriptor } from '@progress/kendo-data-query';
import { GenericLookupListForDD } from '../../models/project-for-update';
import * as fromCore from "../../../core/state/reducers";
import * as fromProject from "../../state/reducers";
import * as fromProjectPhase from '../../state/reducers/edit-project-phase-page.reducer';
import * as fromProjectPhaseSelectors from '../../state/selector/project-phase.selectors';
import { setSavePhaseDialogStatus, setSelectedPhase, updatePhase, addPhase, mergePhases } from '../../state/actions/edit-project-phase-page.actions';
import { PhaseRaw } from '../../models/phase-raw';


@Component({
  selector: 'app-edit-prj-phase-page',
  templateUrl: './edit-prj-phase-page.component.html'
})
export class EditPrjPhasePageComponent implements OnInit {
  public phaseStatuses$: Observable<GenericLookupListForDD[]>;
  public phases$: Observable<PhaseRaw[]>;
  public selectedPhase$: Observable<PhaseRaw>;
  public mergePhases$: Observable<PhaseRaw[]>;
  public savePhaseDialogStatus$: Observable<boolean>;
  public projectId$: Observable<string>;


  constructor(public fb: FormBuilder,
    public coreStore: Store<fromCore.State>,
    public projectPhaseStore: Store<fromProjectPhase.State>,
    private projectStore: Store<fromProject.State>) { }

  ngOnInit() {
    //console.log('container phase');
    this.mergePhases$ = of(new Array<PhaseRaw>());//Set the dummy observable array
    this.phaseStatuses$ = this.coreStore.select(fromCore.getPhaseStatuses);
    this.phases$ = this.projectPhaseStore.select(fromProjectPhaseSelectors.getAllPhases);
    this.selectedPhase$ = this.projectPhaseStore.select(fromProjectPhaseSelectors.getSelectedPhase);
    this.savePhaseDialogStatus$ = this.projectPhaseStore.select(fromProjectPhaseSelectors.getSavePhaseDialogStatus);
    this.projectId$ = this.projectStore.select(fromProject.getProjectId);
  }

  public onSavePhase(phase: PhaseRaw): void {
    //console.log('phase save', phase);
    if (phase.phaseId) {
      this.projectPhaseStore.dispatch(updatePhase({ phase: phase }))
    }
    else {
      this.projectPhaseStore.dispatch(addPhase({ phase: phase }));
    }

    this.projectPhaseStore.dispatch(setSavePhaseDialogStatus({ status: false })); //Close the form
  }

  public onSelectPhase(phase: PhaseRaw) {
    //console.info('onslectPhase', phase);
    this.projectPhaseStore.dispatch(setSelectedPhase({ selectedPhase: phase }));
  }

  public onSetSavePhaseDialogStatus(dialogStatus: boolean): void {
    //console.info('set phase dilaog', dialogStatus);
    this.projectPhaseStore.dispatch(setSavePhaseDialogStatus({ status: dialogStatus }));
  }

  public onMergePhases(phases: PhaseRaw[]) {
    //console.info('in container', phases);
    this.projectPhaseStore.dispatch(mergePhases({ projectId: phases[0].projId, phases: phases }));
    this.mergePhases$ = of(new Array<PhaseRaw>());//Reset the dummy observable array
  }

}
