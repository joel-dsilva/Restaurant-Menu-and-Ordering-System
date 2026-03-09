import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  getMenuItems(): MenuItem[] {
    return [
      {
        id: 1,
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce and mozzarella',
        price: 12.99,
        category: 'Pizza',
        imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',
        ingredients: ['Tomato Sauce','Mozzarella','Basil'],
        isVegetarian: true,
        isSpicy: false,
        isAvailable: true
      },
      {
        id: 2,
        name: 'Spicy Chicken Burger',
        description: 'Juicy chicken burger with spicy mayo',
        price: 10.99,
        category: 'Burger',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        ingredients: ['Chicken Patty','Spicy Mayo','Lettuce'],
        isVegetarian: false,
        isSpicy: true,
        isAvailable: true
      },
      {
        id: 3,
        name: 'Caesar Salad',
        description: 'Fresh salad with Caesar dressing',
        price: 8.99,
        category: 'Salad',
        imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
        ingredients: ['Lettuce','Croutons','Parmesan'],
        isVegetarian: true,
        isSpicy: false,
        isAvailable: true
      },
      {
        id: 4,
        name: 'Pasta Alfredo',
        description: 'Creamy pasta with Alfredo sauce',
        price: 11.99,
        category: 'Pasta',
        imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400',
        ingredients: ['Pasta','Cream','Parmesan'],
        isVegetarian: true,
        isSpicy: false,
        isAvailable: true
      },
      {
        id: 5,
        name: 'Coca Cola',
        description: 'Cold soft drink',
        price: 2.99,
        category: 'Drink',
        imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400',
        ingredients: ['Carbonated Water','Sugar'],
        isVegetarian: true,
        isSpicy: false,
        isAvailable: true
      }
    ];
  }

}