import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base-service';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../../core/services/env.service';
import { Observable } from 'rxjs';
import { PooledParticipating } from '../models/pooled-participating';


@Injectable({
    providedIn: 'root'
})
export class PooledParticipatingDataService extends BaseService {

    constructor (private http: HttpClient,
        env: EnvService) {
        super(env);
    }

    loadSelectedProjectPooledParticipating(prjId: string): Observable<PooledParticipating[]> {
        return this.http.get<PooledParticipating[]>(`${this.apiUrl}/PooledParticipating/${prjId}`, {
            headers: { 'Accept': 'application/vnd.dot.arms.pooledparticipatingById+json' }
        });
    }

    createProjectPooledParticipating(pooledParticipating: PooledParticipating): Observable<PooledParticipating> {
        return this.http.post<PooledParticipating>(`${this.apiUrl}/PooledParticipating`, pooledParticipating, {
            headers: { 'Content-Type': 'application/vnd.dot.arms.pooledparticipatingforcreate+json' }
        });
    }

    updateProjectPooledParticipating(pooledParticipating: PooledParticipating): Observable<PooledParticipating> {
        return this.http.patch<PooledParticipating>(`${this.apiUrl}/PooledParticipating`, pooledParticipating, {
            headers: { 'Content-type': 'application/vnd.dot.arms.pooledparticipatingforupdate+json' }
        });
    }

}
