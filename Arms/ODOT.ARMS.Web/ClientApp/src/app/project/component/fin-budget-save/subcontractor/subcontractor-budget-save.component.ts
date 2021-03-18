import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Budget } from "src/app/project/models/budget";
import { GenericLookupListForDD } from "src/app/project/models/project-for-update";
import { PhaseRaw } from "../../../models/phase-raw";


@Component({
    selector: 'app-prj-subcontractor-budget-save',
    templateUrl: './subcontractor-budget-save.component.html'
})
export class SubContractorBudgetSaveComponent implements OnInit, OnChanges {

    @Input() dialogStatus: boolean;
    @Input() projectId: string;
    @Input() selectedCategory: GenericLookupListForDD;
    @Input() phaseList: PhaseRaw[];
    @Input() status: GenericLookupListForDD[];
    @Input() selectedBudget: Budget;

    @Output() closeDialog = new EventEmitter<boolean>();
    @Output() saveSubContractorBudget = new EventEmitter<any>();

    subContractorForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
      console.info('phases data on init', this.phaseList);
        this.loadForm();
    }

    get title(): string {
        return !this.selectedBudget ? 'Add ' + this.selectedCategory.text : 'Edit ' + this.selectedCategory.text;
      }

    loadForm() {
      console.info('sub contractor', this.phaseList);
        if (this.selectedBudget) {
            this.subContractorForm = this.fb.group({
                title: [this.selectedBudget.budgetTitle, Validators.required],
                phaseId: [this.selectedBudget.phaseId, Validators.required],
                odotFunding: [this.selectedBudget.odotFunding],
                orgCostSharing: [this.selectedBudget.orgCostSharing],
                amount: [this.selectedBudget.amount],
                quantity: [this.selectedBudget.qty],
                notes: [this.selectedBudget.notes],
                statusId: [this.selectedBudget.activeInd, Validators.required],
                budgetId:[this.selectedBudget.budgetId],
                bcAltId: [this.selectedBudget.bcAltId],
                budgetCategory:[this.selectedCategory.value],
                projectId: [this.projectId]
            });
        }
        else {
            this.subContractorForm = this.fb.group({
                title: ['', Validators.required],
                phaseId: [null, Validators.required],
                odotFunding: [''],
                orgCostSharing: [''],
                amount: [''],
                quantity: [''],
                notes: [''],
                statusId: [null],
                budgetId: [null],
                bcAltId: [null],
                budgetCategory:[this.selectedCategory.value],
                projectId: [this.projectId]
            });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        console.info('selected Budget', this.selectedBudget);
        console.info('salary wages save', changes);
        if (changes.dialogStatus)
            this.loadForm();
    }

    saveForm() {
        this.saveSubContractorBudget.emit(this.subContractorForm.value);
    }

}
/*
  constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.loadForm();
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
                budgetId:[this.selectedBudget.budgetId],
                bcAltId: [this.selectedBudget.bcAltId],
                budgetCategory:[this.selectedCategory.value],
                projectId: [this.projectId]
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
                budgetCategory:[this.selectedCategory.value],
                projectId: [this.projectId]
            });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
      console.info('selected Budget', this.selectedBudget);
      console.info('phase List', this.phaseList);
      console.info('salary wages save', changes);
      if (changes['phaseList'] && changes.dialogStatus) {
        this.loadForm();
      }
    }

    saveForm() {
        this.saveSalaryWagesBudget.emit(this.salaryWagesForm.value);
    }
}
 */
