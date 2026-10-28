import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly apiUrl = 'http://localhost:3000/orders';

  // Holds the most recently placed order so the summary page can read it
  // without needing route params or a second HTTP round trip.
  private lastOrder: Order | null = null;

  constructor(private http: HttpClient) {}

  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  setLastOrder(order: Order): void {
    this.lastOrder = order;
  }

  getLastOrder(): Order | null {
    return this.lastOrder;
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }
}
