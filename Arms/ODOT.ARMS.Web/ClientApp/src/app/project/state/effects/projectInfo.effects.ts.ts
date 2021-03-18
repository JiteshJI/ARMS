import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { projectInfoActions } from '../actions/project-info.actions';
import {ProjectService} from '../../services/project.service';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import {kendonotificationservice} from '../../../shared/services/kendo-notification.service';
import { of } from 'rxjs';
import { ProjectInfo } from '../../models/projectInfo';
import { Router } from '@angular/router';

@Injectable()
export class ProjectInfoEffects {
    constructor(
        private actions$: Actions,
        private projectService: ProjectService,
      private notificationService: kendonotificationservice,
      private router: Router
    ) {}


    loadSelectedProject$ = createEffect(() => this.actions$.pipe(
        ofType(projectInfoActions.loadSelectedProject),
        tap(() => console.log(' effect executed loadSelectedProject$')),
        concatMap(action => this.projectService.getProjectInfoByProjectAltID(action.projectAltID).pipe(

            map((project: ProjectInfo) => {
              this.notificationService.showSuccess('Selected Project successfully');
              console.log('The project effect successs');
              return projectInfoActions.loadSelectedProjectSuccess({projectInfo: project});
            }),
            catchError(err => {
                this.notificationService.showError('Selected Project failed');
                return of(projectInfoActions.loadSelectedProjectFailure({error: err}));
            })
        )
     )
    )
 );

   UpdateSelectedProject$ = createEffect(() => this.actions$.pipe(
    ofType(projectInfoActions.editSelectedProject),
    tap(() => console.log(' effect executed UpdateProject$')),
    concatMap(action => this.projectService.updateProjectInfo(action.project).pipe(

        map((project: ProjectInfo) => {
          this.notificationService.showSuccess(' Project updated successfully');
          return projectInfoActions.editSelectedProjectSuccess({projectInfo: project});
        }),
        catchError(err => {
            this.notificationService.showError('Project update failed');
            return of(projectInfoActions.editSelectedProjectFailure({error: err}));
        })
    )
   )
  )
 );

CreateSelectedProject$ = createEffect(() => this.actions$.pipe(
    ofType(projectInfoActions.AddNewProject),
    tap(() => console.log(' effect executed CreateSelectedProject$')),
    concatMap(action => this.projectService.createProjectInfo(action.project).pipe(

        map((project: ProjectInfo) => {
          this.notificationService.showSuccess('Created new Project successfully');
          return projectInfoActions.AddNewProjectSuccess({projectInfo: project});
        }),
      tap(response => this.router.navigate(['/project', 'edit', response.projectInfo.projectAltId, 'prj', 'info'])),
        catchError(err => {
            this.notificationService.showError('Create new Project failed');
            return of(projectInfoActions.AddNewProjectFailure({error: err}));
        })
    )
   )
   )
);

  setProjectLoadedStatus$ = createEffect(() => this.actions$.pipe(
    ofType(projectInfoActions.setProjectLoadedStatus),
    tap(() => console.log(' effect executed setProjectLoadedStatus$')),
    map(action => {
      console.log('setting the ProjectloadedStatus');
      return projectInfoActions.setProjectLoadedStatusSuccess({ loaded: action.loaded });
    }),
    catchError(err => {
      return of(projectInfoActions.setProjectLoadedStatusFailure({ error: err }));
    })
  )
  );

}
