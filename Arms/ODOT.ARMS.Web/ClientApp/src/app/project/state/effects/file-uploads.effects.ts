import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, concatMap, map, tap, catchError } from 'rxjs/operators';
import { fileUploadsActionTypes } from '../actions/file-uploads.actions';
import { SaveService } from '../../services/save.service';
import { UploadsService } from '../../services/uploads.service';
import { of } from 'rxjs';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { EventUpload } from '../../models/event-upload';
import { HttpResponse } from '@angular/common/http';



@Injectable()
export class FileUploadsEffects {

  constructor(private uploadService: UploadsService, private actions$: Actions, private notificationService: kendonotificationservice) { }

  updateUpload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileUploadsActionTypes.updateUpload),
      concatMap(action => this.uploadService.updateUpload(action.upload).pipe(
        map((upload: EventUpload) => {
          this.notificationService.showSuccess('Update Event Successful');
          return fileUploadsActionTypes.updateUploadSuccess({ upload });
        }),
        catchError(err => {
          this.notificationService.showError('Update Event failed');
          return of(fileUploadsActionTypes.updateUploadFailure({ error: err }));
        })
      )
      )
    )

  );

  setSelectedUploadSrc$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileUploadsActionTypes.setSelectedUploadSrc),
      concatMap(action => this.uploadService.getUploadsBySourceId(action.src.srcId).pipe(
        map((uploads: EventUpload[]) => {
          return fileUploadsActionTypes.setSelectUploadSrcSuccess({ uploads });
        }),
        catchError(err => {
          return of(fileUploadsActionTypes.setSelectUploadSrcFailure({ error: err }));
        })
      )
      )
    )
  );


  downloadFile = createEffect(() =>
    this.actions$.pipe(
      ofType(fileUploadsActionTypes.DownloadFileById),
      switchMap((action) =>
        this.uploadService.DownloadFileById(action.projAltId, action.srcId, action.uploadId).pipe(
          tap((response: HttpResponse<ArrayBuffer>) => SaveService.saveFile(response)),
          catchError(err => {
            this.notificationService.showError('File download failed');
            return of(fileUploadsActionTypes.DownloadFileByIdFailure({ error: err }));
          })))),
    { dispatch: false }
    // FeatureActions.actionOne is not dispatched
  );

}
