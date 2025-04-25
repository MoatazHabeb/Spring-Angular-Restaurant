import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OrderDetails} from '../model/order-details';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'http://localhost:5050/orders/';
  constructor(private http: HttpClient) { }


  createOrder(products: { productId: number, quantity: number }[]): Observable<any> {
    return this.http.post(this.baseUrl + 'saveOrder', { products }).pipe(
      map(response => response)
    );
  }

  getOrderDetails(code): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(this.baseUrl + 'orderDetails/code/' + code).pipe(
      map(
        response => response
      )
    );
  }

  getRequestOrdersRelatedToUser(): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(this.baseUrl + 'userOrderDetails').pipe(
      map(
        response => response
      )
    );
  }
  getAllRequestOrders(): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(this.baseUrl + 'allOrderDetails').pipe(
      map(
        response => response
      )
    );
  }
}
