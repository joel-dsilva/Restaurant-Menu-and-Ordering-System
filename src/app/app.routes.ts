import { Routes } from '@angular/router';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuDetailComponent } from './components/menu-detail/menu-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { cartGuard } from './guards/cart.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuListComponent },
  { path: 'menu/:id', component: MenuDetailComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'checkout',
    canActivate: [cartGuard],
    loadComponent: () =>
      import('./components/order-form/order-form.component')
        .then(m => m.OrderFormComponent)
  },
  { path: '**', redirectTo: '/menu' }
];