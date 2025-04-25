import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Product} from '../model/product';
import {ProductActionsVM} from "../model/product-actions-vm";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:5050/product';
  constructor(private http: HttpClient) { }

  getAllProduct(pageNo, pageSize): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/pageNo/' + pageNo + '/pageSize/' + pageSize).pipe(
      map(
        response => response
      )
    );
  }

  getProductByCategoryId(categoryId: number, pageNo, pageSize): Observable<Product[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Product[]>(this.baseUrl + '/category/categoryId/' + categoryId + '/pageNo/' + pageNo + '/pageSize/' + pageSize).pipe(
      map(
        response => response
      )
    );
  }

  search(key, pageNo, pageSize): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/search/' + key + '/pageNo/' + pageNo + '/pageSize/' + pageSize).pipe(
      map(
        response => response
      )
    );
  }
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteProduct/${productId}`);
  }

  addProduct(product: ProductActionsVM): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/addProduct`, product).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/UpdateProduct`, product);
  }
}
