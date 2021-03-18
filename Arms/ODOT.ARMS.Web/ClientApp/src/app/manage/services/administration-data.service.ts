import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Injectable } from '@angular/core';
import { EnvService } from 'src/app/core/services/env.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AdministrationCategory, AdministrationCategoryRaw, SpecificListAdministration, SpecificListAdministrationRaw,
  FundingTypeListAdministration, FundingTypeListAdministrationRaw
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdministrationDataService extends BaseService{
  
  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }


  getFundingTypeList(): Observable<FundingTypeListAdministrationRaw[]> {
    console.log('getFundingTypeList')
    return this.http
      .get<FundingTypeListAdministration[]>(`${this.apiUrl}/ArmsFundingType/`,
        { headers: { 'Accept': 'application/vnd.dot.arms.fundingtypeListfordd+json' } })
      .pipe(map(raws => this.provideList(raws)));
  }

  provideList(raws: FundingTypeListAdministration[]): FundingTypeListAdministrationRaw[] {
    console.log(raws);
    return raws;
  }

  getSpecificList(): Observable<SpecificListAdministrationRaw[]> {
    console.log('getFundingSpecificList')
    return this.http
      .get<SpecificListAdministration[]>(`${this.apiUrl}/ArmsFundingSpecificList/`,
      { headers: { 'Accept': 'application/vnd.dot.arms.fundingspecificlistfordd+json' } })
      .pipe(map(raws => this.provideSpecificList(raws)));
  }

  provideSpecificList(raws: SpecificListAdministration[]): SpecificListAdministrationRaw[] {
    console.log(raws);
    return raws;
  }

  getAgencyCategories(): Observable<AdministrationCategoryRaw[]> {
    console.log('getAgencyCategories')
    return this.http
      .get<AdministrationCategory[]>(`${this.apiUrl}/ArmsAdministrationCategory/`,
        { headers: { 'Accept': 'application/vnd.dot.arms.armsadministrationcategoryforDD+json' } })
      .pipe(map(raws => this.provideAdministration(raws)));
  }

  provideAdministration(raws: AdministrationCategory[]): AdministrationCategoryRaw[] {
    console.log(raws);
    return raws;
  }

  getAgencyCategoriesById(queryTitle: string): Observable<AdministrationCategory[]> {
    return this.http
      .get<{ items: AdministrationCategory[] }>(`${this.apiUrl}/${queryTitle}`)
      .pipe(map(administrationCategory => administrationCategory.items || []));
  }

  createAdministrationCategory(NewAdministrationCategoryModel: AdministrationCategory): Observable<AdministrationCategory> {
    console.log("createUpdateAdministrationCategory",NewAdministrationCategoryModel);
      return this.http
        .post<AdministrationCategory>(`${this.apiUrl}/ArmsAdministrationCategory/AddArmsAdministrationCategory`, NewAdministrationCategoryModel, {
          headers: {
            'Accept': 'application/vnd.dot.arms.armsadministrationcategoryforDD+json',
            'Content-Type': 'application/vnd.dot.arms.administrationCategoryforcreate+json'
          }
        });
  }

  UpdateAdministrationCategory(courseId: string | number,NewAdministrationCategoryModel: Partial<AdministrationCategory>): Observable<AdministrationCategory> {
    console.log("createUpdateAdministrationCategory", NewAdministrationCategoryModel);
    if (NewAdministrationCategoryModel != null && NewAdministrationCategoryModel.administrationCategoryID != null) {
      return this.http
        .patch<AdministrationCategory>(`${this.apiUrl}/ArmsAdministrationCategory/UpdateArmsAdministrationCategory`, NewAdministrationCategoryModel, {
          headers: {
            'Accept': 'application/vnd.dot.arms.armsadministrationcategoryforDD+json',
            'Content-Type': 'application/vnd.dot.arms.administrationCategoryforupdate+json'
          }
        });
    }
  }
}
