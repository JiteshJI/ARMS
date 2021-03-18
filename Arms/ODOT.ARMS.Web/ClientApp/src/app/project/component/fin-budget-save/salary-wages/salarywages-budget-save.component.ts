import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Budget, InventoryDetailRaw } from "src/app/project/models/budget";
import { GenericLookupListForDD } from "src/app/project/models/project-for-update";
import { PhaseRaw } from "../../../models/phase-raw";


@Component({
  selector: 'app-prj-salarywages-budget-save',
  templateUrl: './salarywages-budget-save.component.html'
})
export class SalaryWagesBudgetSaveComponent implements OnInit, OnChanges {

  public inventoryDetailList: InventoryDetailRaw[] = [];
  public inventoryDetail: InventoryDetailRaw;
  public headerTextOne = 'Edit';
  public headerTextTwo = 'Delete';
  private editedRowIndex: number;
  public formGroup: FormGroup;

  @Input() dialogStatus: boolean;
  @Input() projectId: string;
  @Input() selectedCategory: GenericLookupListForDD;
  @Input() phaseList: PhaseRaw[];
  @Input() status: GenericLookupListForDD[];
  @Input() selectedBudget: Budget;
  @Input() isSalaryAndWages: boolean;
  @Output() closeDialog = new EventEmitter<boolean>();
  @Output() saveSalaryWagesBudget = new EventEmitter<any>();
  salaryWagesForm: FormGroup;
  public isStartEndDateRequired: boolean = false;
  constructor(private fb: FormBuilder) { }
  
  public fgInventoryDetail: FormGroup;
  ngOnInit() {
    this.loadForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger;
    this.inventoryDetailList = [];
    if ((this.selectedBudget) && ((this.selectedBudget.armsBudgetInventories))) {
      debugger;
      this.selectedBudget.armsBudgetInventories.forEach(val => {
        this.inventoryDetailList.push(Object.assign({}, val));
      });
    }
    if (changes['phaseList'] && changes.dialogStatus) {
      this.loadForm();
    }
  }
  get title(): string {
    return !this.selectedBudget ? 'Add ' + this.selectedCategory.text : 'Edit ' + this.selectedCategory.text;
  }

  loadForm() {
    if (this.selectedBudget) {
      this.salaryWagesForm = this.fb.group({
        title: [this.selectedBudget.budgetTitle],
        phaseId: [this.selectedBudget.phaseId, Validators.required],
        odotFunding: [this.selectedBudget.odotFunding, Validators.required],
        orgCostSharing: [this.selectedBudget.orgCostSharing],
        qty: [this.selectedBudget.qty],
        notes: [this.selectedBudget.notes],
        statusId: ['A'],
        budgetId: [this.selectedBudget.budgetId],
        bcAltId: [this.selectedBudget.bcAltId],
        budgetCategory: [this.selectedCategory.value],
        projectId: [this.projectId],
        armsBudgetInventories: [this.inventoryDetailList]
      });
    }
    else {
      this.salaryWagesForm = this.fb.group({
        title: [''],
        phaseId: [null, Validators.required],
        odotFunding: ['', Validators.required],
        orgCostSharing: [''],
        qty: ['1'],
        notes: [''],
        statusId: [''],
        budgetId: [null],
        bcAltId: [null],
        budgetCategory: [this.selectedCategory.value],
        projectId: [this.projectId],
        armsBudgetInventories: [this.inventoryDetailList]
      });
    }

  }



  saveForm() {
    debugger;
    this.salaryWagesForm.controls['armsBudgetInventories'].setValue(this.inventoryDetailList);
    this.saveSalaryWagesBudget.emit(this.salaryWagesForm.value);
  }

  public addHandler({ sender }) {
    debugger;
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'inventoryNumber': new FormControl('')
    });
    sender.addRow(this.formGroup);
  }
  public editHandler({ sender, rowIndex, dataItem }) {
    debugger;
    this.closeEditor(sender);
    //let amt = bc.budgetAmt;
    //if (this.selectedBudget.armsBudgetInventories) {
    //  const idx = this.selectedBudget.armsBudgetInventories.findIndex(itm => itm.inventoryNumber === dataItem.inventoryNumber);
    //  if (idx > -1) {//this means we start out with this item -> deleted it then it was reintroduced
    //    amt += this.selectedBudget.armsBudgetInventories[idx].inventoryNumber;
    //  }
    //}

    this.formGroup = new FormGroup({
      'inventoryNumber': new FormControl(dataItem.inventoryNumber)
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }): void {
    debugger;
    const fg: FormGroup = formGroup as FormGroup;

    if (!fg.valid)
      return;

    if (!formGroup.value.inventoryNumber)
      return;
    //let bc: BudgetCatDDRaw = this.budgetCategoryItems.find(itm => itm.lookupKey === formGroup.value.invDtlKey);
    if (isNew) {
      this.inventoryDetail = new InventoryDetailRaw();
      this.inventoryDetail.budgetId = '',
        this.inventoryDetail.entryDate = new Date(),
        this.inventoryDetail.inventoryNumber = formGroup.value.inventoryNumber,
        this.inventoryDetail.userId = ''
      this.inventoryDetailList.push(InventoryDetailRaw.MakeNewInvoiceDetail(this.inventoryDetail));
    }
    else {
      this.inventoryDetailList[rowIndex].inventoryNumber = formGroup.value.inventoryNumber;
      this.inventoryDetailList[rowIndex].budgetId = formGroup.value.budgetId;
      this.inventoryDetailList[rowIndex].entryDate = formGroup.value.entryDate;
      this.inventoryDetailList[rowIndex].userId = formGroup.value.userId;
    }
    this.salaryWagesForm.markAsDirty();
    this.closeEditor(sender);
    this.startEndDtRequired();
   // sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }): void {
    const index = this.inventoryDetailList.findIndex(el => el.inventoryNumber === dataItem.inventoryNumber);
    if (index > -1) {
      debugger;
      this.inventoryDetailList.splice(index, 1);
      this.salaryWagesForm.markAsDirty();
    }
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
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
  private startEndDtRequired() {
    for (var invd of this.inventoryDetailList) {
      const idx = invd.inventoryNumber.indexOf('-');//only subcontractors have it
        if (idx > -1) {
          this.isStartEndDateRequired = true;
          return;
        }
      }
    this.isStartEndDateRequired = false;
  }
}

