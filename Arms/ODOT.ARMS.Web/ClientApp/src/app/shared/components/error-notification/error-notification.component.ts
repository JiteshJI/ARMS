import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styles: [``]
})
export class ErrorNotificationComponent implements OnInit {
  @Input()
  set validationErrors(validationErrors: any) {
    this.setErrors(validationErrors);
  }

  errors: Array<string> = [];

  constructor() { }

  ngOnInit() {
  }

  setErrors(validationErrors: any) {
    if (validationErrors) {
      for (var fieldName in validationErrors) {
        if (validationErrors.hasOwnProperty(fieldName)) {
          this.errors.push(validationErrors[fieldName]);
        }
      }
    }
    else {
      this.errors = [];
    }
  }

}
