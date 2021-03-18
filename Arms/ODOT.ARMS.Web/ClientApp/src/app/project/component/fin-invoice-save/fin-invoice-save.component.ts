import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges, ViewChild, ViewContainerRef, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { InvoiceRaw, BudgetCatDDRaw, InvoiceDetailRaw, FundingStatusCds } from '../../models/invoice-raw';
import { PhaseRaw } from '../../models/phase-raw';
import { LookupItem, FundingStatus, BudgetCategory } from '../../../shared/models/lookup-item';
import { EncumbranceRaw } from '../../models/encumbrance-raw';
import { ProjectBalanceRaw } from '../../models/project-balance-raw';
import { MinDate, MaxDate, DateFormat, DateTimeFormat } from 'src/app/shared/models/constants';
import { NotificationService } from '@progress/kendo-angular-notification';


@Component({
  selector: 'app-fin-invoice-save',
  templateUrl: './fin-invoice-save.component.html',
  providers: [NotificationService],
  styles: []
})

export class FinInvoiceSaveComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('junkshot', { read: ViewContainerRef }) public container: ViewContainerRef;
 // @ViewChild('junkshot') container: ElementRef;//ViewContainerRef;
  public invoiceForm: FormGroup;
  public phaseLookupList: LookupItem[] = [];
  public budgetCategoryList: LookupItem[] = [];
  public invoiceDetailList: InvoiceDetailRaw[] = [];
  public EncumbranceList: EncumbranceRaw[] = [];
  public maxChars = 255;
  public isStartEndDateRequired: boolean = false;

  public headerTextOne = 'Edit';
  public headerTextTwo = 'Delete';
  private originalInvoiceTotal: number = 0;

  //@ViewChild('appendTo', { read: ViewContainerRef }) public appendTo: ViewContainerRef;

  @Input() invoice: InvoiceRaw;
  @Input() invoiceList: InvoiceRaw[];
  @Input() phaseList: PhaseRaw[];
  @Input() fundingStatusItems: LookupItem[];
  @Input() budgetCategoryItems: BudgetCatDDRaw[];
  @Input() encumbranceSummary: EncumbranceRaw[];
  @Input() projectBalance: ProjectBalanceRaw;
  @Input() saveInvoiceDialogStatus: boolean;
  @Output() setSaveInvoiceDialogStatus = new EventEmitter<boolean>();
  @Output() saveInvoice = new EventEmitter<InvoiceRaw>();

  get minDate() { return MinDate; }
  public endMinDate: Date = new Date();
  get maxDate() { return MaxDate; }
  get dateFormat() { return DateFormat; }
  get dateTimeFormat() { return DateTimeFormat; }

  get publicCommentTxt(): FormControl { return this.invoiceForm.get('publicCommentTxt') as FormControl; }
  get privateCommentTxt(): FormControl { return this.invoiceForm.get('privateCommentTxt') as FormControl; }
  get phaseId(): FormControl { return this.invoiceForm.get('phaseId') as FormControl; }
  get fundingStatusCd(): FormControl { return this.invoiceForm.get('fundingStatusCd') as FormControl; }
  get invNum(): FormControl { return this.invoiceForm.get('invNum') as FormControl; }
  get startDt(): FormControl { return this.invoiceForm.get('startDt') as FormControl; }
  get endDt(): FormControl { return this.invoiceForm.get('endDt') as FormControl; }

  private editedRowIndex: number;
  public fgInvoiceDetail: FormGroup;
  get title(): string { return this.invoice ? 'Invoice - Update' : 'Invoice - Add'; }

  constructor(private fb: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit(): void { }

  ngAfterViewInit() {

    //console.log('Will this work???', this.container);
    //this.divView.nativeElement.innerHTML = "Hello Angular 10!";

  }

  ngOnChanges(changes: SimpleChanges): void {
    //=====================================
    //  Make sure the dialog is open
    //=====================================
    if (this.saveInvoiceDialogStatus) {
      this.originalInvoiceTotal = 0;
      this.invoiceDetailList = [];
      if (this.phaseList)
        this.phaseLookupList = PhaseRaw.buildPhaseLookupList(this.phaseList, this.invoice?.phaseId);
      if (this.budgetCategoryItems && this.invoice)
        this.budgetCategoryList = BudgetCatDDRaw.buildBudgetCategoryLookupList(this.invoice.phaseId, this.budgetCategoryItems);
      if ((this.invoice) && ((this.invoice.invoiceDetails))) {
        this.invoice.invoiceDetails.forEach(val => {
          this.originalInvoiceTotal += val.invAmt;//sum up the original invoice
          this.invoiceDetailList.push(Object.assign({}, val));
        });
        console.info('initial amount', this.originalInvoiceTotal);
      }
      this.startEndDtRequiredInit();//set the isStartEndDateRequired flag
      this.loadInvoice();

      this.phaseId.markAsTouched();
      this.fundingStatusCd.markAsTouched();
      this.invNum.markAsTouched();

      this.checkInvoiceCloseToCompletion();

      //console.log('Will this work 2???', this.container);
    //this.divView.nativeElement.innerHTML = "Hello Angular 10!";
    }
  }


  //==================================================================================================
  //
  //
  // This check happens on the on change event
  // This should happen each time the form is displayed
  //
  //
  //===================================================================================================
  public checkInvoiceCloseToCompletion() {
    if (this.projectBalance.daysToCompletion < 91) {
      this.buildAlert('Project Within 90 Days of Completion Date');
    }

    //=============================================================================
    //
    // I suppose, this should not be neccessary unless someone adjusts the balances
    // Let call it over kill
    //
    //=============================================================================
    if (this.projectBalance.withholdingAmtReached < 0) {
      this.buildAlert('Withholding Amount Reached');
    }

    if (this.projectBalance.encumbranceAmtReached < 0) {
      this.buildAlert('Exceeds Encumbrance Amount');
    }

    if (this.projectBalance.budgetAmtReached < 0) {
      this.buildAlert('Exceeds Total Budget');
    }

  }

  public loadInvoice() {
    if (this.invoice) {
      
      this.invoiceForm = this.fb.group({
        invoiceId: [this.invoice.invoiceId],
        phaseId: [this.invoice.phaseId, Validators.required],//
        projId: [this.invoice.projId],
        invRcvdDt: [this.invoice.invRcvdDt],//
        invDt: [this.invoice.invDt],//
        startDt: (this.isStartEndDateRequired) ? [this.invoice.startDt, Validators.required] : [this.invoice.startDt],//
        endDt: (this.isStartEndDateRequired) ? [this.invoice.endDt, Validators.required] : [this.invoice.endDt],
        invToFinancePaidDt: [this.invoice.invToFinancePaidDt],//
        invoiceDetails: [this.invoiceDetailList],
        properInvDt: [this.invoice.properInvDt],//
        finalNoticeInd: [this.invoice.finalNoticeInd],//
        invNum: [this.invoice.invNum, Validators.required],//
        fundingStatusCd: [this.invoice.fundingStatusCd, Validators.required],//
        publicCommentTxt: [this.invoice.publicCommentTxt],
        privateCommentTxt: [this.invoice.privateCommentTxt]
      });
    }
    else {
      this.invoiceForm = this.fb.group({
        invoiceId: [null],
        phaseId: [null, Validators.required],
        projId: [null],
        invRcvdDt: [null],
        invDt: [null],
        startDt: [null],
        endDt: [null],
        invToFinancePaidDt: [null],
        invoiceDetails: [this.invoiceDetailList],
        properInvDt: [null],
        finalNoticeInd: ['N'],
        invNum: [null, Validators.required],
        fundingStatusCd: [FundingStatusCds.Hold, Validators.required],
        publicCommentTxt: [null],
        privateCommentTxt: [null]
      });
    }
  }

  public fieldTxtLength(fc: FormControl): number {
    var ln = 0;
    if (fc.value) {
      ln = fc.value.length;
    }
    return ln;
  }

  public getBudgetCategoryDescription(dataItem: InvoiceDetailRaw): string {
    return LookupItem.getTxtById(dataItem.invDtlKey, this.budgetCategoryList);
  }

  public editHandler({ sender, rowIndex, dataItem }) {

    //======================================================================================================================
    //
    //
    // Add Max Validator Here
    // Need to make a budget balance reload after the save
    //
    //======================================================================================================================
    this.closeEditor(sender);
    const bc = this.budgetCategoryItems.find(itm => itm.lookupKey === dataItem.invDtlKey);
    let amt = bc.budgetAmt;
    if (this.invoice) { 
      const idx = this.invoice.invoiceDetails.findIndex(itm => itm.invDtlKey === dataItem.invDtlKey);
      if (idx > -1) {//this means we start out with this item -> deleted it then it was reintroduced
        amt += this.invoice.invoiceDetails[idx].invAmt;
      }
    }

    this.fgInvoiceDetail = new FormGroup({
      'invDtlKey': new FormControl(dataItem.invDtlKey, Validators.required),
      'invAmt': new FormControl(dataItem.invAmt, [Validators.required, Validators.min(0), Validators.max(amt)])
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.fgInvoiceDetail);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  private balanceCheck() {
    let newAmt: number = 0;
    this.invoiceDetailList.forEach(val => newAmt += val.invAmt);
    //=============================================================================
    //
    // I suppose, this should not be neccessary unless someone adjusts the balances
    // Let call it over kill
    //
    //=============================================================================
    if (this.projectBalance.withholdingAmtReached - newAmt + this.originalInvoiceTotal < 0) {
      this.buildAlert('Withholding Amount Reached');
    }

    if (this.projectBalance.encumbranceAmtReached - newAmt + this.originalInvoiceTotal < 0) {
      this.buildAlert('Exceeds Encumbrance Amount');
    }

    if (this.projectBalance.budgetAmtReached - newAmt + this.originalInvoiceTotal < 0) {
      this.buildAlert('Exceeds Total Budget');
    }

  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {

    const fg: FormGroup = formGroup as FormGroup;

    if (!fg.valid)
      return;

    if (!formGroup.value.invDtlKey)
      return;
    let bc: BudgetCatDDRaw = this.budgetCategoryItems.find(itm => itm.lookupKey === formGroup.value.invDtlKey);
    if (isNew) {
      this.invoiceDetailList.push(InvoiceDetailRaw.MakeNewInvoiceDetail(bc, formGroup.value.invAmt));
    }
    else {
      this.invoiceDetailList[rowIndex].invAmt = formGroup.value.invAmt;
      this.invoiceDetailList[rowIndex].invDtlKey = formGroup.value.invDtlKey;
      this.invoiceDetailList[rowIndex].budgetCategoryId = bc.budgetCatId;
      this.invoiceDetailList[rowIndex].budgetId = bc.budgetId;
    }
    this.invoiceForm.markAsDirty();
    this.closeEditor(sender);
    this.startEndDtRequired();
    this.setStartEndDtRequired();
    this.balanceCheck();
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.fgInvoiceDetail = new FormGroup({
      'invDtlKey': new FormControl(null, [Validators.required]),
      'invAmt': new FormControl(0, [Validators.required, Validators.min(0)])
    });

    sender.addRow(this.fgInvoiceDetail);
  }

  public removeHandler({ dataItem }) {
    const index = this.invoiceDetailList.findIndex(el => el.invDtlKey === dataItem.invDtlKey);
    if (index > -1) {
      this.invoiceDetailList.splice(index, 1);
      this.invoiceForm.markAsDirty();
      this.startEndDtRequired();
      this.setStartEndDtRequired();
    }
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.fgInvoiceDetail = undefined;
  }

  public onBudgetCategoryChange(e, fg: FormGroup) {
    //======================================================================================================================
    //
    //
    // Update Max Validator Here (use original values versus new to determine upper range)
    //
    //
    //======================================================================================================================
    fg.controls['invDtlKey'].setValue(e);
    const bc = this.budgetCategoryItems.find(itm => itm.lookupKey === e);
    let amt = bc.budgetAmt;
    if (this.invoice) {
      const idx = this.invoice.invoiceDetails.findIndex(itm => itm.invDtlKey === e);
      if (idx > -1) {//this means we start out with this item -> deleted it then it was reintroduced
        amt += this.invoice.invoiceDetails[idx].invAmt;
      }
    }

    fg.controls['invAmt'].setValidators([Validators.required, Validators.min(0), Validators.max(amt)]);
    fg.controls['invAmt'].updateValueAndValidity();
  }

  public getChecked(e) {

    if (this.invoiceForm.controls['finalNoticeInd'].value === 'Y') {
      this.invoiceForm.controls['finalNoticeInd'].setValue('N');
    }
    else {
      this.invoiceForm.controls['finalNoticeInd'].setValue('Y');
    }
    this.invoiceForm.markAsDirty();
  }

  public isChecked(): boolean {
    return this.invoiceForm.controls['finalNoticeInd'].value === 'Y';
  }

  public buildBudgetCategoryList(data: any): LookupItem[] {

    let lst = new Array<LookupItem>();

    const index = this.budgetCategoryList.findIndex(el => data.invDtlKey === el.value);
    if (index > -1)
      lst.push(this.budgetCategoryList[index]);
    const phaseId: string = this.invoiceForm.controls['phaseId'].value ;
    for (let itm of this.budgetCategoryItems) {
      if (itm.phaseId !== phaseId)
        continue;
      if (!(itm.budgetAmt > 0))
        continue;
      const index = this.invoiceDetailList.findIndex(el => el.invDtlKey === itm.lookupKey);
      if (index > -1)
        continue;

      lst.push(this.budgetCategoryList.find(el => itm.lookupKey === el.value));//should I clone this???LookupItem
    }
    return lst;
  }


  //======================================================================================
  //
  // SAVE
  //
  //======================================================================================
  public onSave() {
    const test: InvoiceRaw = new InvoiceRaw(); // Make a dummy object to map into
    this.invoiceForm.controls['invoiceDetails'].setValue(this.invoiceDetailList);// It seems like I have to re-introduce this
    const updatedEvent = Object.assign({}, test, automapper.map('InvoiceFormModel', 'InvoiceForUpdate', this.invoiceForm.value));

    if (this.isValidateToSave(updatedEvent)) {
      this.saveInvoice.emit(updatedEvent);
    }
  }

  private isValidateToSave(eventToSave: InvoiceRaw): boolean {
    let ret: boolean = true;
    //=================================================================================================
    //
    // If an invoice is flagged as denied, I can save the invoice without any checks
    // If they decide to make it active, then it will block them from saving
    //
    //=================================================================================================
    if (eventToSave.fundingStatusCd === FundingStatusCds.Denied)
      return true;

    let keys: number[] = [];

    let invoiceId: string = eventToSave.invoiceId || '~`!@#$%'; //makes null or undefined some funky text

    const dupIndx = this.invoiceList.findIndex(el => el.invNum.toUpperCase() === eventToSave.invNum.toUpperCase() && el.invoiceId != invoiceId);//
    //=================================================================================================
    //
    // If the index is greater than -1 then we have a 
    //
    //=================================================================================================
    if (dupIndx > -1) {
      this.invoiceList[dupIndx].invoiceDetails.forEach(itm => {
        if (itm.budgetId)
          keys.push(itm.budgetId);
      });

      const matchingContractors = eventToSave.invoiceDetails.findIndex(itm => {
        if (itm.budgetId) {
          for (let budgetId of keys) {
            if (budgetId === itm.budgetId)
              return true
          }
        }
        return false;
      });

      if (matchingContractors > -1)
        this.buildAlert('Subcontractor Duplicate Invoice Number ')
      else
        this.buildAlert('Duplicate Invoice Number');

      ret = false;
    }

    //=============================================================================
    // We have a date range
    //=============================================================================
    if ((eventToSave.startDt) && (eventToSave.endDt)) { 
      let contractorKeys: number[] = [];
      eventToSave.invoiceDetails.forEach(itm => {
        if (itm.budgetId)
          contractorKeys.push(itm.budgetId);
      });
      //=========================================================================
      // We have contractors
      //=========================================================================
      if (contractorKeys.length > 0) {
        let foundContractorOverlap: boolean = false;
        for (var inv of this.invoiceList) {
          if (foundContractorOverlap)
            break;
          //=====================================================================
          // The invoice from the list does not have a date range so skip to the next
          //=====================================================================
          if (!(inv.startDt) || !(inv.endDt))
            continue;

          if (!this.dateRangeOverlaps(eventToSave.startDt, eventToSave.endDt, inv.startDt, inv.endDt))
            continue;
          //======================================================================
          // We are an edit and we found ourself, so skip
          //======================================================================
          if ((eventToSave.invoiceId) && (eventToSave.invoiceId === inv.invoiceId))
            continue;
          //======================================================================
          // Find the invoices with subcontractors
          //======================================================================
          var haveContractors = inv.invoiceDetails.filter(itm => (itm.budgetId));//if we have a budgetId we have a contractor
          //======================================================================
          // If no subcontractor we skip
          //======================================================================
          if (haveContractors.length === 0)
            continue;

          //======================================================================
          // We found a contractor match based on the Budget Id
          //======================================================================
          for (let i = 0; i < haveContractors.length; i++) {
            if (contractorKeys.indexOf(haveContractors[i].budgetId) > -1) {
              this.buildAlert('Subcontractor Duplicate Date of Service');
              ret = false;
              foundContractorOverlap = true;
              break;
            }
          }
        }
      }
    }

    return ret;
  }

  //================================================================================
  //
  // Time frame overlap check
  //
  //================================================================================
  private dateRangeOverlaps(a_start : Date, a_end : Date, b_start : Date, b_end : Date) : boolean {
    if (a_start <= b_start && b_start <= a_end)
      return true; // b starts in a
    if (a_start <= b_end && b_end <= a_end)
      return true; // b ends in a
    if (b_start < a_start && a_end < b_end)
      return true; // a in b
    return false;
  }


  private buildAlert(myContent: string) {
    //console.info('Is this real???', this.container);
    this.notificationService.show({
      content: myContent,
      appendTo: this.container,
      cssClass: 'button-notification',
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'center', vertical: 'top' },
      //position: { horizontal: 'center', vertical: 'bottom' },
      type: { style: 'warning', icon: true },
      closable: true
    })
  }

  public onPhaseChange(phaseId: any) {
    this.budgetCategoryList = BudgetCatDDRaw.buildBudgetCategoryLookupList(phaseId, this.budgetCategoryItems);
    this.invoiceDetailList = [];//clear out the details list
  }

  private startEndDtRequiredInit() {
    //The default
    this.isStartEndDateRequired = false;
    if ((this.invoice) && (this.invoice.fundingStatusCd)) {
      if (this.invoice.fundingStatusCd === FundingStatus.Approved) {
        for (var invd of this.invoice.invoiceDetails) {
          const idx = invd.invDtlKey.indexOf('-');//only subcontractors have it
          if (idx > -1) {
            this.isStartEndDateRequired = true;
            break;
          }
        }
      }
    }
  }

  private startEndDtRequired() {

    if ((this.fundingStatusCd.value) && (this.fundingStatusCd.value === FundingStatus.Approved)) {
      for (var invd of this.invoiceDetailList) {
        const idx = invd.invDtlKey.indexOf('-');//only subcontractors have it
        if (idx > -1) {
          this.isStartEndDateRequired = true;
          return;
        }
      }
    }
    this.isStartEndDateRequired = false;
  }

  public onFundingStatusChange(data: any) {
    this.startEndDtRequired();
    this.setStartEndDtRequired();
  }

  private setStartEndDtRequired() {
    if (this.isStartEndDateRequired) {
      this.startDt.setValidators([Validators.required]);
      this.endDt.setValidators([Validators.required]);
      this.startDt.updateValueAndValidity();
      this.endDt.updateValueAndValidity();
      this.startDt.markAsTouched();
      this.endDt.markAsTouched();
    }
    else {
      this.startDt.setValidators([]);
      this.endDt.setValidators([]);
      this.startDt.updateValueAndValidity();
      this.endDt.updateValueAndValidity();
    }
  }

  public changeText(): void {
    if (this.headerTextOne === 'Edit' && this.headerTextTwo === 'Delete') {
      this.headerTextOne = 'Complete'
      this.headerTextTwo = 'Cancel'
    } else {
      this.headerTextOne = 'Edit'
      this.headerTextTwo = 'Delete'
    }
  }

}
