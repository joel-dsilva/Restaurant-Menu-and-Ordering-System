import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { MenuItem } from '../../models/menu-item.model';
import { HighlightDirective } from '../../directives/highlight.directive';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HighlightDirective, MatCardModule, MatButtonModule],
  template: `
    <div class="menu-container">
      <h2>Our Menu</h2>

      <div class="menu-grid">
        <mat-card *ngFor="let item of menuItems" class="menu-card" appHighlight>

          <img
            [src]="item.imageUrl"
            [alt]="item.name"
            class="menu-image"
          >

          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>

          <p class="price">
            {{ item.price | currency:'USD' }}
          </p>

          <p class="category">{{ item.category }}</p>

          <div class="tags">
            <span *ngIf="item.isVegetarian" class="tag veg">
              🌱 Veg
            </span>

            <span *ngIf="item.isSpicy" class="tag spicy">
              🌶️ Spicy
            </span>
          </div>

          <div class="card-actions">
            <a [routerLink]="['/menu', item.id]">Details</a>

            <button mat-raised-button color="primary" (click)="addToCart(item)">
              Add to Cart
            </button>
          </div>
          </mat-card>

        </div>
      </div>
    
  `,
  styles: [`
    .menu-container {
      padding: 20px;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    .menu-card {
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .menu-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .price {
      font-weight: bold;
      color: #3f51b5;
      font-size: 1.2em;
    }

    .category {
      background: #f0f0f0;
      padding: 5px 10px;
      border-radius: 4px;
      display: inline-block;
      margin: 5px 0;
    }

    .tags {
      margin: 10px 0;
    }

    .tag {
      font-size: 0.8em;
      padding: 3px 8px;
      border-radius: 12px;
      margin-right: 5px;
    }

    .tag.veg {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .tag.spicy {
      background: #ffebee;
      color: #c62828;
    }

    .card-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }

    button, a {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
    }

    .add-btn {
      background: #3f51b5;
      color: white;
    }

    a {
      background: #f5f5f5;
      color: #333;
    }
  `]
})
export class MenuListComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor(
    private menuService: MenuService,
    private cartService: CartService,
    private toast: ToastService
  ) {}

  ngOnInit() {

    this.menuItems = this.menuService.getMenuItems();

  }

  addToCart(item: MenuItem) {
    this.cartService.addToCart(item);
    this.toast.show(`${item.name} added to cart`);
  }

}