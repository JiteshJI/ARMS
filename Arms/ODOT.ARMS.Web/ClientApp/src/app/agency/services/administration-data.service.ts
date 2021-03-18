import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Injectable } from '@angular/core';
import { EnvService } from 'src/app/core/services/env.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgencyDetail, AgencyDetailRaw, AddAgency, AdministrationCategory, AdministrationCategoryRaw } from '../models';


@Injectable({
  providedIn: 'root'
})
export class AdministrationDataService extends BaseService {

  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  getAgencyDetail(): Observable<AgencyDetailRaw[]> {
    return this.http
      .get<AgencyDetail[]>(`${this.apiUrl}/ArmsAgency/`,
      { headers: { 'Accept': 'application/vnd.dot.arms.armsagencyfordd+json' } })
      .pipe(map(raws => this.provideAgencyDetail(raws)));
  }

  provideAgencyDetail(raws: AgencyDetail[]): AgencyDetailRaw[] {
    return raws;
  }

  createNewAgency(agencyDetailRaw: AddAgency): Observable<AddAgency> {
    if (agencyDetailRaw.agencyId != null && agencyDetailRaw.agencyId !== '') {
      return this.http
        .patch<AddAgency>(`${this.apiUrl}/ArmsAgency/UpdateAgency`, agencyDetailRaw, {
          headers: {
            'Accept': 'application/vnd.dot.arms.armsagencyfordd+json',
            'Content-Type': 'application/vnd.dot.arms.agencyforupdate+json'
          }
        });
    } else {
      return this.http
        .post<AddAgency>(`${this.apiUrl}/ArmsAgency/AddNewAgency`, agencyDetailRaw, {
          headers: {
            'Accept': 'application/vnd.dot.arms.armsagencyfordd+json',
            'Content-Type': 'application/vnd.dot.arms.agencyforcreate+json'
          }
        });
    }
  }

  getAgencyCategories(): Observable<AdministrationCategoryRaw[]> {
    return this.http
      .get<AdministrationCategory[]>(`${this.apiUrl}/ArmsAdministrationCategory/`,
        { headers: { 'Accept': 'application/vnd.dot.arms.armsadministrationcategoryforDD+json' } })
      .pipe(map(raws => this.provideAdministration(raws)));
  }

  provideAdministration(raws: AdministrationCategory[]): AdministrationCategoryRaw[] {
    return raws;
  }

  getAgencyCategoriesById(queryTitle: string): Observable<AdministrationCategory[]> {
    return this.http
      .get<{ items: AdministrationCategory[] }>(`${this.apiUrl}/${queryTitle}`)
      .pipe(map(administrationCategory => administrationCategory.items || []));
  }

}
