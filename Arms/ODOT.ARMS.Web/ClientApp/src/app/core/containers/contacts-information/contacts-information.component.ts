import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contacts-information',
  templateUrl: './contacts-information.component.html',
  styles: []
})
export class ContactsInformationComponent implements OnInit {

  /*
  contactsInfo = this.fb.group({
    title: [''],
    firstName: [''],
    lastName: [''],
    emailAddress: [''],
    mobilePhone: [''],
    contactstatus: [''],
    agencyInfo: this.fb.group({
    agencyName: [''],
    businessAddress1: [''],
    address2: [''],
    city: [''],
    state: [''],
    zipCode: [''],
    businessPhone: [''],
    status: ['']
    })
  });
  */
  // Do not initially show the Dialog
  public opened = false;

  public close() {
    this.opened = false;
  }

  public save() {
    this.opened = false;
  }

  public open() {
    this.opened = true;
  }

  public openUpdateFormDialog(obj)  {

  }

  public sortChange(obj) {

  }
  public groupChange(obj) {

  }

  public removeFormGridHandler(obj) {

  }

  //constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
