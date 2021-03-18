
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyComponent } from './component/agency.component';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AgencyRoutingModule } from './agency-routing.module';
import { StoreModule } from '@ngrx/store';
import { Agencyreducer } from './state/reducers/agencies.reducer';
//import { Agencyreducer } from 'state/selectors/agency';
import { EffectsModule } from '@ngrx/effects';
import { AgencyEffects } from './state/effects/agency.effects';





@NgModule({

  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('agency', Agencyreducer), /* contacts here is the name of the feature slice ( contacts feature slice) */
    EffectsModule.forFeature([AgencyEffects]),
    ReactiveFormsModule,
    AgencyRoutingModule
  ],
  declarations: [AgencyComponent]
})
export class AgenciesModule { }
