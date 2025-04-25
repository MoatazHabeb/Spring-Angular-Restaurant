import { Injectable } from '@angular/core';
import {Category} from '../model/category';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {CategoryVM} from "../model/category-vm";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  baseUrl = 'http://localhost:5050/category';
  constructor(private http: HttpClient) { }
  getAllCategory(): Observable<Category[]> {
  return this.http.get<Category[]>(this.baseUrl).pipe(
    map(
      response => response
    )
  );
  }

  // tslint:disable-next-line:typedef
  addCategory(category: CategoryVM) {
    return this.http.post<void>(this.baseUrl + '/addCategory', category).pipe(
      catchError((error) => {
        // Handle the error response here
        return throwError(error);
      })
    );
  }

  // tslint:disable-next-line:typedef
  deleteCategoryByName(name: string) {
    return this.http.delete(`${this.baseUrl}/deleteCategory/${name}`).pipe(
      catchError((error) => {
        // Handle the error response here, you can log it or transform it if needed
        return throwError(error);
      })
    );
  }

  updateCategory(existedName: string, category: CategoryVM): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/updateCategory/${existedName}`, category).pipe(
      catchError((error) => {
        // Handle the error response here, you can log it or transform it if needed
        return throwError(error);
      })
    );
  }
}
