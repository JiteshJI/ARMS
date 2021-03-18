import { Component, OnInit, EventEmitter, Input, Output,} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styles: [
  ],
})
export class AdminNotificationComponent implements OnInit {
  public maxChars = 255;
  public notificationForm: FormGroup;
  @Output() saveNotificationTxt = new EventEmitter<string>();
  @Input() notificationTxt: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.notificationForm = this.fb.group({
      notificationTxt: this.notificationTxt
    });
  }

  CheckNotificationTextLength() {
    var length = 0;
    if (this.notificationForm.controls.notificationTxt.value) {
      length = this.notificationForm.controls.notificationTxt.value.length;
    }
    return length;
  }

}
