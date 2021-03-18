import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Observable, of } from 'rxjs';
import { EnvService } from '../../core/services/env.service';
import { FundingRaw } from '../models/fundings-raw';
import { LookupItem } from '../../shared/models/lookup-item';

@Injectable({
  providedIn: 'root'
})
export class FundingService extends BaseService {

  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  //******************************************Funding***************************************//


  getFundingByProjectId(prjId: string): Observable<FundingRaw[]> {
    return this.http.get<FundingRaw[]>(`${this.apiUrl}/ArmsFunding/${prjId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.fundingforproject+json' } });
  }

  addFunding(Funding: FundingRaw): Observable<FundingRaw> {
    console.info('addFunding');
    return this.http.post<FundingRaw>(`${this.apiUrl}/ArmsFunding`, Funding
      , {
        headers: new HttpHeaders({
          'Accept': 'application/vnd.dot.arms.Funding+json',
          'Content-Type': 'application/vnd.dot.arms.fundingsforcreate+json'
        })
      }
    );
  }

  updateFunding(Funding: FundingRaw): Observable<FundingRaw> {
    console.info('EditArmsFunding');
    return this.http.patch<FundingRaw>(`${this.apiUrl}/ArmsFunding/${Funding.encumbranceId}`, Funding, {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.dot.arms.Funding+json',
        'Content-Type': 'application/vnd.dot.arms.fundingsforupdate+json'
      })
    });
  }

}
