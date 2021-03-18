import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate'
})
export class StringToDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return new Date(value);
    }
    return value;
  }

}
