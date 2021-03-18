import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { LedgerService } from '../../services/get-fin-ledger-page.service';
import { getFinLedgerPageActionType } from '../actions/get-fin-ledger-page.actions';

@Injectable()
export class LedgerEffects {
  loadLedger$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFinLedgerPageActionType.loadLedgerByProjectId),
      concatMap((action) => this.ledgerService.getLedgerByProjectId(action.projId)),
      map(Ledger => getFinLedgerPageActionType.loadLedgersByProjectIdSuccess({ Ledger }))
    )
  );
  constructor(private ledgerService: LedgerService, private actions$: Actions, private router: Router) { }
}
