
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

//import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer, DefaultRouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from './core/core.module';
import { httpInterceptorProviders } from './core/interceptors';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { reducers, metaReducers, CustomSerializer } from './state/reducers';
import { environment } from '../environments/environment';
import { kendonotificationservice } from './shared/services/kendo-notification.service';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { EditorModule } from '@progress/kendo-angular-editor';
import { CanDeactivateGuard } from './shared/guards/can-deactivate.guard';
import { fileservice } from './shared/services/files.services';
import { UploadModule, FileSelectModule } from '@progress/kendo-angular-upload';
//import { UploadsModule } from '@progress/kendo-angular-upload';
import { HttpClientModule } from '@angular/common/http';



//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    NotificationModule,
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer, stateKey: 'router' }),
    StoreDevtoolsModule.instrument({
      name: 'ARMS Application DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    CoreModule,
    SharedModule,
    // AngularFontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    EffectsModule.forRoot([]),
    EditorModule,
    UploadModule,
    FileSelectModule,
    //UploadsModule,
    HttpClientModule

    // FontAwesomeModule,
  ],
  providers: [httpInterceptorProviders, { provide: RouterStateSerializer, useClass: CustomSerializer }, kendonotificationservice, fileservice],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    automapper.createMap('CBFormModel', 'CBForUpdate');
    automapper.createMap('EventFormModel', 'EventForUpdate');
    automapper.createMap('InvoiceFormModel', 'InvoiceForUpdate');
    automapper.createMap('PhaseFormModel', 'PhaseForUpdate');
    automapper.createMap('ProjInfoModel', 'ProjInfoForUpdate');
    automapper.createMap('FundingFormModel', 'FundingForUpdate');
  }
}
