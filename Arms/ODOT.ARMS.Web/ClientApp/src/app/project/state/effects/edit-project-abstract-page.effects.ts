import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';

import * as editProjectAbstractActionTypes from '../actions/edit-project-abstract-page.actions';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { ProjectService } from '../../services/project.service';
import { of } from 'rxjs';
import { ProjectAbstract } from '../../models/project-abstract';


@Injectable()
export class EditPrjAbstractPageEffects {

  constructor(private projectService: ProjectService,
    private action$: Actions,
    private notificationService: kendonotificationservice) { }

  getProjectAbstract$ = createEffect(() =>
    this.action$.pipe(
      ofType(editProjectAbstractActionTypes.loadProjectAbstract),
      switchMap((action) => {
        console.log('fetch abstract by project', action);
        return this.projectService.getProjectAbstractByProjectAltId(action.projectAltId);
      }),
      map(abstract => editProjectAbstractActionTypes.loadProjectAbstractSuccess({ projectAbstract: abstract })),
      // catchError(error =>
      //     of(editProjectAbstractActionTypes.loadProjectAbstractFailure({ error: error }))
      // ),
      tap(response => console.log('response abstract', response))
    )
  );

  updateProjectAbstract$ = createEffect(() =>
    this.action$.pipe(
      ofType(editProjectAbstractActionTypes.updateProjectAbstract),
      tap(() => console.log('effect executed updateprojectabstract')),
      concatMap(action => this.projectService.updateProjectAbstract(action.newAbstract).pipe(
        map((abstract: ProjectAbstract) => {
          this.notificationService.showInfo('Abstract updated successfully');
          return editProjectAbstractActionTypes.updateProjectAbstractSuccess({ newAbstract: abstract });
        }),
        catchError(err => {
          this.notificationService.showError('Abstract Update failed');
          return of(editProjectAbstractActionTypes.updateProjectAbstractFailure({ error: err }));
        })
      )
      )
    )
  );

}
