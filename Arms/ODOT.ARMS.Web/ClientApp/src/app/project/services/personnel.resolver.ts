import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromPersonnel from '../state/reducers/personnel.reducer';
import * as fromPersonnelActions from '../state/actions/personnel.actions';
import * as fromProject from '../state/reducers/index';
import { take, tap, catchError, filter} from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ProjectService } from './project.service';
import * as fromPersonnelSelector from '../state/selector/personnel.selectors';

@Injectable({
  providedIn: 'root',
})
export class PersonnelResolverService implements Resolve<any> {
  projAltId: string;
  constructor(
    private projectStore: Store<fromProject.State>,
    private personnelStore: Store<fromPersonnel.PersonnelState>,
    private projService: ProjectService
  ) {}
  resolve(): Observable<any> {
    console.log('loading personnel resolver');
    const projectId$ = this.projectStore.select(fromProject.getProjectId);
    const projId = this.projService.getParam(projectId$);
    return this.loadPersonnelInfo(projId.toString()).pipe(
      tap(() => {
        return this.personnelStore.dispatch(fromPersonnelActions.setPersonnelloadedStatus({ loaded: false }));
      }),
      catchError(() => {
        console.log('error occured during personnel resolver');
        return of(false);
      })
    );
  }

  loadPersonnelInfo(projId: string): Observable<any> {
    return forkJoin({
      personnel: this.loadPersonnelData(projId),
      contactRoles:this.projService.getContactRoles(),
      contactNames:this.projService.getContactNames()
    }).pipe(
      catchError(() => {
        console.log('error occured during personnel resolver in method loadPersonnelInfo');
        return of(false);
      })
    );
  }
  loadPersonnelData(projId: string): Observable<boolean> {
    return this.personnelStore.pipe(
      select(fromPersonnelSelector.getLoaded),
      tap((getLoaded) => {
        if (!getLoaded) {
          this.personnelStore.dispatch(
            fromPersonnelActions.LoadSelectedPersonnel({ projectId: projId })
          );
        }
      }),
      filter((getLoaded) => !!getLoaded),       /* '!!' converts a non boolean value to boolean value .  !! always returns false for empty strings or objects */
      take(1)
    );
  }
}
