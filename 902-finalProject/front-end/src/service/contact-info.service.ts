
// contact-info.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// @ts-ignore

import {ContactInfo} from '../model/contact-info'; // Import your DTO model

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  private apiUrl = 'http://localhost:5050/ContactInfo/saveMessage';  // API endpoint

  constructor(private http: HttpClient) { }

  saveMessage(contactInfo: ContactInfo): Observable<ContactInfo> {
    return this.http.post<ContactInfo>(this.apiUrl, contactInfo);
  }
}
