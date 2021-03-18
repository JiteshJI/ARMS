import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

@Component({
    selector: 'link-dialog',
    templateUrl: './link-dialog.component.html'
})
export class LinkDialog implements OnInit {

  @Output() public createLink: EventEmitter<any> = new EventEmitter<any>();
  public opened = false;
  public canInsert = false;
  public urlForm: FormGroup;

  get url(): AbstractControl { return this.urlForm.get('url'); }
  get urlTitle(): AbstractControl { return this.urlForm.get('urlTitle'); }
  get newWindow(): AbstractControl { return this.urlForm.get('newWindow'); }

  public close(): void {
      this.opened = false;
  }

  public open(): void {
      this.opened = true;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
      this.urlForm = this.fb.group({
          url: [''],
          urlTitle: [''],
          newWindow: [false],
      });
  }
}
