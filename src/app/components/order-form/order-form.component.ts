import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { CartItem } from '../../models/cart-item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="checkout-container">

      <h2>Checkout</h2>

     <div *ngIf="((cartItems$ | async)?.length || 0) === 0">
        <p>Your cart is empty</p>
        <button routerLink="/menu">Go to Menu</button>
      </div>

      <div *ngIf="((cartItems$ | async)?.length || 0) > 0">

        <div class="order-summary">

          <h3>Order Summary</h3>

          <div *ngFor="let item of cartItems$ | async" class="order-item">
            {{ item.menuItem.name }} x {{ item.quantity }} =
            {{ item.menuItem.price * item.quantity | currency:'USD' }}
          </div>

          <p class="total">
            Total: {{ cartService.getTotal() | currency:'USD' }}
          </p>

        </div>

        <form #orderForm="ngForm" (ngSubmit)="placeOrder(orderForm)" class="checkout-form">

          <h3>Customer Information</h3>

          <div class="form-group">

            <label>Name:</label>

            <input
              [(ngModel)]="customerName"
              name="name"
              required
              #name="ngModel"
            >

            <small *ngIf="name.invalid && name.touched">
              Name is required
            </small>

          </div>

          <div class="form-group">

            <label>Email:</label>

            <input
              [(ngModel)]="customerEmail"
              name="email"
              type="email"
              required
              #email="ngModel"
            >

            <small *ngIf="email.invalid && email.touched">
              Valid email required
            </small>

          </div>

          <div class="form-group">

            <label>Phone:</label>

            <input
              [(ngModel)]="customerPhone"
              name="phone"
              required
              #phone="ngModel"
            >

            <small *ngIf="phone.invalid && phone.touched">
              Phone number required
            </small>

          </div>

          <div class="form-buttons">

            <button type="button" routerLink="/cart">
              Back to Cart
            </button>

            <button type="submit" class="submit-btn">
              Place Order
            </button>

          </div>

        </form>

      </div>

    </div>
  `,
  styles: [`
    .checkout-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    .order-summary {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 4px;
      margin-bottom: 30px;
    }

    .order-item {
      padding: 5px 0;
      border-bottom: 1px solid #eee;
    }

    .total {
      font-weight: bold;
      font-size: 1.2em;
      margin-top: 15px;
    }

    .checkout-form {
      border: 1px solid #ddd;
      padding: 20px;
      border-radius: 4px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    small {
      color: red;
      font-size: 12px;
    }

    .form-buttons {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .submit-btn {
      background: #4caf50;
      color: white;
    }
  `]
})
export class OrderFormComponent {

  cartItems$: Observable<CartItem[]>;

  customerName = '';
  customerEmail = '';
  customerPhone = '';

  constructor(
    public cartService: CartService,
    private router: Router,
    private toast: ToastService
  ) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  placeOrder(form: any) {

    if (form.invalid) {
      this.toast.show('Please fill all required fields');
      return;
    }

    this.toast.show(
      `Order placed successfully! Total: $${this.cartService.getTotal()}`
    );

    this.cartService.clearCart();

    this.router.navigate(['/menu']);
  }

}