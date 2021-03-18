import { BaseService } from "src/app/shared/base-service";
import { IBudget, BudgetCategory, Budget } from "../models/budget";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EnvService } from "src/app/core/services/env.service";
import { Injectable, OnDestroy } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class BudgetService extends BaseService implements OnDestroy {
  public _budget = new BehaviorSubject<Budget>(null);
  public isAdd: Boolean;
  //_budgetData$ = this._budget.asObservable()
  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  budgetAddOrEdit(budget: Budget) {
    console.log('isAdd', this.isAdd);
    this._budget.next(budget);
  }

  addBudget(budget: IBudget): Observable<IBudget> {
    return this.http.post<IBudget>(`${this.apiUrl}/ArmsBudget/AddBudget`, budget, {
      headers: {
        'Content-Type': 'application/vnd.dot.arms.budgetforcreate+json'
      }
    });
  }

  updateBudget(budget: Partial<IBudget>): Observable<IBudget> {
    console.info('budget service', budget);
    return this.http.patch<IBudget>(`${this.apiUrl}/ArmsBudget/UpdateBudget`, budget, {
      headers: {
        'Content-Type': 'application/vnd.dot.arms.budgetupdate+json'
      }
    });
  }

  getBudgetCategories(): Observable<BudgetCategory[]> {
    return this.http
      .get<BudgetCategory[]>(`${this.apiUrl}/ArmsBudget/GetArmsBudgetCategories`,
        { headers: { 'Accept': 'application/vnd.dot.arms.armsbudgetcategory+json' } });
  }

  //getBudgets(): Observable<Budget[]> {
  //  return this.http
  //    .get<Budget[]>(`${this.apiUrl}/ArmsBudget/GetArmsBudgets`,
  //      { headers: { 'Accept': 'application/vnd.dot.arms.armsbudgets+json' } });
  //}

  getBudgetByProjectId(projectId: string): Observable<Budget[]> {
    return this.http
      .get<Budget[]>(`${this.apiUrl}/ArmsBudget/GetArmsBudgetByProjectId/${projectId}`,
        { headers: { 'Accept': 'application/vnd.dot.arms.armsbudgetbyprojectId+json' } });
  }

  ngOnDestroy() {
    this._budget.unsubscribe();
  }
}
