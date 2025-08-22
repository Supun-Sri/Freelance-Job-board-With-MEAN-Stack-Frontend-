import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders'; // Assuming this is the API endpoint

  constructor(private http: HttpClient) { }

  createOrder(order: Omit<Order, '_id' | 'orderDate' | 'status'>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  getOrdersByBuyer(buyerId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/buyer/${buyerId}`);
  }

  getOrdersByFreelancer(freelancerId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/freelancer/${freelancerId}`);
  }
}
