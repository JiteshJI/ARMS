import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, concatMap, filter, map, tap, catchError } from 'rxjs/operators';
import { editFinInvoicePageActionTypes } from '../actions/edit-fin-invoice-page.actions';
import { EditFinInvoicePageService } from '../../services/edit-fin-invoice-page.service';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { InvoiceRaw, BudgetCatDDRaw } from '../../models/invoice-raw';
import { ProjectBalanceRaw } from '../../models/project-balance-raw';

import { combineLatest, forkJoin, Observable, of } from 'rxjs';

 



@Injectable()
export class EditFinInvoicePageEffects {

  constructor(private invoiceService: EditFinInvoicePageService, private actions$: Actions, private notificationService: kendonotificationservice) { }

  addInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editFinInvoicePageActionTypes.addInvoice),
      concatMap(action => this.invoiceService.addInvoice(action.invoice).pipe(

        map((invoice: InvoiceRaw) => {
          this.notificationService.showSuccess('Create Invoice Successful');
          return editFinInvoicePageActionTypes.addInvoiceSuccess({ invoice });
        }),
        catchError(err => {
          this.notificationService.showError('Create Invoice failed');
          return of(editFinInvoicePageActionTypes.addInvoiceFailure({ error: err }));
        })
      )
      )
    )
  );

  //======================================================================================================================
  //
  // I really hate how I wrote this code
  //
  // When I know more, I plan to fix this
  // either by consolidating the two balance calls
  // or process them in one effect
  //
  // Author: Hank
  //
  //======================================================================================================================


  addInvoiceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editFinInvoicePageActionTypes.addInvoiceSuccess),
      concatMap(action => this.invoiceService.getProjectBalancesByProjectId(action.invoice.projId).pipe(

        map((projectBalance: ProjectBalanceRaw) => {
          return editFinInvoicePageActionTypes.loadProjectBalanceSuccess({ projectBalance });
        })//,
        //catchError(err => {
        //  this.notificationService.showError('Budget Load Failed failed');
        //  return of(editFinInvoicePageActionTypes.addInvoiceFailure({ error: err }));
        //})
      )
      )
    )
  );


  updateInvoiceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editFinInvoicePageActionTypes.updateInvoiceSuccess),
      concatMap(action => this.invoiceService.getProjectBalancesByProjectId(action.invoice.projId).pipe(

        map((projectBalance: ProjectBalanceRaw) => {
          return editFinInvoicePageActionTypes.loadProjectBalanceSuccess({ projectBalance });
        })//,
        //catchError(err => {
        //  this.notificationService.showError('Budget Load Failed failed');
        //  return of(editFinInvoicePageActionTypes.addInvoiceFailure({ error: err }));
        //})
      )
      )
    )
  );

  loadProjectBalanceAfterInvoiceUpdateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editFinInvoicePageActionTypes.updateInvoiceSuccess),
      concatMap(action => this.invoiceService.getBudgetCategoriesByProjectId(action.invoice.projId).pipe(

        map((budgetCategories: BudgetCatDDRaw[]) => {
          console.info('loadProjectBalanceSuccess$ second??')
          return editFinInvoicePageActionTypes.loadBudgetCategoriesList({ budgetCategories });
        })//,
        //catchError(err => {
        //  this.notificationService.showError('Budget Load Failed failed');
        //  return of(editFinInvoicePageActionTypes.addInvoiceFailure({ error: err }));
        //})
      )
      )
    )
  );

  loadProjectBalanceAfterInvoiceInsertSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editFinInvoicePageActionTypes.addInvoiceSuccess),
      concatMap(action => this.invoiceService.getBudgetCategoriesByProjectId(action.invoice.projId).pipe(

        map((budgetCategories: BudgetCatDDRaw[]) => {
          return editFinInvoicePageActionTypes.loadBudgetCategoriesList({ budgetCategories });
        })//,
        //catchError(err => {
        //  this.notificationService.showError('Budget Load Failed failed');
        //  return of(editFinInvoicePageActionTypes.addInvoiceFailure({ error: err }));
        //})
      )
      )
    )
  );



  updateInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editFinInvoicePageActionTypes.updateInvoice),
      concatMap(action => this.invoiceService.updateInvoice(action.invoice).pipe(

        map((invoice: InvoiceRaw) => {
          console.info('Am I getting old data', invoice);
          this.notificationService.showSuccess('Update Invoice Successful');
          return editFinInvoicePageActionTypes.updateInvoiceSuccess({ invoice });
        }),
        catchError(err => {
          this.notificationService.showError('Update Invoice failed');
          return of(editFinInvoicePageActionTypes.updateInvoiceFailure({ error: err }));
        })
      )
      )
    )
  );



}
