import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: boolean, trueText: string, falseText: string): any {
    trueText = trueText || 'Yes';
    falseText = falseText || 'No';
    return value ? trueText : falseText;
  }

}
