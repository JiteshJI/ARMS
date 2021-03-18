import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { projectActionTypes } from '../actions/project.actions';
import { ProjectService } from '../../services/project.service';

@Injectable()
export class ProjectTypeEffects {

  loadProjectType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActionTypes.loadProjectTypes),
      concatMap(() => this.projectService.getAllProjectType()),
      map(ProjectTypeList => projectActionTypes.projectTypesLoaded({ ProjectTypeList }))
    )
  );

  createProjectType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActionTypes.createProjectType),
      concatMap((action) => this.projectService.createProjectType(action.projectType))
    ),
    { dispatch: false }
  );

  deleteProjectType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActionTypes.deleteProjectType),
      concatMap((action) => this.projectService.deleteProjectType(action.projectTypeId))
    ),
    { dispatch: false }
  );

  updateProjectType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActionTypes.updateProjectType),
      concatMap((action) => this.projectService.updateProjectType(action.update.id, action.update.changes))
    ),
    { dispatch: false }
  );

  //*************************************************Project*********************************************//

  loadProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActionTypes.loadProject),
      concatMap(() => this.projectService.getAllProject()),
      map(ProjectList => projectActionTypes.projectLoaded({ ProjectList }))
    )
  );
  
  loadProjectsForSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActionTypes.loadProjectsForSearch),
      concatMap(() => this.projectService.getProjectsForSearch()),
      map(projects => projectActionTypes.loadProjectsForSearchSuccess({ projects }))
    )
  );

  loadSelectedProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActionTypes.loadSelectedProject),
      concatMap((action) => this.projectService.getSelectedProjectById(action.projectId)),
      map(SelectedProject => projectActionTypes.selectedProjectLoaded({ SelectedProject }))
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActionTypes.createProject),
      concatMap((action) => this.projectService.createProject(action.project)),
      tap(response => this.router.navigate(['/project', 'edit', response.projectClassificationId, response.projectAltId, 'prj', 'info']))
    ),
    { dispatch: false }
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActionTypes.updateProject),
      concatMap((action) => this.projectService.updateProject(action.update.id, action.update.changes))
    ),
    { dispatch: false }
  );

  //*************************************************Project*********************************************//

  constructor(private projectService: ProjectService, private actions$: Actions, private router: Router) { }
}

