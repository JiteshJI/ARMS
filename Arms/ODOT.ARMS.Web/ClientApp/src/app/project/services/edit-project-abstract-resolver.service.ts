import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { filter, switchMap, take, tap } from "rxjs/operators";

import * as fromProject from '../state/reducers';
import * as fromProjectAbstractSelectors from '../state/selector/project-abstract.selectors';
import { ProjectService } from './project.service';
import * as fromProjectAbstract from '../state/reducers/edit-project-abstract-page.reducer';
import * as fromProjectAbstractActions from '../state/actions/edit-project-abstract-page.actions';
import { ProjectAbstract } from "../models/project-abstract";

@Injectable({
  providedIn: 'root'
})
export class EditProjectAbstractResolverService {

  projectAltId$: Observable<string>;

  constructor(public projectStore: Store<fromProject.State>,
    public projectService: ProjectService,
    public projectAbstractStore: Store<fromProjectAbstract.State>) {
    this.projectAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    console.info('abtsract project alt id', this.projectAltId$);
  }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<ProjectAbstract> {

    return combineLatest(
      [this.projectAltId$]
    ).pipe(
      take(1),
      switchMap(([projectAltId]: [string]) => {
        console.info('Resolver Project Loads abstract');
        return this.loadProjectAbstract(projectAltId);
      })
    );

    // return this.projectAltId$.pipe(
    //     // take(1),
    //     switchMap((projectAltId: string) => {
    //         return this.loadProjectAbstract(projectAltId);
    //     })
    // )
  }

  loadProjectAbstract(projectAltId: string): Observable<ProjectAbstract> {
    return this.projectAbstractStore.pipe(
      select(fromProjectAbstractSelectors.selectProjectAbstractById(projectAltId)),
      tap((projectAbstractLoaded: ProjectAbstract) => {
        console.log('check if loaded', projectAbstractLoaded);
        if (!projectAbstractLoaded) {
          console.info('loading proj abstract');
          this.projectAbstractStore.dispatch(fromProjectAbstractActions.loadProjectAbstract({ projectAltId: projectAltId }));
        }
      }),
      filter(loaded => !!loaded),
      take(1)
    );
  }
}
