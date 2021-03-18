import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'
import { Store, select } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin';

import * as administrationActions from '../../state/actions/administration-categories';
import * as fromAgency from '../../state/reducers';
import * as agencyListActions from '../../state/actions/agency';
import { AgencyDetail, AddAgency, AdministrationCategory} from '../../models';

@Component({
  selector: 'app-list-administration',
  templateUrl: './agency.component.html'
})

export class AgencyComponent implements OnInit {
  @Input() routeItems: any[];

  agencyCategoryDetail$: Observable<AdministrationCategory[]>;
  agencyDetail$: Observable<AgencyDetail[]>;

  constructor(private fb: FormBuilder, private store$: Store<fromAgency.State>) {
    this.agencyDetail$ = this.store$.pipe(select(fromAgency.getAllSpecificList));
    this.agencyCategoryDetail$ = this.store$.pipe(select(fromAgency.getAllAdminstrationCategory));

  }

  ngOnInit() {
    //agencyDetail$
    this.store$.dispatch(
      new agencyListActions.Load()
    );
       //fundingTypeListDetail$
    this.store$.dispatch(
      new administrationActions.Load()
    );
    
  
  }


  onAgencySaved(addAgency: AddAgency) {
    
    this.store$.dispatch(new agencyListActions.AddAgencyDetail(addAgency));
    this.store$.dispatch(
      new agencyListActions.Load()
    );
  }

 

}
