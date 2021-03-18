import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

import { ProjectService } from '../../services/project.service';
import * as fromCore from "../../../core/state/reducers";
import * as fromProject from "../../state/reducers";
import * as fromProjectBudgetCategory from '../../state/reducers/edit-project-budgetCategory-page.reducer';
import * as fromProjectBudgetCategorySelectors from '../../state/selector/project-budgetCategory.selectors';
import * as fromProjectBudgetCategoryActions from '../../state/actions/edit-project-budgetCategory-page.actions';
import { Budget, BudgetCategory } from "../../models/budget";
import { GenericLookupListForDD } from "../../models/project-for-update";
import { BudgetDialogCategories } from '../../models/budget';
import * as fromProjectBudget from '../../state/reducers/edit-project-budget-page.reducer';
import * as fromProjectBudgetActions from '../../state/actions/edit-project-budget-page.actions';
import * as fromEventActions from '../../state/actions/edit-project-events-page.actions';
import * as fromProjectBudgetSelectors from '../../state/selector/project-budget.selectors';
import { kendonotificationservice } from "src/app/shared/services/kendo-notification.service";
import { PhaseRaw } from "../../models/phase-raw";

@Component({
  selector: 'app-edit-prj-budget-page',
  templateUrl: './edit-prj-budget-page.component.html'
})
export class EditPrjBudgetPageComponent implements OnInit, OnDestroy {

  @Input() projectId$: Observable<string>;
  @Input() budgetCategories$: Observable<GenericLookupListForDD[]>;
  @Input() budgetCategoriesByProject$: Observable<BudgetCategory[]>;
  @Input() selectedBudgetCategory$: Observable<BudgetCategory>;
  @Input() addOtherCategoryDialogStatus$: Observable<boolean>;
  @Input() addSalaryWagesDialogStatus$: Observable<boolean>;
  @Input() addSubContractorDialogStatus$: Observable<boolean>;

  //budgets
  public budgets$: Observable<Budget[]>;
  @Input() selectedBudget$: Observable<Budget>;
  @Input() viewOtherCategoryGrid$: Observable<boolean>;
  @Input() viewSalaryWagesGrid$: Observable<boolean>;
  @Input() viewSubContractorGrid$: Observable<boolean>;

  
  public phaseList$: Observable<PhaseRaw[]>;// // TODO: need to fetch from API as ref data
  public status$: GenericLookupListForDD[] = [{ text: 'Active', value: 'A' }, { text: 'InActive', value: 'I' }];
  public isSalaryAndWages: boolean = false;

  projectId: string;
  selectedBudgetCategory: GenericLookupListForDD;
  bcAltId: number;


  constructor(public fb: FormBuilder,
    public coreStore: Store<fromCore.State>,
    public projectBudgetCategoryStore: Store<fromProjectBudgetCategory.State>,
    public projectBudgetStore: Store<fromProjectBudget.State>,
    private projectStore: Store<fromProject.State>,
    private notificationService: kendonotificationservice) { }

  ngOnInit() {
   
    console.log('container budget');
    this.projectId$ = this.projectStore.select(fromProject.getProjectId);
    this.selectedBudgetCategory$ = this.projectBudgetCategoryStore.select(fromProjectBudgetCategorySelectors.getSelectedBudgetCategory);
    this.addOtherCategoryDialogStatus$ = this.projectBudgetCategoryStore.select(fromProjectBudgetCategorySelectors.getOtherCategoryBudgetDialogStatus);
    this.addSalaryWagesDialogStatus$ = this.projectBudgetCategoryStore.select(fromProjectBudgetCategorySelectors.getSalaryWagesBudgetDialogStatus);
    this.addSubContractorDialogStatus$ = this.projectBudgetCategoryStore.select(fromProjectBudgetCategorySelectors.getSubContractorBudgetDialogStatus);
    this.budgetCategories$ = this.coreStore.select(fromCore.getBudgetCategories);
    this.budgetCategoriesByProject$ = this.projectBudgetCategoryStore.select(fromProjectBudgetCategorySelectors.getBudgetCategoriesByProject);
    this.projectBudgetCategoryStore.select(fromProjectBudgetCategorySelectors.getSelectedBudgetCategory).subscribe(item => {
      console.info('budget category change subscriber', item);
      if (item != null) {
        this.selectedBudgetCategory = { text: item.budgetCatText, value: item.budgetCatId.toString() };
        this.bcAltId = item.bcAltId;
      }
    });
    this.projectId$.pipe(take(1))
      .subscribe((projId) => {
        this.projectId = projId;
      });

    //budgets
    this.budgets$ = this.projectBudgetStore.select(fromProjectBudgetSelectors.getBudgetByProjectId);
    this.phaseList$ = this.projectStore.select(fromProject.getPhaseList);
    this.selectedBudget$ = this.projectBudgetStore.select(fromProjectBudgetSelectors.getSelectedBudget);
    this.viewOtherCategoryGrid$ = this.projectBudgetStore.select(fromProjectBudgetSelectors.getOtherCategoryGridStatus);
    this.viewSalaryWagesGrid$ = this.projectBudgetStore.select(fromProjectBudgetSelectors.getSalaryWagesGridStatus);
    this.viewSubContractorGrid$ = this.projectBudgetStore.select(fromProjectBudgetSelectors.getSubContractorGridStatus);
    this.viewBudgetsGrid("Salaries and Wages");
  }

  viewBudgetsByCategory(rowData: BudgetCategory) {
    console.info('rowData', rowData);
    this.projectBudgetCategoryStore.dispatch(fromProjectBudgetCategoryActions.setSelectedBudgetCategory({ selectedBudgetCategory: rowData }));
    //this.projectBudgetStore.dispatch(fromProjectBudgetActions.loadBudgetsByCategory({ projId: rowData.bcAltId }));

    this.viewBudgetsGrid(rowData.budgetCatText);
  }

  selectedBudgetCategoryDDL(budgetCategory: GenericLookupListForDD) {
    
    if (budgetCategory?.value) {
      console.info('container on click ddl', budgetCategory);
      this.selectedBudgetCategory = budgetCategory;
      //we are adding a budget; set selectedBudget to null
      this.projectBudgetStore.dispatch(fromProjectBudgetActions.setSelectedBudget({ selectedBudget: null }));
      this.toggleSaveDialog(budgetCategory.text, true);
    }
    else
      this.notificationService.showInfo('Please choose a budget category.')

  }

  private viewBudgetsGrid(budgetCategory: string) {
    switch (budgetCategory.toLowerCase()) {
      case BudgetDialogCategories.salariesandwages.toLowerCase():
        this.projectBudgetStore.dispatch(fromProjectBudgetActions.viewSalaryWagesGridStatus({ status: true }));
        break;
      case BudgetDialogCategories.subcontractor.toLowerCase():
        this.projectBudgetStore.dispatch(fromProjectBudgetActions.viewSubContractorGridStatus({ status: true }));
        break;
      default:
        this.projectBudgetStore.dispatch(fromProjectBudgetActions.viewOtherCategoryGridStatus({ status: true }));
        break;
    }
  }

  private toggleSaveDialog(budgetCategory: string, open: boolean) {
    debugger;
    switch (budgetCategory.toLowerCase()) {
      case BudgetDialogCategories.salariesandwages.toLowerCase() :
        this.projectBudgetCategoryStore.dispatch(fromProjectBudgetCategoryActions.setAddSalaryWagesBudgetDialogStatus({ status: open }));
        this.isSalaryAndWages = true;
        break;
      case BudgetDialogCategories.equipment.toLowerCase():
        this.projectBudgetCategoryStore.dispatch(fromProjectBudgetCategoryActions.setAddSalaryWagesBudgetDialogStatus({ status: open }));
        this.isSalaryAndWages = false;
        break;
      case BudgetDialogCategories.subcontractor.toLowerCase():
        this.projectBudgetCategoryStore.dispatch(fromProjectBudgetCategoryActions.setAddSubContractorBudgetDialogStatus({ status: open }));
        break;
      case BudgetDialogCategories.contingency.toLowerCase():
        this.projectBudgetCategoryStore.dispatch(fromProjectBudgetCategoryActions.setAddSubContractorBudgetDialogStatus({ status: open }));
        break;
      default:
        this.projectBudgetCategoryStore.dispatch(fromProjectBudgetCategoryActions.setAddOtherCategoryBudgetDialogStatus({ status: open }));
        break;
    }
  }

  closeOtherCategoryDialog() {
    this.projectBudgetCategoryStore.dispatch(fromProjectBudgetCategoryActions.setAddOtherCategoryBudgetDialogStatus({ status: false }));
  }

  closeSalaryWagesDialog() {
    this.projectBudgetCategoryStore.dispatch(fromProjectBudgetCategoryActions.setAddSalaryWagesBudgetDialogStatus({ status: false }));
  }

  closeSubContractorDialog() {
    this.projectBudgetCategoryStore.dispatch(fromProjectBudgetCategoryActions.setAddSubContractorBudgetDialogStatus({ status: false }));
  }

  saveBudget(budget: any) {
    
    console.info('save other', budget);
    let saveBudget = new Budget(budget.projectId, budget.budgetCategory, budget.budgetId, budget.phaseId,
      budget.bcAltId, budget.budgetAmount, budget.title, budget.odotFunding,
      budget.orgCostSharing, new Date(), 'sai', budget.statusId, budget.notes,
      budget.amount, budget.qty, budget.armsBudgetInventories);
    console.info('savebudget', saveBudget);
    let budgetCategory: BudgetCategory = {
      projId: this.projectId,
      budgetCatId: +this.selectedBudgetCategory.value,
      bcAltId: 0,
      budgetCatText: this.selectedBudgetCategory.text,
      budgetAmt: 0
    };

    if (saveBudget.budgetId)
      this.projectBudgetStore.dispatch(fromProjectBudgetActions.updateBudget({ budget: saveBudget }));
    else
      this.projectBudgetStore.dispatch(fromProjectBudgetActions.addBudget({ budget: saveBudget, budgetCategory: budgetCategory }));

    // close dialog
    this.toggleSaveDialog(this.selectedBudgetCategory.text, false);
  }

  editBudget(budget: any) {
    //var bud = budget as Budget;
    this.selectedBudgetCategory = { text: budget.budgetCategoryText, value: budget.budgetCategoryValue, primaryTypeId: null};
    //console.info('selected budget and category', budget, this.selectedBudgetCategory.text);
    this.projectBudgetStore.dispatch(fromProjectBudgetActions.setSelectedBudget({ selectedBudget: budget as Budget }));
    this.toggleSaveDialog(this.selectedBudgetCategory.text, true);
  }

  ngOnDestroy() {
    console.info('edit budget destroy');
    this.projectBudgetStore.dispatch(fromProjectBudgetActions.hideGrids());
  }


}
