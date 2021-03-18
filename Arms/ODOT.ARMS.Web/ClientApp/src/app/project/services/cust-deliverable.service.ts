import { Injectable } from '@angular/core';
import { EnvService } from '../../core/services/env.service';
import { BaseService } from '../../shared/base-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deliverable } from '../models/custom-deliverable';
import { ProjectDeliverableList } from '../models/projectInfo';

@Injectable({
  providedIn: 'root'
})
export class CustDeliverableService extends BaseService {
  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  loadCustDeliverablebyProjectId(prjId: string): Observable<Deliverable[]> {
    return this.http.get<Deliverable[]>(`${this.apiUrl}/CustomDeliverable/${prjId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.customdeliverable+json' } });
  }

  createCustDeliverable(deliverable: Deliverable): Observable<Deliverable> {
    return this.http.post<Deliverable>(`${this.apiUrl}/CustomDeliverable`, deliverable, {
      headers: { 'Content-Type': 'application/vnd.dot.arms.customdeliverable+json' }
    });
  }

  updateCustDeliverable(deliverable: Deliverable): Observable<Deliverable> {
    return this.http.patch<Deliverable>(`${this.apiUrl}/CustomDeliverable`, deliverable, {
      headers: { 'Content-type': 'application/vnd.dot.arms.customdeliverable+json' }
    });
  }

  saveCustDeliverable(projectDeliverable: ProjectDeliverableList[]): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/CustomDeliverables`, projectDeliverable, {
      headers: { 'Content-type': 'application/vnd.dot.arms.customdeliverable+json' }
    });
  }
}
