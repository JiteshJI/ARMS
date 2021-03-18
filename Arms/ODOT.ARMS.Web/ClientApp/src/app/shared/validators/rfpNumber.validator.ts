import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, debounceTime, take, switchMap } from 'rxjs/operators';
import { ProjectService } from '../../project/services/project.service';

@Injectable({
  providedIn: 'root'
})
export class RfpValidator {

  constructor(private projectService: ProjectService) { }

     rfpNumberExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const error = { 'rfpNumberExists': true };
      return control.valueChanges.pipe(
        debounceTime(800),
        take(1),
        switchMap(() =>
          this.projectService.getRfpNumber(control.value).pipe(
            map(rfp => rfp ? error : null))
        )
      );
    };
  }
}
