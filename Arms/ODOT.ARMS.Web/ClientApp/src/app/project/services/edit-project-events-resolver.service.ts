import { Injectable } from '@angular/core';
import { Observable, of, combineLatest, forkJoin } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, tap, catchError, switchMap, take, filter } from 'rxjs/operators';
import * as fromCore from "../../core/state/reducers";
import * as fromProject from "../state/reducers";
import { ProjectService } from './project.service';
import { EventService } from './event.service';
import { EventRaw } from '../models/event-raw';
import { PhaseRaw } from '../models/phase-raw';
import { loadProjectEvents, loadProjectPhaseList } from '../state/actions/edit-project-events-page.actions';
//import { navigateToNotFound } from '../../core/state/actions/core.actions';
import { loadProjectEventsReferenceData } from '../../core/state/actions/reference-data.actions';
import * as fromProjectInfoactions from '../state/actions/project-info.actions';
import * as fromProjectInfoSelectors from '../state/selector/project-info.selectors';
import * as fromProjectInfo from '../state/reducers/project-info.reducer';
import * as fromCustDeliverable from '../state/reducers/cust-deliverable.reducer';
import * as fromCustDeliverableActions from '../state/actions/cust-deliverable.actions';
import * as fromPersonnel from '../state/reducers/personnel.reducer';
import * as fromPersonnelActions from '../state/actions/personnel.actions';
import { Personnel } from '../models/personnel';
import * as fromPersonnelSelector from '../state/selector/personnel.selectors';

@Injectable({
  providedIn: 'root'
})
export class EditProjectEventsResolverService {

  projectId$: Observable<string>;
  projectAltId$: Observable<any>;
  projAltId: string;

  constructor(public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>,
    private projectInfoStore: Store<fromProjectInfo.ProjectInfoState>,
    public custDeliverableStore: Store<fromCustDeliverable.CustDeliverableState>,
    public projectService: ProjectService,
    private personnelStore: Store<fromPersonnel.PersonnelState>,
    public eventService: EventService) {
    this.projectId$ = this.projectStore.select(fromProject.getProjectId);
    this.projectAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
  }

  loadProjectEvents(projectId: string): Observable<boolean> {
    return forkJoin(
      this.waitForReferenceDataToLoad(),
      this.loadProjectInfo(this.projAltId),
      this.loadCustomDeliverables(this.projAltId),
      this.eventService.getEventsByProjectId(projectId),
      this.projectService.getPhaseList(projectId),
      this.loadPersonnelData(projectId)
    ).pipe(
      tap((data: [boolean, boolean, boolean, EventRaw[], PhaseRaw[], boolean]) => {
        this.projectStore.dispatch(loadProjectEvents({ events: data[3] }));
        this.projectStore.dispatch(loadProjectPhaseList({ phases: data[4] }));
        this.personnelStore.dispatch(fromPersonnelActions.LoadSelectedPersonnel({ projectId: projectId })
        );
      }),
      map((data: [boolean, boolean, boolean, EventRaw[], PhaseRaw[], boolean]) => !!data[1] && !!data[2]),
      catchError(() => {
        //this.coreStore.dispatch(navigateToNotFound());
        return of(false);
      })
    );
  }

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the Reference Data state to turn `true`, emitting one time once loading
   * has finished.If the data not already loaded then we dispatch a action to load.
   */
  waitForReferenceDataToLoad(): Observable<boolean> {
    return this.coreStore.pipe(
      select(fromCore.getProjectEventReferenceDataLoaded),
      tap(loaded => {
        if (!loaded) {
          console.info('waitForReferenceDataToLoad');
          this.coreStore.dispatch(loadProjectEventsReferenceData());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  loadCustomDeliverables(projAltId: string): Observable<boolean> {
    this.custDeliverableStore.dispatch(fromCustDeliverableActions.loadSelectedPrjDeliverable({ projectAltId: projAltId }));
    return of(true);
  }

  loadProjectInfo(projAltId: string): Observable<boolean> {
    return this.projectInfoStore.pipe(
      select(fromProjectInfoSelectors.projInfoLoaded), // selecting the projInfoLoaded  property using a  selector
      tap(projInfoLoaded => {
        if (!projInfoLoaded) {  //  dispatch an action to hit the backend only if the projInfoLoaded is false
          this.projectInfoStore.dispatch(fromProjectInfoactions.loadSelectedProject({ projectAltID: projAltId }));
        }
      }),
      filter(projInfoLoaded => !!projInfoLoaded),  // filter to pick up the values !! converts the value to a boolean
      take(1),
      catchError(() => {
        console.log('error occured during event resolver');
        return of(false);
      })
    );
  }

  loadPersonnelData(projId: string): Observable<boolean> {
    return this.personnelStore.pipe(
      select(fromPersonnelSelector.getLoaded),
      tap((getLoaded) => {
        if (!getLoaded) {
          this.personnelStore.dispatch(
            fromPersonnelActions.LoadSelectedPersonnel({ projectId: projId })
          );
        }
      }),
      filter((getLoaded) => !!getLoaded),       /* '!!' converts a non boolean value to boolean value .  !! always returns false for empty strings or objects */
      take(1)
    );
  }

  resolve(): Observable<boolean> {
    this.projAltId = this.projectService.getParam(this.projectAltId$);
    return combineLatest(
      this.projectId$
    ).pipe(
      take(1),
      switchMap(([projectId]: [string]) => {
        console.info('Resolver Project Loads');
        return this.loadProjectEvents(projectId);
      }),
      tap(() => this.projectInfoStore.dispatch(fromProjectInfoactions.setProjectLoadedStatus({ loaded: false }))) // reset the project loaded status to false after the load.
    );
  }

}
