import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ContactAgencyRaw } from '../models/contacts.agency';



@Component({
    selector: 'app-kendo-grid-editagency-form',
    templateUrl: './editagency.component.html',
    styles: []
})

export class GridEditAgencyComponent implements OnInit {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    public active = false;
    public editagencyForm: FormGroup;
    @Input()  model;
    @Input()  isActive = false;
    @Output() cancel: EventEmitter < any > = new EventEmitter();
    @Output() save: EventEmitter <ContactAgencyRaw> = new EventEmitter();

    constructor(private fb: FormBuilder ) {

         this.editagencyForm = this.fb.group({
            ContactAgencyId: [],
            AgencyID: [''],
            Address1: ['', Validators.pattern('[a-zA-Z ]*')],
            Address2: ['', Validators.pattern('[a-zA-Z ]*')],
            City: ['', Validators.pattern('[a-zA-Z ]*')],
            AgencyName: [''],
            State: ['', Validators.pattern('[a-zA-Z ]*')],
            Zip: ['', Validators.pattern('[0-9]{5}')],
            ZipExtCd: ['', Validators.pattern('[0-9]{5}')],
            BusinessPhone: ['', Validators.pattern('[0-9]')],
            BusinessPhoneExt: ['', Validators.pattern('[0-9]')],
            MobilePhone: [''],
            ActiveInd: [''],
            ContactId: [''],
            UserId: [''],
            Entry_Date: new Date()
        });
    }


  ngOnInit() {
      console.log('child component clicked');
      this.active = this.isActive;
      this.LoadEditAgencyForm(this.model);
  }


    LoadEditAgencyForm(agencyedit: ContactAgencyRaw) {
      console.log(agencyedit);

      this.editagencyForm.patchValue({
            ContactAgencyId: Object(agencyedit)['contactAgencyId'],
            AgencyID: Object(agencyedit)['agencyID'],
            Address1: Object(agencyedit)['address1'],
            Address2: Object(agencyedit)['address2'],
            City: Object(agencyedit)['city'],
            AgencyName: Object(agencyedit) ['agencyName'],
            State: Object(agencyedit)['state'],
            Zip: Object(agencyedit)['zip'],
            ZipExtCd: Object(agencyedit)['zipExtCd'],
            BusinessPhone: Object(agencyedit)['businessPhone'],
            BusinessPhoneExt: Object(agencyedit)['businessPhoneExt'],
            MobilePhone: Object(agencyedit)['mobilePhone'],
            ActiveInd: Object(agencyedit)['activeInd'],
            ContactId: Object(agencyedit)['contactId'],
            UserId: Object(agencyedit)['userId'],
            Entry_Date: Object(agencyedit)['entry_Date']
      });
      console.log(this.editagencyForm.value);
    }

    public onSave(e): void {
        e.preventDefault();
        this.save.emit(this.editagencyForm.value);
        this.active = false;

    }
    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();
    }

    private closeForm(): void {
        this.active = false;
        this.cancel.emit();
    }

}
