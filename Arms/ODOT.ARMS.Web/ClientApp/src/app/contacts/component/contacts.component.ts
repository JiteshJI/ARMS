import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ContactItemRaw, Item } from '../models/contacts.items';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GridDataResult, DataBindingDirective, RowClassArgs } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';

/* Ngrx */
import { Store, select } from '@ngrx/store';
import * as fromContacts from '../state/reducers/contacts.reducer'; /* getting the entire state and properties from reducer */
import * as fromContactActions from '../state/actions/contacts.actions';
import { ContactsDataService } from '../services/contactInfo.data.service';
import { ContactAgencyRaw } from '../models/contacts.agency';
import { ContactAgencyDataService } from '../services/contactagencyinfo.service';
import { Observable } from 'rxjs';
import { State } from '@progress/kendo-data-query';
import { AdministrationDataService } from '../../agency/services/administration-data.service';
import { AgencyDetailRaw } from 'src/app/agency/models/administration-categories';
import { PhonePipe } from 'src/app/shared/pipes/phone.pipe';



@Component({
  selector: 'app-contacts-information',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public view: Observable<GridDataResult>;
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  @ViewChild('searchBox') searchBox: ElementRef;

  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public contactsInfoForm: FormGroup;
  public contactsEditForm: FormGroup;
  public contactAgencyAddForm: FormGroup;
  public contactAgencyEditForm: FormGroup;
  public agencyInfoForm: FormGroup;
  public contactidforagency: string;
  public contact: Array<ContactItemRaw>;
  public contactAgency: Array<ContactAgencyRaw>;
  public editcontactAgency: ContactAgencyRaw;
  public addcontactAgency: ContactAgencyRaw;
  public agencyDetail: Array<AgencyDetailRaw>;
  public isNew: boolean;
  public editAgencyDialogOpen: boolean;
  public IntializeContact: ContactItemRaw;
  public currentContact: ContactItemRaw;
  public Editedcontact: ContactItemRaw;
  public gridData: any[];
  public gridView: any[];
  public contactGridData: any[];
  public ActiveIn: Array<Item> = [
    { text: 'Active', value: 'A' },
    { text: 'Inactive', value: 'I' }
  ];

  public OrilOptions: Array<Item> = [
    { text: 'Yes', value: 'Y' },
    { text: 'No', value: 'N' }
  ];

  /* specifying the  global state(fromContacts.State)  from the productreducer - if we used ony contactState -
  we would'nt have been able to access the State of other modules*/



  constructor(private fb: FormBuilder, private store: Store<fromContacts.State>,
    private myAdministrationDataService: AdministrationDataService) {

    this.contactsInfoForm = this.fb.group({
      ContactID: [''],
      BusinessTitle: ['Research Associate', Validators.pattern('[a-zA-Z ]*')],
      FirstName: ['', Validators.pattern('[a-zA-Z ]*')],
      LastName: ['', Validators.pattern('[a-zA-Z ]*')],
      EmailAddress: ['', Validators.email],
      OrilBrdMbr: [''],
      ActiveInd: [''],
      Entry_date: ['']
    });

    this.contactsEditForm = this.fb.group({
      ContactID: [''],
      BusinessTitle: ['', Validators.pattern('[a-zA-Z ]*')],
      FirstName: ['', Validators.pattern('[a-zA-Z ]*')],
      LastName: ['', Validators.pattern('[a-zA-Z ]*')],
      EmailAddress: ['', Validators.email],
      OrilBrdMbr: [''],
      ActiveInd: [''],
      Entry_date: ['']
    });

    this.contactAgencyEditForm = this.fb.group({
      ContactAgencyId: [],
      AgencyID: [''],
      Address1: [''],
      Address2: [''],
      City: ['', Validators.pattern('[a-zA-Z ]*')],
      AgencyName: [''],
      State: ['', Validators.pattern('[a-zA-Z ]*')],
      Zip: ['', Validators.pattern('[0-9]{5}')],
      ZipExtCd: ['', Validators.pattern('[0-9]{5}')],
      BusinessPhone: ['*'],
      BusinessPhoneExt: ['', Validators.pattern('[0-9]')],
      MobilePhone: [''],
      ActiveInd: [''],
      ContactId: [''],
      UserId: [''],
      Entry_Date: new Date()
    });

    this.contactAgencyAddForm = this.fb.group({
      ContactAgencyId: [],
      AgencyID: [''],
      Address1: [''],
      Address2: [''],
      City: ['', Validators.pattern('[a-zA-Z ]*')],
      AgencyName: [''],
      State: ['', Validators.pattern('[a-zA-Z ]*')],
      Zip: ['', Validators.pattern('[0-9]{5}')],
      ZipExtCd: ['', Validators.pattern('[0-9]{5}')],
      BusinessPhone: ['*'],
      BusinessPhoneExt: ['', Validators.pattern('[0-9]')],
      MobilePhone: [''],
      ActiveInd: [''],
      ContactId: [''],
      UserId: [''],
      Entry_Date: new Date()
    });
  }
  // Do not initially show the Dialog
  public opened = false;
  public ContactAgencyAddDialogOpened = false;
  public EditContactDialogOpened = false;
  public EditContactAgencyDialogOpened = false;


  public close(value: string) {
    this.opened = false;
    console.log(value);
  }

  public ContactAgencyAddDialogClose(value: string) {
    this.ContactAgencyAddDialogOpened = false;
    console.log(value);
  }

  public EditContactDialogClose(value: string) {
    this.EditContactDialogOpened = false;
    console.log(value);
  }

  public EditContactAgencyDialogClose(value: string) {
    this.EditContactAgencyDialogOpened = false;
    console.log(value);
  }
  public save() {
    this.opened = false;
    if (this.contactsInfoForm.dirty && this.contactsInfoForm.valid) {
      console.log(this.contactsInfoForm.value);
      /*dispatching an action to the effect for the HTTP post */
      this.store.dispatch(new fromContactActions.CreateNewContact(this.contactsInfoForm.value));
      // this.store.dispatch(new fromContactActions.SaveCurrentContact(this.contactsInfoForm.value));
    }
  }

  public saveAddContactAgency() {
    this.ContactAgencyAddDialogOpened = false;
    console.log(this.contactAgencyAddForm.value);
    const zipretrieved = this.contactAgencyAddForm.controls['Zip'].value.substring(0, 5);
    const zipextretrieved = this.contactAgencyAddForm.controls['Zip'].value.substring(5, 9);
    this.contactAgencyAddForm.patchValue({
      Zip: zipretrieved,
      ZipExtCd: zipextretrieved,
    });
    this.store.dispatch(new fromContactActions.AddNewContactAgency(this.contactAgencyAddForm.value));
  }



  public savEditedContactAgency(obj) {
    this.EditContactAgencyDialogOpened = false;
    /* if (this.contactAgencyEditForm.dirty && this.contactAgencyEditForm.valid) { */
    console.log(this.contactAgencyEditForm.value);
    const zipretrieved = this.contactAgencyEditForm.controls['Zip'].value.substring(0, 5);
    const zipextretrieved = this.contactAgencyEditForm.controls['Zip'].value.substring(5, 9);
    this.contactAgencyEditForm.patchValue({
      Zip: zipretrieved,
      ZipExtCd: zipextretrieved,
    });
    this.store.dispatch(new fromContactActions.UpdateContactAgency(this.contactAgencyEditForm.value));
    /* } */
  }
  public saveEditedContact() {
    this.EditContactDialogOpened = false;
    if (this.contactsEditForm.dirty && this.contactsEditForm.valid) {
      console.log(this.contactsEditForm.value);
      /*dispatching an action to the effect for the HTTP post */
      this.store.dispatch(new fromContactActions.UpdateContact(this.contactsEditForm.value));
    }
  }

  /*
  public zipCodeParse(contactagencyedit: FormGroup): FormGroup
   {

    const zipretrieved = contactagencyedit.controls['Zip'].value.substring(0, 5);
    const zipextretrieved = contactagencyedit.controls['Zip'].value.substring(5, 9);
    contactagencyedit.patchValue({
     Zip: zipretrieved,
     ZipExtCd: zipextretrieved,
    });
    return contactagencyedit;

  }
  */
  public openAddFormDialog(obj) {

  }

  public openUpdateFormDialog(obj) {

  }

  public sortChange(obj) {

  }
  public groupChange(obj) {

  }

  public removeFormGridHandler(obj) {

  }

  ngOnInit() {

    this.loadContacts();
  }
  /* creating on click function to handle click event for A-F button */
  public onContactClickAF() {
    //console.log('Contact A-F button is clicked');
    //this.store.dispatch(new fromContactActions.ShowContactsAF);
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'lastName',
            operator: 'startswith',
            value: 'A'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'B'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'C'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'D'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'E'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'F'
          }
        ],
      }
    }).data;
    //console.log(this.gridView);

    this.dataBinding.skip = 0;

  }

  /* creating on click function to handle click event for G-L button */
  public onContactClickGL() {
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'lastName',
            operator: 'startswith',
            value: 'G'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'H'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'I'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'J'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'K'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'L'
          }

        ],
      }
    }).data;
    //console.log(this.gridView);

    this.dataBinding.skip = 0;
  }

  /* creating on click function to handle click event for M-R button */
  public onContactClickMR() {

    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'lastName',
            operator: 'startswith',
            value: 'M'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'N'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'O'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'P'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'Q'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'R'
          }

        ],
      }
    }).data;
    //console.log(this.gridView);

    this.dataBinding.skip = 0;
  }


  /* creating on click function to handle click event for S-Z button */
  public onContactClickSZ() {
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'lastName',
            operator: 'startswith',
            value: 'S'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'T'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'U'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'V'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'W'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'X'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'Y'
          },

          {
            field: 'lastName',
            operator: 'startswith',
            value: 'Z'
          }

        ],
      }
    }).data;
    //console.log(this.gridView);

    this.dataBinding.skip = 0;
  }

  //===================================================================
  //
  // Clear the existing filter, if it exists
  //
  // Hank
  //
  // Perhaps Hank deserves a cookie
  //
  //===================================================================
  public onClear(): void {

    this.searchBox.nativeElement.value = '';

    this.gridView = process(this.gridData, {
      filter: {
        logic: 'and',
        filters: [],
      }
    }).data;
    this.dataBinding.skip = 0;
  }

  public onAllContactsClick(event) {
    console.log('Get all Contacts button clicked');
    console.log(event);
  }

  public onContactAddClick() {
    this.opened = true;
    console.log('Contact Add button clicked');
    this.store.dispatch(new fromContactActions.InitializeCurrentContact(this.IntializeContact));
    this.contactsInfoForm.reset();

  }

  /* Method for Adding a new Contact Agency  */
  public onContactAgencyAddClick(contact: FormGroup) {
    this.ContactAgencyAddDialogOpened = true;
    console.log('Contact Agency Add button clicked');
    this.contactAgencyAddForm.reset();
    console.log(contact.value);
    this.myAdministrationDataService.getAgencyDetail().subscribe(agencydetails => this.agencyDetail = agencydetails.filter(e => e.agencyStatusInd != 'I'));
    this.displayAddNewContactAgencyForm(contact.controls['ContactID'].value, contact.controls['Entry_date'].value);
    console.log(this.contactAgencyAddForm.value);
    console.log('Agency detail value');
    console.log(this.agencyDetail.filter(e => e.activInd));
    /* use for debugging a form */
    this.contactAgencyAddForm.valueChanges.subscribe(
      value => {
        console.log(JSON.stringify(value));
      });


  }

  public displayAddNewContactAgencyForm(contactid: string, EntryDate: string) {
    this.contactAgencyAddForm.patchValue({
      ContactId: contactid,
      Entry_Date: EntryDate,
    });
  }

  public onEditContactClick() {
    this.EditContactDialogOpened = true;
    console.log('Edit Contact button clicked');
  }

  public onEditContactAgencyClick() {
    this.EditContactAgencyDialogOpened = true;
    console.log('Edit Contact Agency button clicked');
  }
  /*method used for setting the gridData of the kendo Grid to the local contact variable. */
  public getValues() {
    this.gridData = this.contact;
    console.log('contacts' + JSON.stringify(this.contact));
    console.log('GridData' + JSON.stringify(this.gridData));
  }

  /*method used for setting the contactGridData of the kendo Grid to the local contactAgency variable. */
  public getContactAgencyValues() {
    this.contactGridData = this.contactAgency;
    console.log('contact agencies' + JSON.stringify(this.contactAgency));
    console.log('contactGridData' + JSON.stringify(this.contactGridData));
  }


  /* Method used to
  1. dispatch an action which used by an effect to retrieve data.
  2. subscribe to the state and get the appropriate slice of state for the contacts property in state. */
  public loadContacts() {
    this.store.dispatch(new fromContactActions.LoadContacts());
    this.store.pipe(select(fromContacts.getContacts)).subscribe(
      contacts => {
        (this.contact = contacts);
        console.log('Contact array' + JSON.stringify(this.contact));
        this.getValues();
        this.gridView = this.gridData;
      });
  }
  /*
  onSubmit(Form: FormGroup) {
    console.log(this.contactsInfoForm.value);
  }
  */

  /* Method used to
 1. dispatch an action which used by an effect to retrieve data.
 2. subscribe to the state and get the appropriate slice of state for the contacts property in state. */
  public loadContactAgencies(contactid: string) {
    this.store.dispatch(new fromContactActions.LoadContactAgency(contactid));
    this.store.pipe(select(fromContacts.getContactAgencies)).subscribe(
      contactAgencies => {
        (this.contactAgency = contactAgencies);
        console.log('ContactAgencyArray' + JSON.stringify(this.contactAgency));
        this.getContactAgencyValues();
      });
  }




  public EditContactForm(obj: any) {
    this.onEditContactClick();
    console.log(obj);
    this.displayEditContactForm(obj);
    this.contactidforagency = String(Object(obj)['contactID']);
    this.loadContactAgencies(this.contactidforagency);
    /* use for debugging a form
  this.contactsEditForm.valueChanges.subscribe(
    value => {
       console.log(JSON.stringify(value));
  });
  */

  }

  public displayEditContactForm(obj: any) {
    this.contactsEditForm.patchValue({
      ContactID: String(Object(obj)['contactID']),
      BusinessTitle: String(Object(obj)['businessTitle']),
      EmailAddress: String(Object(obj)['emailAddress']),
      FirstName: String(Object(obj)['firstName']),
      LastName: String(Object(obj)['lastName']),
      OrilBrdMbr: String(Object(obj)['orilBrdMbr']),
      ActiveInd: String(Object(obj)['activeInd']),
      Entry_date: new Date(String((Object(obj)['entry_date'])))
    });
  }


  public EditContactAgencyForm(obj: any) {
    this.onEditContactAgencyClick();
    console.log(obj);
    this.displayEditContactAgencyForm(obj);

  }

  public displayEditContactAgencyForm(obj: any) {
    this.contactAgencyEditForm.patchValue({
      ContactAgencyId: String(Object(obj)['contactAgencyId']),
      AgencyID: String(Object(obj)['agencyID']),
      Address1: String(Object(obj)['address1']),
      Address2: String(Object(obj)['address2']),
      City: String(Object(obj)['city']),
      AgencyName: String(Object(obj)['agencyName']),
      State: String(Object(obj)['state']),
      Zip: String(Object(obj)['zip']) + String(Object(obj)['zipExtCd']),
      ZipExtCd: String(Object(obj)['zipExtCd']),
      BusinessPhone: String(Object(obj)['businessPhone']),
      BusinessPhoneExt: String(Object(obj)['businessPhoneExt']),
      MobilePhone: String(Object(obj)['mobilePhone']),
      ActiveInd: String(Object(obj)['activeInd']),
      ContactId: String(Object(obj)['contactId']),
      UserId: String(Object(obj)['userId']),
      Entry_Date: new Date(String((Object(obj)['entry_Date'])))
    });
  }



  /* Future refactor the contact agency to use parent child component architechture instead of directly doing it in the parent */
  public cancelAgencyHandler() {
    this.editcontactAgency = undefined;
  }

  public DeleteContact(obj: any) {
    if (obj.activeInd == 'I') {
      console.log('Make Active');
      //obj.activeInd = 'A';
    }
    else {
      console.log('Make Inactive');
      //obj.activeInd = 'I';
    }
  }

  public rowCallback = (context: RowClassArgs) => {
    if (context.dataItem.activeInd === 'I') {
      return {
        deleteEven: true,
        deleteOdd: true
      };
    }
  }

  public saveAgencyHandler(contactagency: ContactAgencyRaw) {
    console.log('returned value from child component');
    console.log(contactagency);
    this.editAgencyDialogOpen = false;
  }

  public editAgencyHandler({ dataItem }) {
    this.editcontactAgency = dataItem;
    console.log('edit agency button clicked');
    this.editAgencyDialogOpen = true;
  }

  /* https://angular.io/api/core/ViewChild   @ViewChild(DataBindingDirective, { static: false }) dataBinding: DataBindingDirective;
       */
  public onFilter(inputValue: string): void {
    console.log(inputValue);
    console.log(this.gridView);
    this.gridView = process(this.gridData, {    /* https://www.telerik.com/kendo-angular-ui/components/dataquery/api/process/ */
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'lastName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'firstName',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;
    console.log(this.gridView);

    this.dataBinding.skip = 0;
  }
}

//still need to work on
//@Component({
//  selector: 'app-kendo-grid-editagency-form',
//  templateUrl: './editagency.component.html',
//  styles: []
//})

//export class GridEditAgencyComponent implements OnInit {
//  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
//  //Add 'implements OnInit' to the class.

//  public active = false;
//  public editagencyForm: FormGroup;
//  @Input() model;
//  @Input() isActive = false;
//  @Output() cancel: EventEmitter<any> = new EventEmitter();
//  @Output() save: EventEmitter<ContactAgencyRaw> = new EventEmitter();

//  constructor(private fb: FormBuilder) {

//    this.editagencyForm = this.fb.group({
//      ContactAgencyId: [],
//      AgencyID: [''],
//      Address1: ['', Validators.pattern('[a-zA-Z ]*')],
//      Address2: ['', Validators.pattern('[a-zA-Z ]*')],
//      City: ['', Validators.pattern('[a-zA-Z ]*')],
//      AgencyName: [''],
//      State: ['', Validators.pattern('[a-zA-Z ]*')],
//      Zip: ['', Validators.pattern('[0-9]{5}')],
//      ZipExtCd: ['', Validators.pattern('[0-9]{5}')],
//      BusinessPhone: ['', Validators.pattern('[0-9]')],
//      BusinessPhoneExt: ['', Validators.pattern('[0-9]')],
//      MobilePhone: [''],
//      ActiveInd: [''],
//      ContactId: [''],
//      UserId: [''],
//      Entry_Date: new Date()
//    });
//  }


//  ngOnInit() {
//    console.log('child component clicked');
//    this.active = this.isActive;
//    this.LoadEditAgencyForm(this.model);
//  }


//  LoadEditAgencyForm(agencyedit: ContactAgencyRaw) {
//    console.log(agencyedit);

//    this.editagencyForm.patchValue({
//      ContactAgencyId: Object(agencyedit)['contactAgencyId'],
//      AgencyID: Object(agencyedit)['agencyID'],
//      Address1: Object(agencyedit)['address1'],
//      Address2: Object(agencyedit)['address2'],
//      City: Object(agencyedit)['city'],
//      AgencyName: Object(agencyedit)['agencyName'],
//      State: Object(agencyedit)['state'],
//      Zip: Object(agencyedit)['zip'],
//      ZipExtCd: Object(agencyedit)['zipExtCd'],
//      BusinessPhone: Object(agencyedit)['businessPhone'],
//      BusinessPhoneExt: Object(agencyedit)['businessPhoneExt'],
//      MobilePhone: Object(agencyedit)['mobilePhone'],
//      ActiveInd: Object(agencyedit)['activeInd'],
//      ContactId: Object(agencyedit)['contactId'],
//      UserId: Object(agencyedit)['userId'],
//      Entry_Date: Object(agencyedit)['entry_Date']
//    });
//    console.log(this.editagencyForm.value);
//  }

//  public onSave(e): void {
//    e.preventDefault();
//    this.save.emit(this.editagencyForm.value);
//    this.active = false;

//  }
//  public onCancel(e): void {
//    e.preventDefault();
//    this.closeForm();
//  }

//  private closeForm(): void {
//    this.active = false;
//    this.cancel.emit();
//  }
