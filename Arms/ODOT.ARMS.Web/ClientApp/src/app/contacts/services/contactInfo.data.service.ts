import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Injectable } from '@angular/core';
import { EnvService } from 'src/app/core/services/env.service';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ContactItemRaw, ContactItem } from '../models/contacts.items';
import { Update } from '@ngrx/entity';
@Injectable({
  providedIn: 'root'
})

export class ContactsDataService extends BaseService {
  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  /* (`${this.apiUrl}/api/ArmsContacts/GetArmsContacts`, */

  getContactsList(): Observable<ContactItemRaw[]> {
    console.log('getting contactList');
    return this.http
      .get<ContactItem[]>(`${this.apiUrl}/ArmsContacts/GetArmsContacts`,
        { headers: { 'Accept': 'application/vnd.dot.arms.contactsfordd+json' } })
      .pipe(map(raws => this.provideContacts(raws)));
  }


  provideContacts(raws: ContactItem[]): ContactItemRaw[] {
    console.log(raws);
    return raws;
  }

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
      });
  }
}
