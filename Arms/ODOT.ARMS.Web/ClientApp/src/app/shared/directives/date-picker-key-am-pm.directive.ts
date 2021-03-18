import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { DatePickerComponent } from '@progress/kendo-angular-dateinputs';

@Directive({
  selector: '[appDatePickerKeyAmPm]'
})
export class DatePickerKeyAmPmDirective implements OnDestroy {
  private input: any;
  private amPmStartIndex: number;

  constructor(
    private datePickerComponent: DatePickerComponent,
    private elRef: ElementRef) {
  }

  ngOnInit() {
    this.amPmStartIndex = this.datePickerComponent.format.toString().indexOf('a');

    // If no AM/PM portion then no need to attach listener
    if(this.amPmStartIndex < 0) return;
    this.input = this.elRef.nativeElement.querySelector('input');
    this.input.addEventListener('keypress', this.onKeyPress.bind(this));
  }
  // If the user is editing the AM/PM portion of the date time then they should
  // be able to use the 'a' or 'p' keys to set the value
  onKeyPress (event) {
    if (this.input.selectionStart == this.amPmStartIndex) {
      let dt = this.datePickerComponent.value;
      // Can only set the AM/PM if there is a date set
      if (!dt || !dt.getHours) return;

      if (event.key == 'a' && dt.getHours() >= 12) {
        dt.setHours(dt.getHours() - 12);
        this.datePickerComponent.writeValue(dt);
      } else if (event.key == 'p' && dt.getHours() < 12) {
        dt.setHours(dt.getHours() + 12);
        this.datePickerComponent.writeValue(dt);
      }
    }
  }

  ngOnDestroy() {
    this.input.removeEventListener('keypress', this.onKeyPress.bind(this));
  }
}
