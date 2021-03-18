import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Budget } from "src/app/project/models/budget";
import { GenericLookupListForDD } from "src/app/project/models/project-for-update";
import { PhaseRaw } from "../../../models/phase-raw";


@Component({
    selector: 'app-prj-other-categories-budget-save',
    templateUrl: './otherCategories-budget-save.component.html'
})
export class OtherCategoriesBudgetSaveComponent implements OnInit, OnChanges {

    @Input() dialogStatus: boolean;
    @Input() projectId: string;
    @Input() selectedCategory: GenericLookupListForDD;
    @Input() phaseList: PhaseRaw[];
    @Input() status: GenericLookupListForDD[];
    @Input() selectedBudget: Budget;

    @Output() closeDialog = new EventEmitter<boolean>();
    @Output() saveOtherCategoryBudget = new EventEmitter<any>();

    otherCategoryForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.loadForm();
    }

    get title(): string {
        return !this.selectedBudget ? 'Add ' + this.selectedCategory.text : 'Edit ' + this.selectedCategory.text;
      }

    loadForm() {
        if (this.selectedBudget) {
            this.otherCategoryForm = this.fb.group({
                title: [this.selectedBudget.budgetTitle],
                phaseId: [this.selectedBudget.phaseId, Validators.required],
                odotFunding: [this.selectedBudget.odotFunding, Validators.required],
                orgCostSharing: [this.selectedBudget.orgCostSharing],
                statusId: ['A'],
                budgetId:[this.selectedBudget.budgetId],
                bcAltId: [this.selectedBudget.bcAltId],
                budgetCategory:[this.selectedCategory.value],
                projectId: [this.projectId]
            });
        }
        else {
            this.otherCategoryForm = this.fb.group({
                title: [''],
                phaseId: [null, Validators.required],
                odotFunding: [null, Validators.required],
                orgCostSharing: [''],
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
        console.info('other catgeory save', changes);
        if (changes.dialogStatus)
            this.loadForm();
    }

    saveForm() {
        this.saveOtherCategoryBudget.emit(this.otherCategoryForm.value);
    }
}
