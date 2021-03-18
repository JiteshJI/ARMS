import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { navigateToNotFound } from '../../core/state/actions/core.actions';
import * as fromCore from "../../core/state/reducers";
import { LedgerRaw } from '../models/ledger-raw';
import { loadLedgersByProjectIdSuccess } from '../state/actions/get-fin-ledger-page.actions';
import * as fromProject from "../state/reducers";
import * as fromLedger from "../state/reducers/get-fin-ledger-page.reducer";
import { LedgerService } from './get-fin-ledger-page.service';

@Injectable({
  providedIn: 'root'
})
export class FinLedgerResolverService {

  projectAltId$: Observable<string>;

  constructor(private route: ActivatedRoute,
    public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>,
    public ledgerService: LedgerService, public ledgerStore: Store<fromLedger.LedgerState>) {

    this.projectAltId$ = this.projectStore.select(fromProject.getProjectId);
  }

  loadLedgerDataByProjectId(projectAltId: string): Observable<boolean> {
    return forkJoin(
      this.ledgerService.getLedgerByProjectId(projectAltId)
    ).pipe(
      tap((data: [LedgerRaw[]]) => {
        this.ledgerStore.dispatch(loadLedgersByProjectIdSuccess({ Ledger: data[0] }));
      }),
      map((data: [LedgerRaw[]]) => !!data[0]),
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
        return this.loadLedgerDataByProjectId(projectAltId);
      })
    );
  }

}
