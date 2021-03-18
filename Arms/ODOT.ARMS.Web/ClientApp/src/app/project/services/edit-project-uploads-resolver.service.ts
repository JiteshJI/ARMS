import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable, of, combineLatest, forkJoin } from 'rxjs';
import { EventUpload } from '../models/event-upload';
import { Store, select } from '@ngrx/store';
import * as fromProject from "../state/reducers";
import * as fromProjectUploads from '../state/reducers/edit-project-uploads-page.reducer';
import { loadEditPrjUploadsPagesSuccess } from '../state/actions/edit-project-uploads-page.actions';
import { map, tap, catchError, switchMap, take, filter } from 'rxjs/operators';
import { UploadsService} from './uploads.service';

@Injectable({
  providedIn: 'root'
})
export class EditProjectUploadsResolverService {

  projAltId$ : Observable<string>;

  constructor(private route: ActivatedRoute,
    public projectStore: Store<fromProject.State>,
    public projectUploadsStore: Store<fromProjectUploads.State>,
    public uploadsService: UploadsService
  )
  {
    this.projAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
  }


  loadProjectUploads(projAltId: string): Observable<boolean> {
    return forkJoin(
      this.uploadsService.getUploadsByProjectAltId(projAltId)
    ).pipe(
      tap((data: [EventUpload[]]) => {
        console.info('Resolver uploads in pipe');
        console.info(data[0]);
        this.projectUploadsStore.dispatch(loadEditPrjUploadsPagesSuccess({ files: data[0]}))
      }),
      map((data: [EventUpload[]]) => !!data[0]),
      catchError(() => {
        //this.coreStore.dispatch(navigateToNotFound());
        return of(false);
      })
    );

  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest(
      this.projAltId$
    ).pipe(
      take(1),
      switchMap(([projAltId]: [string]) => {
        console.info('Resolver Project Uploads Loads');
        return this.loadProjectUploads(projAltId);
      })
    );
  }

  /*
  waitForReferenceDataToLoad(): Observable<boolean> {
    return this.coreStore.pipe(
      select(fromCore.getProjectEventReferenceDataLoaded),
      tap(loaded => {
        if (!loaded) {
          console.info('waitForReferenceDataToLoad');
          this.coreStore.dispatch(loadProjectEventsReferenceData());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }*/
}
