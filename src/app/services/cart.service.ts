import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  addToCart(item: MenuItem): void {
    const existing = this.cartItems.find(ci => ci.menuItem.id === item.id);

    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push({ menuItem: item, quantity: 1 });
    }

    this.updateCart();
  }

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter(ci => ci.menuItem.id !== itemId);
    this.updateCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    );
  }

  getItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  private updateCart() {
    this.cartItemsSubject.next([...this.cartItems]);
    this.cartCountSubject.next(this.getItemCount());
  }

}