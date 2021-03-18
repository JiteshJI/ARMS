import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var val = value;
    if (!val)
      return '';
    var valType = typeof (val);
    // Get rid of all non-numeric characters
    if (valType === 'string') {
      val = val.replace(/[^0-9]/g, '');
    } else if (valType == 'number') {
      val = val + '';
    } else {
      return '';
    }
    if (val.length == 10) {
      var area, firstThree, lastFour;
      area = val.substr(0, 3);
      firstThree = val.substr(3, 3);
      lastFour = val.substr(6);
      return `(${area}) ${firstThree}-${lastFour}`;
    }
    return value;
  }

}
