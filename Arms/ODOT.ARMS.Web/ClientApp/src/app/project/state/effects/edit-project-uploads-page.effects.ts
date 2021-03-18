import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType  } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UploadsService } from '../../services/uploads.service';
import { of } from 'rxjs';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { editProjectUploadsPageActionTypes } from '../actions/edit-project-uploads-page.actions';


@Injectable()
export class EditProjectUploadsPageEffects {

  constructor(private uploadService: UploadsService, private actions$: Actions, private notificationService: kendonotificationservice) { }

  deletePrjFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editProjectUploadsPageActionTypes.deletePrjFile),
      switchMap((action) => {
        console.info('deletePrjFile$');
        return this.uploadService.deleteUpload(action.eventUploadId).pipe(
          map((eventUploadId: string) => {
            this.notificationService.showSuccess('File Deleted Successfully');
            return editProjectUploadsPageActionTypes.deletePrjFileSuccess({ eventUploadId: action.eventUploadId });
          }),
          catchError(error => {
            this.notificationService.showError('File Delete failed');
            return of(editProjectUploadsPageActionTypes.deletePrjFileFailure({ error: error }));
          })
        )
      })
      )
  });

}
