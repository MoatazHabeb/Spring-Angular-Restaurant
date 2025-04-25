import { Injectable } from '@angular/core';
import {Chefs} from "../model/chefs";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChefsService {



  baseUrl = 'http://localhost:5050/Chef';
  constructor(private http: HttpClient) { }
  getAllChefs(): Observable<Chefs[]> {
    return this.http.get<Chefs[]>(this.baseUrl).pipe(
      map(
        response => response
      )
    );
  }
}
