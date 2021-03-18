import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../../core/services/env.service';
import { BaseService } from '../../shared/base-service';
import { OverviewRaw } from '../models/Overview-raw';

@Injectable({
  providedIn: 'root'
})
export class OverviewService extends BaseService {

  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }
  getOverviewByProjectId(prjId: string): Observable<OverviewRaw[]> {
    return this.http.get<OverviewRaw[]>(`${this.apiUrl}/ArmsFinOverview/${prjId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.finOverviewforproject+json' } });
  }

}
