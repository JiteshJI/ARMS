import { LOCALE_ID, NgModule } from '@angular/core';
//import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
//import { reducer } from './state/reducers/upload-file-save.reducer';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuModule } from '@progress/kendo-angular-menu';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { RouterModule } from '@angular/router';
import { LayoutModule, PanelBarModule } from '@progress/kendo-angular-layout';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { PopupModule } from '@progress/kendo-angular-popup';
import { EditorModule } from '@progress/kendo-angular-editor';
import { StringToDatePipe } from './pipes/string-to-date.pipe';
import { ErrorPopupInGridDirective } from './directives/error-popup-in-grid.directive';
import { DynamicPipe } from './pipes/dynamic.pipe';
import { BooleanPipe } from './pipes/boolean.pipe';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';
import { DatePickerKeyAmPmDirective } from './directives/date-picker-key-am-pm.directive';
import { PhonePipe } from './pipes/phone.pipe';
import { UploadsModule, FileSelectModule } from '@progress/kendo-angular-upload';
import { UploadFileSaveComponent } from './components/upload-download-file-save/upload-file-save.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MenuModule,
    DropDownsModule,
    InputsModule,
    LabelModule,
    DateInputsModule,
    ButtonsModule,
    GridModule,
    DialogModule,
    LayoutModule,
    PanelBarModule,
    TooltipModule,
    NotificationModule,
    PopupModule,
    EditorModule,
    FileSelectModule,
    UploadsModule//,
    //StoreModule.forFeature('uploads', reducer)
  ],
  declarations: [
    StringToDatePipe,
    ErrorPopupInGridDirective,
    DynamicPipe,
    BooleanPipe,
    ErrorNotificationComponent,
    DatePickerKeyAmPmDirective,
    PhonePipe,
    UploadFileSaveComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MenuModule,
    DropDownsModule,
    InputsModule,
    LabelModule,
    DateInputsModule,
    ButtonsModule,
    GridModule,
    DialogModule,
    LayoutModule,
    PanelBarModule,
    TooltipModule,
    NotificationModule,
    PopupModule,
    EditorModule,
    StringToDatePipe,
    ErrorPopupInGridDirective,
    BooleanPipe,
    DatePickerKeyAmPmDirective,
    PhonePipe,
    FileSelectModule,
    UploadFileSaveComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
    DatePipe,
    BooleanPipe,
    CurrencyPipe,
    DecimalPipe
  ],
  entryComponents: [ErrorNotificationComponent]
})
export class SharedModule { }
