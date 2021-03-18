import { createEffect, ofType, Actions } from '@ngrx/effects';
import { concatMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { PersonnelDataService } from '../../services/personnel.service';
import { Personnel } from '../../models/personnel';
import { personnelActions } from '../actions/personnel.actions';

@Injectable()
export class PersonnelEffects {
  constructor(
    private actions$: Actions,
    private personnelDataService: PersonnelDataService
  ) {}

  loadSelectedPersonnel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personnelActions.LoadSelectedPersonnel),
      tap(() => console.log(' effect executed loadSelectedPersonnel$')),
      concatMap((action) =>
        this.personnelDataService.loadSelectedPersonnel(action.projectId).pipe(
          map((selectedPersonnel: Personnel[]) =>
            personnelActions.LoadSelectedPersonnelSuccess({
              SelectedPersonnel: selectedPersonnel,
            })
          ),
          catchError((err) =>
            of(personnelActions.LoadSelectedPersonnelFailure({ Error: err }))
          )
        )
      )
    )
  );

  createPersonnel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personnelActions.AddPersonnel),
      tap(() => console.log(' effect executed createPersonnel$')),
      concatMap((action) =>
        this.personnelDataService.createPersonnel(action.Personnel).pipe(
          map((personnel: Personnel) =>
            personnelActions.AddPersonnelSuccess({ Personnel: personnel })
          ),
          catchError((err) =>
            of(personnelActions.AddPersonnelFailure({ Error: err }))
          )
        )
      )
    )
  );

  updatePersonnel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personnelActions.UpdatePersonnel),
      tap(() => console.log(' effect executed updatePersonnel$')),
      concatMap((action) =>
        this.personnelDataService.updatePersonnel(action.Personnel).pipe(
          map((personnel: Personnel) =>
            personnelActions.UpdatePersonnelSuccess({ Personnel: personnel })
          ),
          catchError((err) =>
            of(personnelActions.UpdatePersonnelFailure({ Error: err }))
          )
        )
      )
    )
  );

  setPersonnelLoadedStatus$ = createEffect(() => this.actions$.pipe(
    ofType(personnelActions.setPersonnelloadedStatus),
    tap(() => console.log('effect executed setPersonnelLoaded$')),
    map(action => {
      console.log('setting PersonnelLoading status');
      return personnelActions.setPersonnelLoadedStatusSuccess({loaded: action.loaded});
    })
  )
 );

 setSavePersonnelDialog$ = createEffect(() => this.actions$.pipe(
   ofType(personnelActions.setSavePersonnelDialog),
   tap(() => console.log('effect executed setSavePersonnelDialog$')),
   map( action => {
     console.log('setting SavePersonnel Dialog');
     return personnelActions.setSavePersonnelDialogSuccess({Dialog: action.showDialog});
   })
  )
 );

}
