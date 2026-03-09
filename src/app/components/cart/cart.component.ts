import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-container">
      <h2>Your Cart</h2>

      <div *ngIf="((cartItems$ | async)?.length || 0) === 0" class="empty-cart">
        <p>Your cart is empty</p>
        <a routerLink="/menu">Go to Menu</a>
      </div>

      <div *ngIf="((cartItems$ | async)?.length || 0) > 0">

        <div *ngFor="let item of cartItems$ | async" class="cart-item">
          <h4>{{ item.menuItem.name }}</h4>

          <p>
            Price:
            {{ item.menuItem.price | currency:'USD' }}
          </p>

          <p>Quantity: {{ item.quantity }}</p>

          <p>
            Total:
            {{ item.menuItem.price * item.quantity | currency:'USD' }}
          </p>

          <button (click)="removeItem(item.menuItem.id)">Remove</button>
        </div>

        <div class="cart-summary">

          <h3>
            Total:
            {{ cartService.getTotal() | currency:'USD' }}
          </h3>

          <button (click)="clearCart()">Clear Cart</button>

          <button routerLink="/checkout" class="checkout-btn">
            Checkout
          </button>

        </div>

      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 20px;
    }

    .empty-cart {
      text-align: center;
      padding: 40px;
    }

    .cart-item {
      border: 1px solid #ddd;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 4px;
    }

    .cart-summary {
      margin-top: 30px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 4px;
    }

    button {
      margin: 5px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .checkout-btn {
      background: #4caf50;
      color: white;
    }
  `]
})
export class CartComponent {

  cartItems$: Observable<CartItem[]>;

  constructor(public cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  removeItem(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

}