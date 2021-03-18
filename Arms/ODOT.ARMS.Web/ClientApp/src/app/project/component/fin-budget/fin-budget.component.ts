import { Component, OnInit, ViewChild, Output, EventEmitter, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdministrationCategoryRaw } from 'src/app/manage/models/administration-categories';
import { BudgetCategory } from '../../models/budget';
import { GenericLookupListForDD } from '../../models/project-for-update';



@Component({
    selector: 'app-prj-budget',
    templateUrl: './fin-budget.component.html'
})
export class PrjBudgetComponent implements OnInit, OnChanges {

    @Input() budgetCategories: GenericLookupListForDD[];
    @Input() budgetCategoriesByProject: BudgetCategory[];

    public gridBudgetCategories: BudgetCategory[] = [];
    public allBudgetCategories: GenericLookupListForDD[] = [];
    public budgetDefault: GenericLookupListForDD = { text: 'Select Category', value: null };
    public selectedBudget: GenericLookupListForDD;

    ngOnInit() {
        console.info('in fin budget', this.budgetCategories);
        console.info('catgeories by project', this.budgetCategoriesByProject);
        this.loadBudgetCategories();
        this.loadBudgetCategoriesByProject();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.info('changes budget', changes);
        if(this.budgetCategories && this.budgetCategoriesByProject){
            this.loadBudgetCategories();
            this.loadBudgetCategoriesByProject();
        }
    }

    loadBudgetCategoriesByProject() {
        this.gridBudgetCategories = this.budgetCategoriesByProject;
        console.log('grid data', this.gridBudgetCategories);
    }

    loadBudgetCategories() {
        // this.allBudgetCategories = this.budgetCategories.map(item => {
        //      return { text: item.administrationCategoryText, value: item.administrationCategoryID }
        // });
        this.allBudgetCategories = this.budgetCategories.slice();
        console.info('all budget categories', this.allBudgetCategories);
    }

    handleBudgetCategoryChange(budgetCategory : GenericLookupListForDD){

    }

    onAddClick(event) {

    }

    onItemSelect(rowData: any) {

    }


}