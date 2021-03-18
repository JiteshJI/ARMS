import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as editProjectBudgetActionTypes from '../actions/edit-project-budgetCategory-page.actions';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { ProjectService } from '../../services/project.service';
import { BudgetCategory } from '../../models/budget';


@Injectable()
export class EditPrjBudgetCategoryPageEffects {

  constructor(private projectService: ProjectService,
    private action$: Actions,
    private notificationService: kendonotificationservice) { }

  // getProjectBudgetCategories$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(editProjectBudgetActionTypes.loadProjectBudgetCategories),
  //     concatMap(action => this.projectService.getBudgetCategoriesByProject(action.projectId).pipe(

  //       map((categories: BudgetCategory[]) => {
  //         this.notificationService.showSuccess('budget categories loaded');
  //         return editProjectBudgetActionTypes.loadProjectBudgetCategoriesSuccess({ budgetCategories: categories });
  //       }),
  //       catchError(err => {
  //         this.notificationService.showError('budget categories could not be loaded');
  //         return of(editProjectBudgetActionTypes.loadProjectBudgetCategoriesFailure({ error: err }));
  //       })
  //     ))
  //   )
  // );



}
