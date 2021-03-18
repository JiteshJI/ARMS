import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { custDeliverableActions } from '../actions/cust-deliverable.actions';
import { Deliverable } from '../../models/custom-deliverable';
import { of } from 'rxjs';
import { tap, concatMap, catchError, map } from 'rxjs/operators';
import { kendonotificationservice } from 'src/app/shared/services/kendo-notification.service';
import { CustDeliverableService } from '../../services/cust-deliverable.service';
import { ProjectService } from '../../services/project.service';
import { ProjectDeliverableList } from '../../models/projectInfo';

@Injectable()
export class CustDeliverableEffects {
  constructor(
    private actions$: Actions,
    private custDeliverableService: CustDeliverableService,
    private notificationService: kendonotificationservice,
    private projectService: ProjectService) { }


  loadSelectedPrjAllDeliverables$ = createEffect(() => this.actions$.pipe(
    ofType(custDeliverableActions.loadSelectedPrjDeliverable),
    tap(() => console.log(' effect executed loadSelectedPrjCustDeliverables$')),
    concatMap(action => this.projectService.getAllDeliverablesByProject(action.projectAltId).pipe(
      map((deliverableInfo: Deliverable[]) => {
        console.log('The deliverable effect success');
        return custDeliverableActions.loadSelectedPrjDeliverableSuccess({ deliverable: deliverableInfo });
      }),
      catchError(err => {
        this.notificationService.showError('Load Selected Custom Project Deliverable failed');
        return of(custDeliverableActions.loadSelectedPrjDeliverableFailure({ error: err }));
      }))
    ))
  );



  updateSelectedProject$ = createEffect(() => this.actions$.pipe(
    ofType(custDeliverableActions.editPrjCustDeliverable),
    tap(() => console.log(' effect executed UpdateProject$')),
    concatMap(action => this.custDeliverableService.updateCustDeliverable(action.deliverable).pipe(
      map((deliverableUpdate: Deliverable) => {
        return custDeliverableActions.editPrjCustDeliverableSuccess({ deliverable: deliverableUpdate });
      }),
      catchError(err => {
        this.notificationService.showError('Selected Custom Project Deliverable update failed');
        return of(custDeliverableActions.editPrjCustDeliverableFailure({ error: err }));
      })
    )))
  );

  createSelectedProject$ = createEffect(() => this.actions$.pipe(
    ofType(custDeliverableActions.AddPrjCustDeliverable),
    tap(() => console.log(' effect executed CreateSelectedProject$')),
    concatMap(action => this.custDeliverableService.createCustDeliverable(action.deliverable).pipe(
      map((deliverableNew: Deliverable) => {
        this.notificationService.showSuccess('Created new Custom Project Deliverable successfully');
        return custDeliverableActions.AddPrjCustDeliverableSuccess({ deliverable: deliverableNew });
      }),
      catchError(err => {
        this.notificationService.showError('Create new Custom Project Deliverable failed');
        return of(custDeliverableActions.AddPrjCustDeliverableFailure({ error: err }));
      })
    )))
  );

  saveProjectDeliverables$ = createEffect(() => this.actions$.pipe(
    ofType(custDeliverableActions.savePrjDeliverable),
    tap(() => console.log('effect executed saveProjectDeliverables$')),
    concatMap(action => this.custDeliverableService.saveCustDeliverable(action.projectDeliverableList).pipe(
      map((projectAltID: string) => {
        this.notificationService.showSuccess('Saved new Custom Project Deliverable successfully');
        return custDeliverableActions.loadSelectedPrjDeliverable({ projectAltId: projectAltID });
      }),
      catchError(err => {       
        this.notificationService.showError('save project Deliverable failed');
        return of(custDeliverableActions.savePrjDeliverableFailure({ error: err }));
      })
    )))
  );


  setCustDeliverableLoadedStatus$ = createEffect(() => this.actions$.pipe(
    ofType(custDeliverableActions.setPrjCustDeliverableLoaded),
    tap(() => console.log(' effect executed setCustDeliverableLoadedStatus$')),
    map(action => {
      return custDeliverableActions.setPrjCustDeliverableLoadedSuccess({ loaded: action.loaded });
    }),
    catchError(err => of(custDeliverableActions.setPrjCustDeliverableLoadedFailure({ error: err })))
  )
  );

  setPrjCustDeliverableDialog$ = createEffect(() => this.actions$.pipe(
    ofType(custDeliverableActions.setPrjCustDeliverableDialog),
    tap(() => console.log(' effect executed setCustDeliverableDialogStatus$')),
    map(action => {
      return custDeliverableActions.setPrjCustDeliverableDialogSuccess({ dialogStatus: action.dialogStatus });
    }),
    catchError(err => of(custDeliverableActions.setPrjCustDeliverableDialogFailure({ error: err })))
  )
  );

}
