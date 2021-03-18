import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base-service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { EnvService } from './env.service';
import { ProjectEventsReferenceData } from '../models/project-events-reference-data';
import { FundingReferenceData } from '../models/funding-reference-data';
import { InvoiceReferenceData } from '../models/fin-invoice-reference-data';
import { ProjectCBReferenceData } from '../models/project-cb-reference-data';
import { LookupItem, LookupItemKeys } from '../../shared/models/lookup-item';
import { ProjectPhaseReferenceData } from '../models/project-phase-reference-data';
import { GenericLookupListForDD } from 'src/app/project/models/project-for-update';
import { AdministrationCategoryRaw } from 'src/app/manage/models/administration-categories';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService extends BaseService {

  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  public loadProjectEventsReferenceData(): Observable<ProjectEventsReferenceData> {
    return forkJoin(
      // If these requests are performed over HTTP/2 then it is not really less efficient to do them separately
      // because it will persist the connection across requests and they can be done in parallel. In our web
      // environment, if the site is secure then it will default to HTTP/2. If done locally though, it is
      // probable that it will be HTTP/1.1 and so you will see a significant performance increase after deploying
      //this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData`, { headers: { 'Accept': 'application/vnd.dot.arms.primaryeventsfordd+json' } }),
      this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData/${LookupItemKeys.PrimaryEvents}`, { headers: { 'Accept': 'application/vnd.dot.arms.referencesfordd+json' } }),
      this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData`, { headers: { 'Accept': 'application/vnd.dot.arms.secondaryeventsfordd+json' } }),
      this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData`, { headers: { 'Accept': 'application/vnd.dot.arms.eventstatusesfordd+json' } })
    )
      .pipe(
        /* TODO deal with errors later */
        // catchError(err => of(false)),
        map((data: [LookupItem[], LookupItem[], LookupItem[]]) => {
          let referenceData = new ProjectEventsReferenceData();
          referenceData.primaryEvents = data[0];
          referenceData.secondaryEvents = data[1];
          referenceData.eventStatuses = data[2];
          return referenceData;
        })
      );
  }

  public loadInvoiceReferenceData(): Observable<InvoiceReferenceData> {
    console.log('Invoice funding status ref call');
    return forkJoin(
      this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData/${LookupItemKeys.FundingStatus}`, { headers: { 'Accept': 'application/vnd.dot.arms.referencesfordd+json' } }),
      this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData/${LookupItemKeys.BudgetCategory}`, { headers: { 'Accept': 'application/vnd.dot.arms.referencesfordd+json' } })
    ).pipe(map((data: [LookupItem[], LookupItem[]]) => {
      let referenceData = new InvoiceReferenceData();
      referenceData.fundingStatus = data[0];
      referenceData.budgetCategory = data[1];
      return referenceData;
    })
    );
  }

  public loadProjectCBReferenceData(): Observable<ProjectCBReferenceData> {
    return forkJoin(
      this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData/${LookupItemKeys.CBCategory}`, { headers: { 'Accept': 'application/vnd.dot.arms.referencesfordd+json' }}),
      this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData/${LookupItemKeys.CBType}`, { headers: { 'Accept': 'application/vnd.dot.arms.referencesfordd+json' }}),
      this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData/${LookupItemKeys.CBStatus}`, { headers: { 'Accept': 'application/vnd.dot.arms.referencesfordd+json' }})
    ).pipe(map((data: [LookupItem[], LookupItem[], LookupItem[]]) => {
      let referenceData = new ProjectCBReferenceData();
      referenceData.cbCategoryItems = data[0];
      referenceData.cbtypeItems = data[1];
      referenceData.cbStatusItems = data[2];
      return referenceData;
    })
    );
  }


  cbCategoryItems: LookupItem[];
  cbtypeItems: LookupItem[];
  cbStatusItems: LookupItem[];

  public loadProjectPhaseReferenceData(): Observable<ProjectPhaseReferenceData> {
    console.log('phase ref call');
    return this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData/${LookupItemKeys.PhaseStatus}`, { headers: { 'Accept': 'application/vnd.dot.arms.referencesfordd+json' } }).pipe(
    //return this.http.get<GenericLookupListForDD[]>(`${this.apiUrl}/ReferenceData`, { headers: { 'Accept': 'application/vnd.dot.arms.phasestatusesfordd+json' } }).pipe(
      map((data: LookupItem[]) => {
        let referenceData = new ProjectPhaseReferenceData();
        referenceData.phaseStatuses = data;
        console.log('phase service', referenceData);
        return referenceData;
      })
    )
  }





  public loadBudgetCategoriesReferenceData(): Observable<LookupItem[]> {
    console.log('budget categories ref call');
    return this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData/${LookupItemKeys.BudgetCategory}`, { headers: { 'Accept': 'application/vnd.dot.arms.referencesfordd+json' } });
    //return this.http.get<GenericLookupListForDD[]>(`${this.apiUrl}/ArmsGenericLookupList`,
    //  { headers: { 'Accept': 'application/vnd.dot.arms.budgetcategoryfordd+json' } });
  }

  public loadFundingReferenceData(): Observable<FundingReferenceData> {
    return forkJoin(
      // If these requests are performed over HTTP/2 then it is not really less efficient to do them separately
      // because it will persist the connection across requests and they can be done in parallel. In our web
      // environment, if the site is secure then it will default to HTTP/2. If done locally though, it is
      // probable that it will be HTTP/1.1 and so you will see a significant performance increase after deploying
      //this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData`, { headers: { 'Accept': 'application/vnd.dot.arms.primaryeventsfordd+json' } }),
      this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData/${LookupItemKeys.FundingType}`, { headers: { 'Accept': 'application/vnd.dot.arms.referencesfordd+json' } }),
      this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData/${LookupItemKeys.FundingSrc}`, { headers: { 'Accept': 'application/vnd.dot.arms.referencesfordd+json' } }),
      this.http.get<LookupItem[]>(`${this.apiUrl}/ReferenceData/${LookupItemKeys.FundingCategory}`, { headers: { 'Accept': 'application/vnd.dot.arms.referencesfordd+json' } })
    )
      .pipe(
        /* TODO deal with errors later */
        // catchError(err => of(false)),
        map((data: [LookupItem[], LookupItem[], LookupItem[]]) => {
          let referenceData = new FundingReferenceData();
          referenceData.fundingType = data[0];
          referenceData.fundingSource = data[1];
          referenceData.fundingCategory = data[2];
          return referenceData;
        })
      );
  }

}
