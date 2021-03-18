import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { navigateToNotFound } from '../../core/state/actions/core.actions';
import * as fromCore from "../../core/state/reducers";
import { OverviewRaw } from '../models/Overview-raw';
import { loadoverviewByProjectIdSuccess } from '../state/actions/get-fin-overview-page.action';
import * as fromProject from "../state/reducers";
import * as fromOverview from "../state/reducers/get-fin-overview-page.reducer";
import { OverviewService } from './get-fin-Overview-page.service';

@Injectable({
  providedIn: 'root'
})
export class FinOverviewResolverService {

  projectAltId$: Observable<string>;

  constructor(private route: ActivatedRoute,
    public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>,
    public OverviewService: OverviewService, public OverviewStore: Store<fromOverview.OverviewState>) {

    this.projectAltId$ = this.projectStore.select(fromProject.getProjectId);
  }

  loadOverviewDataByProjectId(projectAltId: string): Observable<boolean> {
    return forkJoin(
      this.OverviewService.getOverviewByProjectId(projectAltId)
    ).pipe(
      tap((data: [OverviewRaw[]]) => {
        
        this.OverviewStore.dispatch(loadoverviewByProjectIdSuccess({ Overview: data[0] }));
      }),
      map((data: [OverviewRaw[]]) => !!data[0]),
      catchError(() => {
        this.coreStore.dispatch(navigateToNotFound());
        return of(false);
      })
    );
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest(
      this.projectAltId$
    ).pipe(
      take(1),
      switchMap(([projectAltId]: [string]) => {
        return this.loadOverviewDataByProjectId(projectAltId);
      })
    );
  }

}
