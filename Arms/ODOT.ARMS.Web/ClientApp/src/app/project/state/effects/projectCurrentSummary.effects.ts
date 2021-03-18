import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, concatMap, tap } from 'rxjs/operators';
import { projectSummaryActions } from '../actions/project-currentsummary.actions';
import { ProjectService } from '../../services/project.service';
import { ProjectSummary } from '../../models/project-summary';
import {kendonotificationservice} from '../../../shared/services/kendo-notification.service';




@Injectable()
export class ProjectCurrentSummaryEffects {



   loadProjectCurrentSummary$ = createEffect(() => this.actions$.pipe(
        ofType(projectSummaryActions.LoadSelectedProjectSummary),
        tap(() => console.log(' effect executed loadProjectCurrentSummary$')),
        concatMap(action => this.projectService.getProjectSummaryByProjectAltId(action.projectAltID).pipe(

           map((SelectedProjectSummary: ProjectSummary) => {
            this.notificationservice.showSuccess('Summary loaded successfully');
            return projectSummaryActions.LoadSelectedProjectSummarysuccess({SelectedProjectSummary});
           }),
           catchError(err => {
            this.notificationservice.showError('Summary Update failed');
            return of(projectSummaryActions.LoadSelectedProjectSummaryFailure({error: err}));
           })
        )
      )
    )
  );

    UpdateProjectCurrentSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectSummaryActions.UpdateProjectSummary),
      tap(() => console.log(' effect executed UpdateProjectCurrentSummary$')),
      concatMap(action => this.projectService.updateProjectSummary(action.currentSummary).pipe(

         map((currentSummary: ProjectSummary) => {
           this.notificationservice.showSuccess('Summary updated successfully');
           return projectSummaryActions.UpdateProjectSummarySuccess({currentSummary});
          }),
         catchError(err => {
           this.notificationservice.showError('Summary Update failed');
           return of(projectSummaryActions.UpdateProjectSummaryFailure({ error: err }));
          })
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private notificationservice: kendonotificationservice
  ) {}


}


