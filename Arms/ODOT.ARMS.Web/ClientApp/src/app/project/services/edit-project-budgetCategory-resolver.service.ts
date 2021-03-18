import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import * as fromCore from "../../core/state/reducers";
import * as fromProject from "../state/reducers";
import * as fromProjectBudgetCategory from '../state/reducers/edit-project-budgetCategory-page.reducer';
import { ProjectService } from './project.service';
import { loadProjectBudgetReferenceData } from '../../core/state/actions/reference-data.actions';
import { budgetByProjectIdLoaded, loadBudgetCategories } from '../state/actions/budget.actions';
import { Budget, BudgetCategory } from '../models/budget';
import { PhaseRaw } from '../models/phase-raw';
import { loadProjectPhaseList } from '../state/actions/edit-project-events-page.actions';
import { loadBudgetsByProjectIdSuccess } from '../state/actions/edit-project-budget-page.actions';



@Injectable({
  providedIn: 'root'
})
export class EditProjectBudgetResolverService {

  projectId$: Observable<string>;

  constructor(private route: ActivatedRoute,
    public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>,
    public projectBudgetCategoryStore: Store<fromProjectBudgetCategory.State>,
    public projectService: ProjectService) {

    this.projectId$ = this.projectStore.select(fromProject.getProjectId);
    console.log('project budget resolver', this.projectId$);
  }

  loadProjectBudgetCategories(projectId: string): Observable<boolean> {
    return forkJoin(
      this.waitForReferenceDataToLoad(),
      this.projectService.getBudgetByProjectId(projectId),
      this.projectService.getPhaseList(projectId)
    ).pipe(
      tap((data: [boolean, Budget[], PhaseRaw[]]) => {
        
        console.info('budget resolver load', data[1]);
        console.info('phase resolver load', data[2]);
        this.projectBudgetCategoryStore.dispatch(loadBudgetsByProjectIdSuccess({ budget: data[1] }));
        this.projectStore.dispatch(loadProjectPhaseList({ phases: data[2] }));
      }),
      map((data: [boolean, Budget[], PhaseRaw[]]) => !!data[1] && !!data[2]),
      catchError(() => {
        return of(false);
      })
    )
  }
  waitForReferenceDataToLoad() {
    return this.coreStore.pipe(
      select(fromCore.getBudgetCategoriesDataLoaded),
      tap(loaded => {
        if (!loaded) {
          console.info('waitForPhaseReferenceDataToLoad budget');
          this.coreStore.dispatch(loadProjectBudgetReferenceData());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest(
      [this.projectId$]
    ).pipe(
      take(1),
      switchMap(([projectId]: [string]) => {
        console.log('budget resolve', projectId);
        return this.loadProjectBudgetCategories(projectId);
      })
    )
  }





}
