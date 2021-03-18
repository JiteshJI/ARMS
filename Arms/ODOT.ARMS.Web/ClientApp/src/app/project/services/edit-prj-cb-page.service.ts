import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Observable, of } from 'rxjs';
import { EnvService } from '../../core/services/env.service';
import { ControllingBoardRaw } from '../models/cb-raw';

@Injectable({
  providedIn: 'root'
})
export class EditPrjCbPageService extends BaseService{

  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  //******************************************Controlling Board awesomeness beyond this point ***************************************//

  getCBsByProjectId(prjId: string): Observable<ControllingBoardRaw[]> {
    console.info('getCBsByProjectId: ' + prjId);
    var test = this.http.get<ControllingBoardRaw[]>(`${this.apiUrl}/ControllingBoard/${prjId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.cbsforproject+json' } });
    console.info(test);
    return test;
  }

  addCB(cb: ControllingBoardRaw): Observable<ControllingBoardRaw> {
    console.info('addCB');
    return this.http.post<ControllingBoardRaw>(`${this.apiUrl}/ControllingBoard`, cb
      , {
        headers: new HttpHeaders({
          'Accept': 'application/vnd.dot.arms.cb+json',
          'Content-Type': 'application/vnd.dot.arms.cbforcreate+json'
        })
      }
    );
  }

  updateCB(cb: ControllingBoardRaw): Observable<ControllingBoardRaw> {
    console.info('updateCB');
    return this.http.patch<ControllingBoardRaw>(`${this.apiUrl}/ControllingBoard/${cb.controllingBoardId}`, cb, {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.dot.arms.cb+json',
        'Content-Type': 'application/vnd.dot.arms.cbforupdate+json'
      })
    });
  }


}
