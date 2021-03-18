import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './component/contacts.component';
import { GridEditAgencyComponent } from './component/editAgency.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsRoutingModule } from './contacts-routing.module';
import { StoreModule } from '@ngrx/store';
import { contactsreducer } from './state/reducers/contacts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ContactsEffects } from './state/effects/contacts.effects';



@NgModule({

  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('contacts', contactsreducer), /* contacts here is the name of the feature slice ( contacts feature slice) */
    StoreModule.forFeature('contactAgencies', contactsreducer), /*  contactAgencies is the name of the feature slice (contact agency feature slice) */
    EffectsModule.forFeature([ContactsEffects]),
    ReactiveFormsModule,
    ContactsRoutingModule
  ],
  declarations: [ContactsComponent, GridEditAgencyComponent]
})
export class ContactsModule { }
