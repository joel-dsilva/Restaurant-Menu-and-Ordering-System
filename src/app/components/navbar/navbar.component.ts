import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <span>🍕 Restaurant App</span>

      <span class="spacer"></span>

      <button mat-button routerLink="/menu">Menu</button>
      <button mat-button routerLink="/cart">
        Cart ({{ cartCount$ | async }})
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      background: var(--mat-sys-primary);
      color: white;
    }

    .spacer {
      flex: 1 1 auto;
    }

    button {
      color: white;
    }
  `]
})
export class NavbarComponent {

  cartCount$!: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartCount$ = this.cartService.cartCount$;
  }

}