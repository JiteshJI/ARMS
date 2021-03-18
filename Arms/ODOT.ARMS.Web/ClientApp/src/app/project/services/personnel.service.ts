import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Observable, of } from 'rxjs';
import { EnvService } from '../../core/services/env.service';
import { Personnel } from '../models/personnel';


@Injectable({
  providedIn: 'root'
})
export class PersonnelDataService extends BaseService {

constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }


  loadSelectedPersonnel(prjId: string): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(`${this.apiUrl}/Personnel/${prjId}`, {
      headers : {'Accept': 'application/vnd.dot.arms.personnelById+json' }
    });
  }

  createPersonnel(personnel: Personnel): Observable<Personnel> {
      return this.http.post<Personnel>(`${this.apiUrl}/Personnel`, personnel, {
        headers: {'Content-Type': 'application/vnd.dot.arms.personnelforcreate+json'}
      });
  }

  updatePersonnel(personnel: Personnel): Observable<Personnel> {
      return this.http.patch<Personnel>(`${this.apiUrl}/Personnel`, personnel, {
        headers: {'Content-type': 'application/vnd.dot.arms.personnelforupdate+json' }
      });
  }
}





