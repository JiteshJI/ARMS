import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../../core/services/env.service';
import { BaseService } from '../../shared/base-service';
import { LedgerRaw } from '../models/ledger-raw';

@Injectable({
  providedIn: 'root'
})
export class LedgerService extends BaseService {

  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }
  getLedgerByProjectId(prjId: string): Observable<LedgerRaw[]> {
    return this.http.get<LedgerRaw[]>(`${this.apiUrl}/ArmsLedger/${prjId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.ledgerforproject+json' } });
  }

}
