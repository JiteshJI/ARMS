import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Injectable } from '@angular/core';
import { EnvService } from 'src/app/core/services/env.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactAgencyRaw, ContactAgency } from '../models/contacts.agency';
@Injectable({
  providedIn: 'root'
})

export class ContactAgencyDataService extends BaseService {
  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  /* (`${this.apiUrl}/api/ArmsContacts/GetArmsContacts`, */

  getSpecificContactAgencyList( contactid: string): Observable<ContactAgencyRaw[]> {
    console.log('getting contactList');
    return this.http
      .get<ContactAgencyRaw[]>(`${this.apiUrl}/ArmsContactAgencies/GetArmsContactAgencybyContactId?Contactid=${contactid}`,{
        headers: {
          'Accept': 'application/vnd.dot.arms.contactagencyfordd+json'
          }
        })
      .pipe(map(raws => this.provideContactAgencies(raws)));

  }


  provideContactAgencies(raws: ContactAgency[]): ContactAgencyRaw[] {
    console.log(raws);
    return raws;
  }


 AddNewContactAgency(contactAgency: ContactAgencyRaw): Observable<ContactAgencyRaw> {
   console.log('sending http post for a new contact agency');
   return this.http
         .post<ContactAgency>(`${this.apiUrl}/ArmsContactAgencies/AddNewContactAgency`, contactAgency, {
           headers: {
             'Accept' : 'application/vnd.dot.arms.contactagencyfordd+json',
             'Content-Type': 'application/vnd.dot.arms.contactagencyforcreate+json'
           }
         });

  }
  UpdateExistingContactAgency(contactAgency: ContactAgencyRaw): Observable<ContactAgencyRaw> {
    console.log('sending http update for an existing contact agency');
    return this.http
      .patch<ContactAgency>(`${this.apiUrl}/ArmsContactAgencies/UpdateContactAgency`, contactAgency, {
        headers: {
          'Accept': 'application/vnd.dot.arms.contactagencyfordd+json',
          'Content-Type': 'application/vnd.dot.arms.contactagencyforupdate+json'
        }
      });
  }
}
