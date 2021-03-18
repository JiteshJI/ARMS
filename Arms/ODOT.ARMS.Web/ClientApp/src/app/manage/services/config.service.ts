import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Injectable } from '@angular/core';
import { EnvService } from 'src/app/core/services/env.service';
import { Observable } from 'rxjs';
import { ConfigRaw } from '../models/config-raw';

@Injectable({
  providedIn: 'root'
})

export class ConfigService extends BaseService {

  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  getNotification(): Observable<ConfigRaw> {
    var keyNme: string = 'notification';//make in small caps
    console.info('ConfigService.getNotification()');
    return this.http.get<ConfigRaw>(`${this.apiUrl}/Config/${keyNme}`,
        { headers: { 'Accept': 'application/vnd.dot.arms.configforproject+json' } }
      );
  }

  updateNotification(config: ConfigRaw): Observable<ConfigRaw> {
    console.info('ConfigService.updateNotification()');
    //console.info(config.keyNme);
    return this.http.patch<ConfigRaw>(`${this.apiUrl}/Config/UpdateConfig`, config, {
      headers: { 'Content-Type': 'application/vnd.dot.arms.configforupdate+json' }
    });
  }
}

