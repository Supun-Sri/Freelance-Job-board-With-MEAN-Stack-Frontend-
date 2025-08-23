import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './order.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
private apiUrl = environment.apiUrl + '/orders'; 

  constructor(private http: HttpClient) { }

  createOrder(order: Omit<Order, '_id' | 'orderDate' | 'status'>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  getOrdersByBuyer(buyerId: string): Observable<Order[]> {
    return this.http.get<any>(`${this.apiUrl}/buyer/${buyerId}`).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        }
        if (response && Array.isArray(response.orders)) {
          return response.orders;
        }
        return [];
      })
    );
  }

  getOrdersByFreelancer(freelancerId: string): Observable<Order[]> {
    return this.http.get<any>(`${this.apiUrl}/freelancer/${freelancerId}`).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        }
        if (response && Array.isArray(response.orders)) {
          return response.orders;
        }
        return [];
      })
    );
  }
}
