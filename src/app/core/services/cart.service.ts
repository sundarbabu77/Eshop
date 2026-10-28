import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);

  getCart(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }

  getSnapshot(): CartItem[] {
    return this.cartItems$.value;
  }

  addToCart(item: CartItem): void {
    const current = [...this.cartItems$.value];
    const existing = current.find(i => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      current.push({ ...item });
    }
    this.cartItems$.next(current);
  }

  updateQuantity(productId: number, quantity: number): void {
    const current = this.cartItems$.value.map(i =>
      i.productId === productId ? { ...i, quantity } : i
    );
    this.cartItems$.next(current);
  }

  removeFromCart(productId: number): void {
    this.cartItems$.next(this.cartItems$.value.filter(i => i.productId !== productId));
  }

  clearCart(): void {
    this.cartItems$.next([]);
  }

  getSubtotal(): number {
    return this.cartItems$.value.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
