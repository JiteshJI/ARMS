import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { ProjectService } from '../../project/services/project.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateFields {
  constructor(private projectService: ProjectService) { }

  validateValues(validationtype: string, isNew: boolean): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const error = { 'valueExists': true };
      if (isNew) {
        return this.projectService.validateValues(validationtype, control.value).pipe(
          // debounceTime(800),
          take(1),
          map(value => value ? error : null),
          catchError(() => of(null))
        );
      }
      return of(null);
    };
  }
}