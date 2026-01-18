import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../models/menu-item.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-menu-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="detail-container" *ngIf="menuItem">
      <a routerLink="/menu" class="back-link">← Back to Menu</a>

      <div class="detail-card">
        <img
          [src]="menuItem.imageUrl"
          [alt]="menuItem.name"
          class="detail-image"
        >

        <h2>{{ menuItem.name }}</h2>
        <p class="description">{{ menuItem.description }}</p>

        <div class="info-row">
          <span class="price">
            {{ menuItem.price | currency:'USD' }}
          </span>
          <span class="category">{{ menuItem.category }}</span>
        </div>

        <div class="tags">
          <span *ngIf="menuItem.isVegetarian" class="tag veg">
            🌱 Vegetarian
          </span>
          <span *ngIf="menuItem.isSpicy" class="tag spicy">
            🌶️ Spicy
          </span>
        </div>

        <div class="ingredients">
          <h4>Ingredients:</h4>
          <ul>
            <li *ngFor="let ingredient of menuItem.ingredients">
              {{ ingredient }}
            </li>
          </ul>
        </div>

        <div class="actions" *ngIf="menuItem.isAvailable">
          <button (click)="addToCart()" class="add-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    <div *ngIf="!menuItem" class="loading">
      <p>Loading item details...</p>
    </div>
  `,
  styles: [`
    .detail-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .back-link {
      display: inline-block;
      margin-bottom: 20px;
      color: #3f51b5;
      text-decoration: none;
    }
    .detail-card {
      border: 1px solid #ddd;
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .detail-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .description {
      font-size: 1.1em;
      line-height: 1.6;
      color: #555;
      margin: 15px 0;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
    }
    .price {
      font-size: 1.8em;
      font-weight: bold;
      color: #3f51b5;
    }
    .category {
      background: #f0f0f0;
      padding: 8px 16px;
      border-radius: 20px;
    }
    .tags {
      margin: 20px 0;
    }
    .tag {
      padding: 5px 12px;
      border-radius: 15px;
      margin-right: 10px;
      font-size: 0.9em;
    }
    .tag.veg {
      background: #e8f5e9;
      color: #2e7d32;
    }
    .tag.spicy {
      background: #ffebee;
      color: #c62828;
    }
    .ingredients ul {
      list-style: none;
      padding: 0;
    }
    .ingredients li {
      padding: 5px 0;
      border-bottom: 1px solid #eee;
    }
    .actions {
      margin-top: 30px;
    }
    .add-btn {
      background: #3f51b5;
      color: white;
      padding: 12px 30px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.1em;
      width: 100%;
    }
    .loading {
      text-align: center;
      padding: 50px;
      color: #666;
    }
  `]
})
export class MenuDetailComponent implements OnInit {
  menuItem: MenuItem | undefined;

  constructor(
  private route: ActivatedRoute,
  private menuService: MenuService,
  private cartService: CartService,
  private toast: ToastService
) {}


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const allItems = this.menuService.getMenuItems();
    this.menuItem = allItems.find(item => item.id === id);
  }

  addToCart() {
  if (this.menuItem) {
    this.cartService.addToCart(this.menuItem);
    this.toast.show(`${this.menuItem.name} added to cart`);
  }
}
}
