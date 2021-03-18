import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
//import { navigateToNotFound } from '../../core/state/actions/core.actions';
import { loadFundingReferenceData } from '../../core/state/actions/reference-data.actions';
import * as fromCore from "../../core/state/reducers/index";
import { FundingRaw } from '../models/fundings-raw';
import { loadProjectFunding } from '../state/actions/edit-funding-page.actions';
import * as fromProject from "../state/reducers";
import * as fromFunding from "../state/reducers/edit-fin-funding-page.reducer";
import { FundingService } from './Funding.service';
import { ProjectService } from './project.service';
import * as fromProjectInfo from '../state/reducers/project-info.reducer';
import * as fromProjectInfoactions from '../state/actions/project-info.actions';
import * as fromBudgetactions from '../state/actions/edit-project-budget-page.actions';
import * as fromProjectInfoSelectors from '../state/selector/project-info.selectors';
import { Budget } from '../models/budget';
import * as fromProjectBudgetCategory from '../state/reducers/edit-project-budgetCategory-page.reducer';
import { loadBudgetsByProjectIdSuccess, loadBudgetByProjectId} from '../state/actions/edit-project-budget-page.actions';

@Injectable({
  providedIn: 'root'
})
export class EditProjectFundingResolverService {

  projectId$: Observable<string>;
    projAltId: string;
    projectAltId$: Observable<any>;


  constructor(private route: ActivatedRoute,
    public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>,
    public projectService: ProjectService,
    private projectInfoStore: Store<fromProjectInfo.ProjectInfoState>,
    private projService: ProjectService, public projectBudgetCategoryStore: Store<fromProjectBudgetCategory.State>,
    public fundingStore: Store<fromFunding.State>, public fundingService: FundingService) {
    this.projectId$ = this.projectStore.select(fromProject.getProjectId);
   
  }

  loadFinFundings(projectId: string): Observable<boolean> {
    
    this.projectAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    this.projAltId = this.projService.getParam(this.projectAltId$);
    this.projectInfoStore.dispatch(fromProjectInfoactions.loadSelectedProject({ projectAltID: this.projAltId }));

    return forkJoin(
      this.waitForReferenceDataToLoad(),
      this.fundingService.getFundingByProjectId(projectId),
      this.projectService.getBudgetByProjectId(projectId),
    ).pipe(
      tap((data: [boolean, FundingRaw[], Budget[]]) => {
        
        this.fundingStore.dispatch(loadProjectFunding({ Funding: data[1] }));
        this.projectBudgetCategoryStore.dispatch(loadBudgetsByProjectIdSuccess({ budget: data[2] }));
      }),
      map((data: [boolean, FundingRaw[], Budget[]]) => !!data[1] && !!data[2]),
      catchError(() => {
        console.log("Error");
        return of(false);
      })
    );
  }

  waitForReferenceDataToLoad(): Observable<boolean> {
    this.coreStore.dispatch(loadFundingReferenceData());
    return of(true);
  }

  loadProjectInfo(projAltId: string): Observable<boolean> {
    
    return this.projectInfoStore.pipe(
      select(fromProjectInfoSelectors.projInfoLoaded), // selecting the projInfoLoaded  property using a  selector
      tap(projInfoLoaded => {
        if (!projInfoLoaded) {  //  dispatch an action to hit the backend if the projInfoLoaded is false
          this.projectInfoStore.dispatch(fromProjectInfoactions.loadSelectedProject({ projectAltID: projAltId }));
        }
      }),
      filter(projInfoLoaded => !!projInfoLoaded),  // filter to pick up the values !! converts the value to a boolean
      take(1),
      catchError(() => {
        console.log('error occured during project resolver');
        return of(false);
      })
    );
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest(
      this.projectId$
    ).pipe(
      take(1),
      switchMap(([projectId]: [string]) => {
        console.info('Resolver Project Loads');
        return this.loadFinFundings(projectId);
      })
    );
  }


}
