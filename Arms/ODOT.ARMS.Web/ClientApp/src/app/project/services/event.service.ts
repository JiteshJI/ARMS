import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse  } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Observable, of } from 'rxjs';
import { EnvService } from '../../core/services/env.service';
import { EventRaw } from '../models/event-raw';
import { LookupItem } from '../../shared/models/lookup-item';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService {

  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  //******************************************Event***************************************//

  getEventsByProjectId(prjId: string): Observable<EventRaw[]> {
    return this.http.get<EventRaw[]>(`${this.apiUrl}/Event/${prjId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.eventsforproject+json' } });
  }

  getPrimaryEvents(): Observable<LookupItem[]> {
    return this.http
      .get<LookupItem[]>(`${this.apiUrl}/ReferenceData`,
        { headers: { 'Accept': 'application/vnd.dot.arms.primaryeventsfordd+json' } });
  }
  getSecondaryEvents(): Observable<LookupItem[]> {
    return this.http
      .get<LookupItem[]>(`${this.apiUrl}/ReferenceData`,
        { headers: { 'Accept': 'application/vnd.dot.arms.secondaryeventsfordd+json' } });
  }

 // getEventsByProjectId(prjId: string): Observable<EventsRaw[]> {
 //   return this.http.get<EventsRaw[]>(`${this.apiUrl}/ArmsEvent/GetArmsEventListByProjectId?projectId=${prjId}`,
 //     { headers: { 'Accept': 'application/vnd.dot.arms.eventListfordd+json' } });
 // }
  addEvent(event: EventRaw): Observable<EventRaw[]> {
    console.info('addEvent');
    return this.http.post<EventRaw[]>(`${this.apiUrl}/Event`, event
      , {
        headers: new HttpHeaders({
          'Accept': 'application/vnd.dot.arms.event+json',
          'Content-Type': 'application/vnd.dot.arms.eventsforcreate+json'
      })  
      }
    );
  }

  updateEvent(event: EventRaw): Observable<EventRaw> {
    console.info('EditArmsEvent');
    return this.http.patch<EventRaw>(`${this.apiUrl}/Event/${event.eventId}`, event, {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.dot.arms.event+json',
        'Content-Type': 'application/vnd.dot.arms.eventsforupdate+json'
      })
    });
  }

  /*
  createNewContact(contact: ContactItemRaw): Observable<ContactItemRaw> {
    console.log('sending http post for new contact');
    return this.http
      .post<ContactItem>(`${this.apiUrl}/ArmsContacts/AddNewContact`, contact, {
        headers: {
          'Accept': 'application/vnd.dot.arms.contactsfordd+json',
          'Content-Type': 'application/vnd.dot.arms.contactsforcreate+json'
        }
      });
  }

  UpdateExistingContact(contact: ContactItemRaw): Observable<ContactItemRaw> {
    console.log('sending http update for an existing contact');
    return this.http
      .patch<ContactItem>(`${this.apiUrl}/ArmsContacts/UpdateContact`, contact, {
        headers: {
          'Accept': 'application/vnd.dot.arms.contactsfordd+json',
          'Content-Type': 'application/vnd.dot.arms.contactsforupdate+json'
        }
      */

  //******************************************Event***************************************//


}
