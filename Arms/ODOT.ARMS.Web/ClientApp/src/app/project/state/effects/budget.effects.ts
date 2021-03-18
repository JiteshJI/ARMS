import { createEffect, ofType, Actions } from "@ngrx/effects";
import { switchMap, concatMap, map, catchError, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import * as budgetActionTypes from "../actions/budget.actions";
import { BudgetService } from "../../services/budget.service";
import { Observable } from "rxjs";



@Injectable()
export class BudgetEffects {

  constructor(private budgetService: BudgetService, private actions$: Actions) { }

  addBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(budgetActionTypes.addBudget),
      concatMap((action) => this.budgetService.addBudget(action.budget)),
      map(budget => budgetActionTypes.budgetAdded({ budget }))
      // catchError(() => Observable.of(console.log('budget creation failed')))
    )
    //{ dispatch: false }
  );

  loadBudgetCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(budgetActionTypes.loadBudgetCategories),
      concatMap(() => this.budgetService.getBudgetCategories()),
      map(BudgetCategories => budgetActionTypes.budgetCategoriesLoaded({ BudgetCategories }))
    )
  );

  loadBudgetByProjectId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(budgetActionTypes.getBudgetByProjectId),
      concatMap((action) => this.budgetService.getBudgetByProjectId(action.projectId)),
      map(Budgets => budgetActionTypes.budgetByProjectIdLoaded({ Budgets }))
    )
  );

  loadBudgets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(budgetActionTypes.getBudgetByProjectId),
      concatMap((action) => this.budgetService.getBudgetByProjectId(action.projectId)),
      map(Budgets => budgetActionTypes.budgetByProjectIdLoaded({ Budgets }))
    )
  );

  updateBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(budgetActionTypes.updateBudget),
      concatMap((action) => this.budgetService.updateBudget(action.updateBudget.changes)),
      map(updatedBudget => budgetActionTypes.budgetUpdated({ updatedBudget }))
    ),
  )



}
