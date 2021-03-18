import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, combineLatest } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromCore from "../../core/state/reducers";
import * as fromProject from "../state/reducers";
import { ProjectService } from './project.service';
import { ProjectHeader } from '../models/project-header';
import { tap, map, catchError, take, switchMap } from 'rxjs/operators';
import { loadProjectHeader } from '../state/actions/project-shell-page.actions';
import { navigateToNotFound } from '../../core/state/actions/core.actions';

@Injectable({
  providedIn: 'root'
})
export class NewProjectShellResolverServiceService {
  prjTypeId$: Observable<string>;

  constructor(private route: ActivatedRoute,
    public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>,
    public projectService: ProjectService) {

    this.prjTypeId$ = this.projectStore.select(fromProject.selectProjectTypeId);
  }

  loadProjectHeader(ProjectTypeId: string): Observable<boolean> {
    return forkJoin(
      this.projectService.getNewProjectHeader(ProjectTypeId)
    ).pipe(
      tap((data: [ProjectHeader]) => {
        this.projectStore.dispatch(loadProjectHeader({ projectHeader: data[0] }));
      }),
      map((data: [ProjectHeader]) => !!data[0]),
      catchError(() => {
        this.coreStore.dispatch(navigateToNotFound());
        return of(false);
      })
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest(
      this.prjTypeId$
    ).pipe(
      take(1),
      switchMap(([ProjectTypeId]: [string]) => {
        return this.loadProjectHeader(ProjectTypeId);
      })
    );
  }
}
