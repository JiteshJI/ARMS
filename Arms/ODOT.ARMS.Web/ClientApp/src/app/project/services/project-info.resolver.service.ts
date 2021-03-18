import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromProjectInfo from '../state/reducers/project-info.reducer';
import * as fromProject from '../state/reducers/index';
import { Observable, of } from 'rxjs';
import { catchError, filter, take, tap } from 'rxjs/operators';
import * as fromProjectInfoactions from '../state/actions/project-info.actions';
import * as fromProjectInfoSelectors from '../state/selector/project-info.selectors';
import { ProjectService } from './project.service';


@Injectable({
  providedIn: 'root'
})

export class ProjectInfoResolver implements Resolve<boolean> {
  constructor(
    private projectInfoStore: Store<fromProjectInfo.ProjectInfoState>,
    private projectStore: Store<fromProject.State>,
    private projService: ProjectService
  ) { }

  resolve(): Observable<boolean> {
    const projectAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    const projAltId = this.projService.getParam(projectAltId$);
    return this.loadProjectInfo(projAltId).pipe(
      tap(() => this.projectInfoStore.dispatch(fromProjectInfoactions.setProjectLoadedStatus({ loaded: false })))// reset the project loaded status to false after the load.
    );
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
}
