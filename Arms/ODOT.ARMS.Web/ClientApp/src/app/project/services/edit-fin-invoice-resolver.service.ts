import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import * as fromCore from "../../core/state/reducers";
import * as fromProject from "../state/reducers";
//import * as fromInvoice from "../state/reducers/edit-fin-invoice-page.reducer";
import { ProjectService } from './project.service';
import { EditFinInvoicePageService } from './edit-fin-invoice-page.service';
import { PhaseRaw } from '../models/phase-raw';
import { InvoiceRaw, BudgetCatDDRaw } from '../models/invoice-raw';
import { EncumbranceRaw } from '../models/encumbrance-raw';
import { ProjectBalanceRaw } from '../models/project-balance-raw';
//import { loadProjectPhaseList } from '../state/actions/edit-project-events-page.actions';
import * as fromRefDataActions from '../../core/state/actions/reference-data.actions';
import { loadInvoiceListSuccess, loadProjectPhaseList, loadBudgetCategoriesList, loadEncumbranceList, loadProjectBalance} from '../state/actions/edit-fin-invoice-page.actions';
//import { loadProjectPhaseList } from '../state/actions/edit-project-events-page.actions';

@Injectable({
  providedIn: 'root'
})
export class EditFinInvoiceResolverService {

  projectId$: Observable<string>;

  constructor(
    public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>,
    //public invoiceStore: Store<fromInvoice.InvoiceState>,
    public invoiceService: EditFinInvoicePageService,
    public projectService: ProjectService)  {
    this.projectId$ = this.projectStore.select(fromProject.getProjectId);
  }

  loadProjectInvoices(projectId: string): Observable<boolean> {
    return forkJoin(
      this.waitForReferenceDataToLoad(),
      this.invoiceService.getInvoicesByProjectId(projectId),
      this.projectService.getPhaseList(projectId),
      this.invoiceService.getEncumbranceByProjectId(projectId),      
      this.invoiceService.getProjectBalancesByProjectId(projectId),
      this.invoiceService.getBudgetCategoriesByProjectId(projectId)     
    ).pipe(
      tap((data: [boolean, InvoiceRaw[], PhaseRaw[], EncumbranceRaw[], ProjectBalanceRaw, BudgetCatDDRaw[]]) => {
        this.projectStore.dispatch(loadInvoiceListSuccess({ invoices: data[1] }));
        this.projectStore.dispatch(loadProjectPhaseList({ phases: data[2] }));
        this.projectStore.dispatch(loadEncumbranceList({ encumbranceSummary: data[3] }));
        this.projectStore.dispatch(loadProjectBalance({ projectBalance: data[4] }));
        this.projectStore.dispatch(loadBudgetCategoriesList({ budgetCategories: data[5] }));
      }),
      map((data: [boolean, InvoiceRaw[], PhaseRaw[], EncumbranceRaw[], ProjectBalanceRaw, BudgetCatDDRaw[]]) => !!data[1] && !!data[2] && !!data[3] && !!data[4] && !!data[5]),
      catchError(() => {
        return of(false);
      })
    )
  }
  waitForReferenceDataToLoad() {
    return this.coreStore.pipe(
      select(fromCore.getInvoiceReferenceDataLoaded),
      tap(loaded => {
        if (!loaded) {
          console.info('waitForInvoiceReferenceDataToLoad Invoice');
          this.coreStore.dispatch(fromRefDataActions.loadInvoiceReferenceData());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }


  resolve(): Observable<boolean> {
    return combineLatest(
      [this.projectId$]
    ).pipe(
      take(1),
      switchMap(([projectId]: [string]) => {
        console.log('invoice resolve', projectId);
        return this.loadProjectInvoices(projectId);
      })
    )
  }
}
