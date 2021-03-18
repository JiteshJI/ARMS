import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { aggregateBy, process, SortDescriptor, State, GroupDescriptor } from '@progress/kendo-data-query';
import { Budget, SalaryWagesViewModel } from "src/app/project/models/budget";
import { GenericLookupListForDD } from "src/app/project/models/project-for-update";
import { PhaseRaw } from "../../models/phase-raw";

@Component({
  selector: 'fin-budgetCategory-list',
  templateUrl: 'fin-budgetCategory-list.component.html'
})
export class finBudgetCategoryListComponent implements OnInit {

  @Input() budgets: Budget[];
  @Input() phaseList: PhaseRaw[];
  @Input() status: GenericLookupListForDD[];
  @Input() budgetCategoryAltId: number;
  @Input() budgetCategories: GenericLookupListForDD[];
  @Output() selectedBudgetCategoryDDL = new EventEmitter<GenericLookupListForDD>();
  @Output() editBudget = new EventEmitter<Budget>();
  public gridData: SalaryWagesViewModel[] = [];
  public allBudgetCategories: GenericLookupListForDD[] = [];
  public selectedBudget: GenericLookupListForDD;
  public budgetDefault: GenericLookupListForDD = { text: 'Select Category', value: null };

 
  public aggregates: any[] = [{ field: 'odotFunding', aggregate: 'sum' }, { field: 'orgCostSharing', aggregate: 'sum' }];




  public state: State = {
    skip: 0, take: 5, filter: {
      filters: [],
      logic: 'and'
    },

    //groups: GroupDescriptor[] = [{ field: 'budgetCategoryText', aggregates: [{ aggregate: "count", field: 'Category.CategoryName' }] }, { field: 'UnitPrice', aggregates: [{ aggregate: "count", field: "UnitPrice" }] }];
    group: [{ field: 'phaseTxt', aggregates: this.aggregates }, { field: 'budgetCategoryText', aggregates: this.aggregates }]
  };
  //public data: GridDataResult = process(this.gridData, this.state);

  public sort: SortDescriptor[] = [{
    field: 'bcAltId',
    dir: 'asc'
  }];
    total: any;

  ngOnInit() {
    this.loadData();
    this.loadBudgetCategories();
  }

  loadData() {
    //this.loadBudgetCategories();
    console.info('salary wages grid', this.budgets, this.phaseList);
   
    if (this.budgets) {
      this.gridData = this.budgets.map(item => {
        if (this.phaseList) {
          var phase = this.phaseList.find(x => x.phaseId.toLowerCase() == item.phaseId.toLowerCase());
          var budgetCategorytext = this.budgetCategories.find(x => Number(x.value) == item.budgetCategory);
          return new SalaryWagesViewModel(item.bcAltId, item.budgetId, phase.phaseId, phase.phaseTitle, item.budgetTitle, item.qty,
            item.odotFunding, item.orgCostSharing, item.notes, item.activeInd, item.budgetCategory, budgetCategorytext.text, item.armsBudgetInventories);
        }
      });
     // this.data = process(this.gridData, this.state);
      
      this.total = aggregateBy(this.gridData, this.aggregates);
    }
  }
  loadBudgetCategories() {
    this.allBudgetCategories = this.budgetCategories.slice();
    console.info('all budget categories', this.allBudgetCategories);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['budgets']) {
     this.loadData();
    }
  }
  handleBudgetCategoryChange(budgetCategory: GenericLookupListForDD) {
    this.selectedBudget = budgetCategory;
  }
  onAddClick() {
    this.selectedBudgetCategoryDDL.emit(this.selectedBudget);
  }

  public getDescription(id: any): string {

    if (id) {
      return id;
    }
    else {
      return 'NA';
    }
    //return LookupItem.getTxtById(id, this.phaseLookupList);
  }


  public SignDescription(id: any): string {

    if (id) {
      return this.formatter.format(id); //'$' + id;
    }
    else {
      return 'NA';
    }
    //return LookupItem.getTxtById(id, this.phaseLookupList);
  }
  //public dataStateChange(state: DataStateChangeEvent): void {
  //  this.state = state;
  //  this.data = process(this.gridData, this.state);
  //}

  public formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency:'USD',
  })

  public dataStateChange(state: DataStateChangeEvent): void {
    
    if (state && state.group) {
      state.group.map(group => group.aggregates = this.aggregates);
    }

    this.state = state;

    this.total = aggregateBy(process(this.gridData, { filter: this.state.filter }).data, this.aggregates);
  }
}
