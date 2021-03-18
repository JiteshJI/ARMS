import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Observable, of } from 'rxjs';
import { EnvService } from '../../core/services/env.service';
import { EventUpload } from '../models/event-upload';


@Injectable({
  providedIn: 'root'
})
export class UploadsService extends BaseService {

  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  //******************************************Uploads***************************************//api/projects

  public getUploadsBySourceId(srcId: string): Observable<EventUpload[]> {
    return this.http.get<EventUpload[]>(`${this.apiUrl}/projects/${srcId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.uploadsforsource+json' } });
  }

  public getUploadsByProjectAltId(prjAltId: string): Observable<EventUpload[]> {
    return this.http.get<EventUpload[]>(`${this.apiUrl}/projects/${prjAltId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.uploadsforproject+json' } });
  }

  public getUploadById(uploadId: string): Observable<EventUpload> {
    return this.http.get<EventUpload>(`${this.apiUrl}/projects/${uploadId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.uploadforid+json' } });
  }

  //I might have to hard code server code to 'application/octet-stream'
  public DownloadFileById(projAltId: string, srcId: string, uploadId: string): Observable<HttpResponse<ArrayBuffer>> {
    console.info('uploadservice DownloadFileById');
    return this.http.get(`${this.apiUrl}/projects/${projAltId}/uploads/${srcId}/download/${uploadId}`, {
      headers: { 'Accept': 'application/octet-stream' },
      observe: 'response',
      'responseType': 'arraybuffer'
    });
  }

  public updateUpload(upload: EventUpload): Observable<EventUpload> {
    return this.http.patch<EventUpload>(`${this.apiUrl}/projects/${upload.eventUploadId}`, upload, {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.dot.arms.uploadfiles+json',
        'Content-Type': 'application/vnd.dot.arms.fileforupdate+json'
      })
    });
  }

  public deleteUpload(EventUploadId: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/projects/${EventUploadId}`);
  }
}
