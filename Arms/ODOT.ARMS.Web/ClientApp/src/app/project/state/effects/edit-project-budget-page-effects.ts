import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as editProjectBudgetActions from '../actions/edit-project-budget-page.actions';
import * as editProjectBudgetCategoryActions from '../actions/edit-project-budgetCategory-page.actions';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { ProjectService } from '../../services/project.service';
import { Budget, BudgetCategory } from '../../models/budget';
import { BudgetService } from "../../services/budget.service";
import * as fromProjectBudgetCategorySelectors from '../../state/selector/project-budgetCategory.selectors';
import * as fromProjectBudgetCategory from '../../state/reducers/edit-project-budgetCategory-page.reducer';
import { select, Store } from '@ngrx/store';


@Injectable()
export class EditPrjBudgetPageEffects {

  constructor(private budgetService: BudgetService,
    private action$: Actions,
    private notificationService: kendonotificationservice,
    private projectBudgetCategoryStore: Store<fromProjectBudgetCategory.State>) { }

  addBudget$ = createEffect(() =>
    this.action$.pipe(
      ofType(editProjectBudgetActions.addBudget),
      withLatestFrom(this.projectBudgetCategoryStore.pipe(select(fromProjectBudgetCategorySelectors.getBudgetCategoryIds))),
      concatMap(([action, budgetCategoryIds]) => this.budgetService.addBudget(action.budget).pipe(
        switchMap((budget: Budget) => {
          let categoryExists = budgetCategoryIds.some(x => x == action.budgetCategory.budgetCatId);
       
          let budgetCat: BudgetCategory = {
            bcAltId: budget.bcAltId,
            budgetAmt: budget.budgetAmount || 0,
            budgetCatId: action.budgetCategory.budgetCatId,
            budgetCatText: action.budgetCategory.budgetCatText,
            projId: action.budgetCategory.projId
          }
          this.notificationService.showSuccess('Budget added.');
          if (!categoryExists) {
            return [
              editProjectBudgetCategoryActions.addBudgetCategory({ budgetCategory: budgetCat }),
              editProjectBudgetActions.addBudgetSuccess({ budget: budget })
            ]
          }
          else {
            return [
              editProjectBudgetCategoryActions.updateBudgetCategory({ budgetCategory: budgetCat }),
              editProjectBudgetActions.addBudgetSuccess({ budget: budget })
            ]
          }
        }),
        catchError(err => {
          this.notificationService.showError('Budget could not be added.');
          return of(editProjectBudgetActions.addBudgetFailure({ error: err }));
        })
      ))
    )
  );

  updateBudget$ = createEffect(() =>
    this.action$.pipe(
      ofType(editProjectBudgetActions.updateBudget),
      concatMap(action => this.budgetService.updateBudget(action.budget).pipe(

        map((budget: Budget) => {
          this.notificationService.showSuccess('Budget updated.');
          return editProjectBudgetActions.updateBudgetSuccess({ budget: budget });
        }),
        catchError(err => {
          this.notificationService.showError('Budget could not be updated.');
          return of(editProjectBudgetActions.updateBudgetFailure({ error: err }));
        })
      ))
    )
  );

  getBudgetsByBcAltId$ = createEffect(() =>
    this.action$.pipe(
      ofType(editProjectBudgetActions.loadBudgetByProjectId),
      concatMap(action => this.budgetService.getBudgetByProjectId(action.projId).pipe(

        map((budgets: Budget[]) => {
          this.notificationService.showSuccess('Budgets loaded by category.');
          return editProjectBudgetActions.loadBudgetsByProjectIdSuccess({ budget: budgets });
        }),
        catchError(err => {
          this.notificationService.showError('Budgets could not be loaded.');
          return of(editProjectBudgetActions.loadBudgetsByProjectIdFail({ error: err }));
        })
      ))
    )
  );



}
