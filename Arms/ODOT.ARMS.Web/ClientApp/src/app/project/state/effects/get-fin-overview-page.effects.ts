import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { OverviewService } from '../../services/get-fin-Overview-page.service';
import { getFinOverviewPageActionType } from '../actions/get-fin-overview-page.action';

@Injectable()
export class OverviewEffects {
  loadOverview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFinOverviewPageActionType.loadOverviewByProjectId),
      concatMap((action) => this.OverviewService.getOverviewByProjectId(action.projId)),
      map(Overview => getFinOverviewPageActionType.loadoverviewByProjectIdSuccess({ Overview }))
    )
  );
  constructor(private OverviewService: OverviewService, private actions$: Actions, private router: Router) { }
}
