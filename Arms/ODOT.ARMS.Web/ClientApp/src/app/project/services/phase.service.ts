import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Observable } from 'rxjs';
import { EnvService } from '../../core/services/env.service';
import { PhaseRaw } from '../models/phase-raw';

@Injectable({
  providedIn: 'root'
})
export class PhaseService extends BaseService {

  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  addPhase(phase: PhaseRaw): Observable<PhaseRaw> {
    console.info('addPhase');
    return this.http.post<PhaseRaw>(`${this.apiUrl}/Phase`, phase
      , {
        headers: new HttpHeaders({
          'Accept': 'application/vnd.dot.arms.phase+json',
          'Content-Type': 'application/vnd.dot.arms.phaseforcreate+json'
        })
      }
    );
  }

  updatePhase(phase: PhaseRaw): Observable<PhaseRaw> {
    console.info('EditArmsPhase');
    return this.http.patch<PhaseRaw>(`${this.apiUrl}/Phase/${phase.phaseId}`, phase, {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.dot.arms.phase+json',
        'Content-Type': 'application/vnd.dot.arms.phaseforupdate+json'
      })
    });
  }

  mergePhases(projectId: string, phases: PhaseRaw[]): Observable<PhaseRaw[]> {
    console.info('MergePhases', projectId, phases);
    return this.http.patch<PhaseRaw[]>(`${this.apiUrl}/Phase/${projectId}`, phases, {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.dot.arms.phase+json',
        'Content-Type': 'application/vnd.dot.arms.mergephases+json'
      })
    });
  }

}
