
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Personnel } from '../../models/personnel';
import { Item } from '../../models/projects';
import { GenericLookupListForDD } from '../../services/project-for-update';

@Component({
  selector: 'app-prj-personnel-save',
  templateUrl: './prj-personnel-save.component.html',
  styles: [
  ]
})
export class PrjPersonnelSaveComponent implements OnInit, OnChanges {
  data: GenericLookupListForDD[];

  constructor(private fb: FormBuilder) {
    this.personnelForm = this.fb.group({
      personnelId: [''],
      projId: [''],
      contactId: [''],
      contactName: [''],
      contactRole: [''],
      agencyName: [''],
      roleId: [''],
      isLeadInd: [''],
      activeInd: [''],
      emailAddress: [''],
      mobilePhone: ['']
    });
    
  }
  @Input() contactRoles: GenericLookupListForDD[];
  @Input() contactNames: GenericLookupListForDD[];
  @Input() EditPersonnel: Personnel;
  @Input() saveDialogStatus: boolean;
  @Output() addNewEditPersonnelDialogClose = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<Personnel>();
  public personnelForm: FormGroup;
  public getTitle = (() => this.EditPersonnel ? 'Edit Personnel' : 'Add Personnel');

  public ActiveIn: Item[] = [
    { text: 'Active', value: 'A' },
    { text: 'Inactive', value: 'I' }
  ];

  public isLeadInd: Item[] = [
    { text: 'Yes', value: 'Y' },
    { text: 'No', value: 'N' }
  ];

  ngOnInit(): void {
    this.personnelForm.valueChanges.subscribe(() => console.log(this.personnelForm.value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = this.contactNames?.slice();
    this.data = this.contactNames?.sort((a, b) => a.text.localeCompare(b.text));
     if (this.EditPersonnel) {
     this.personnelForm.patchValue(this.EditPersonnel);
     } else {
       this.personnelForm.reset();
       this.setDefaultValues();
     }
  }
  public savePersonnel() {
    const personnel: Personnel = this.personnelForm.value;
    this.save.emit(personnel);
  }
  handleFilter(value) {
    this.data = this.contactNames.filter((s) => s.text.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public setDefaultValues = () => this.personnelForm.patchValue({ isLeadInd: 'Y', activeInd:'A' });

}
