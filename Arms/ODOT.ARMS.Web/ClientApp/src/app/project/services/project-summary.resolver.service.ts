import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromProjectSummary from '../state/reducers/project-summary.reducer';
import * as fromProjectSummaryactions from '../state/actions/project-currentsummary.actions';
import * as fromProjectSelectors from '../state/selector/project-currentsummmary.selectors';
import * as fromProject from '../state/reducers/index';

@Injectable({
  providedIn: 'root',
})
export class ProjectCurrentSummaryResolver implements Resolve<boolean> {
  constructor(
    private projectSummaryStore: Store<fromProjectSummary.ProjectSummaryState>,
    public projectStore: Store<fromProject.State>,
  ) {}

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the Reference Data state to turn `true`, emitting one time once loading
   * has finished.If the data not already loaded then we dispatch a action to load.
   */

  loadProjectCurrentSummary(projAltId: string): Observable<boolean> {
    return this.projectSummaryStore
    .pipe(
      select(fromProjectSelectors.selectProjectSummaryStateloaded),
      tap((ProjectSummaryStateloaded: boolean) => {
        if (!ProjectSummaryStateloaded) {
          console.log('Starting the resolver project summary');
          this.projectSummaryStore.dispatch(fromProjectSummaryactions.LoadSelectedProjectSummary({projectAltID: projAltId }));
        }
      }),
      catchError(() => {
        return of(false);
      }),
      filter((ProjectSummaryStateloaded) => ProjectSummaryStateloaded),
      take(1)
    );
  }

  resolve(): Observable<boolean> {

    let projAltId: string;
    const projectAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    projectAltId$.pipe(take(1))
                 .subscribe((projaltId) => projAltId = projaltId );
    return this.loadProjectCurrentSummary(projAltId);
  }
}
