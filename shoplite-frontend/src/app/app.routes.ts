import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Offers } from './components/offers/offers';
import { Cart } from './components/cart/cart';
import { ProductDetail } from './components/product-detail/product-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'product/:id', component: ProductDetail },
  { path: 'offers', component: Offers },
  { path: 'cart', component: Cart },
  { path: '**', redirectTo: 'home' } // Redirección para rutas no encontradas
];
