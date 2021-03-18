import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Injectable } from '@angular/core';
import { EnvService } from '../../core/services/env.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgencyDetailModel, IAgencyDetail, AdministrationCategoryRaw, AdministrationCategory } from '../models/agencydetails.module';

@Injectable({
  providedIn: 'root'
})

export class AgencyDataService extends BaseService {
  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  getAgencyDetailList(): Observable<AgencyDetailModel[]> {
    return this.http
      .get<IAgencyDetail[]>(`${this.apiUrl}/ArmsAgency/GetArmsAgency`,
        { headers: { 'Accept': 'application/vnd.dot.arms.armsagencyfordd+json' } })
      .pipe(map(raws => this.provideAgencyDetail(raws, "after get")));
  }

  createUpdateAgency(NewAgencyModel: AgencyDetailModel): Observable<AgencyDetailModel> {
    if (NewAgencyModel!=null && NewAgencyModel.agencyId != null) {
      return this.http
        .patch<AgencyDetailModel>(`${this.apiUrl}/ArmsAgency/UpdateAgency`, NewAgencyModel, {
          headers: {
            'Accept': 'application/vnd.dot.arms.armsagencyfordd+json',
            'Content-Type': 'application/vnd.dot.arms.agencyforupdate+json'
          }
        });
    }
    else {
      return this.http
        .post<AgencyDetailModel>(`${this.apiUrl}/ArmsAgency/AddNewAgency`, NewAgencyModel, {
          headers: {
            'Accept': 'application/vnd.dot.arms.armsagencyfordd+json',
            'Content-Type': 'application/vnd.dot.arms.agencyforcreate+json'
          }
        });
    }
  }

  deleteAgency(NewAgencyModel: AgencyDetailModel): Observable<any> {
    return this.http
      .post<AgencyDetailModel>(`${this.apiUrl}/ArmsAgency/DeleteAgency`, NewAgencyModel, {
        headers: {
          'Accept': 'application/vnd.dot.arms.armsagencyfordd+json',
          'Content-Type': 'application/vnd.dot.arms.agencyfordelete+json'
        }
      });

  }
  getAgencyCategories(): Observable<AdministrationCategoryRaw[]> {
    return this.http
      .get<AdministrationCategory[]>(`${this.apiUrl}/ArmsAdministrationCategory/GetArmsAdministrationCategories`,
        { headers: { 'Accept': 'application/vnd.dot.arms.armsadministrationcategoryforDD+json' } });
  }

  provideAgencyDetail(raws: IAgencyDetail[], message: string): AgencyDetailModel[] {
    return raws;
  }
}
