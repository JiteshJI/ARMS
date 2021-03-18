import * as moment from 'moment';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ValidDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const dateVal = control.value;

    if (dateVal) {
      return moment(dateVal, 'MM/DD/YYYY', true).isValid() ? null : { invalidDate: true }
    }

    return null;
  };
}
