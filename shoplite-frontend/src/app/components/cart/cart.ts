import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container fade-in">
      <header class="cart-header">
        <h1>Tu Carrito</h1>
        <button *ngIf="cartService.count() > 0" (click)="cartService.clearCart()" class="clear-btn">Vaciar Carrito</button>
      </header>
      
      <div *ngIf="cartService.count() === 0" class="empty-cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p>Tu carrito está vacío actualmente.</p>
        <button routerLink="/products" class="back-btn">Ir a la tienda</button>
      </div>

      <div *ngIf="cartService.count() > 0" class="cart-content">
        <div class="cart-items">
          <div *ngFor="let item of cartService.cartItems(); let i = index" class="cart-item">
            <img [src]="item.image" [alt]="item.name" class="item-img">
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p class="item-cat">{{ item.category }}</p>
            </div>
            <span class="item-price">\Bs. {{ item.price }}</span>
            <button (click)="cartService.removeFromCart(i)" class="remove-btn" aria-label="Eliminar">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>\Bs. {{ cartService.total() }}</span>
          </div>
          <div class="summary-total">
            <span>Total</span>
            <span>\Bs. {{ cartService.total() }}</span>
          </div>
          <button class="checkout-btn">Finalizar Compra</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 4rem 2rem; max-width: 1000px; margin: 0 auto; min-height: 70vh; }
    .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
    h1 { font-size: 2.25rem; font-weight: 700; margin: 0; }
    
    .clear-btn { background: none; border: none; color: #ef4444; font-weight: 600; cursor: pointer; }
    
    .empty-cart { padding: 5rem 2rem; background: #fafafa; border-radius: 16px; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; border: 1px dashed #ddd; }
    .back-btn { background: var(--primary); color: white; border: none; padding: 0.75rem 2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }

    .cart-content { display: grid; grid-template-columns: 1fr 340px; gap: 2.5rem; align-items: start; }
    
    .cart-items { background: white; border-radius: 12px; border: 1px solid #eee; overflow: hidden; }
    .cart-item { display: flex; align-items: center; padding: 1.25rem; border-bottom: 1px solid #f5f5f5; gap: 1rem; }
    .cart-item:last-child { border-bottom: none; }
    
    .item-img { width: 70px; height: 70px; object-fit: cover; border-radius: 8px; background: #f9f9f9; }
    .item-info { flex-grow: 1; text-align: left; }
    .item-info h3 { font-size: 0.95rem; margin: 0 0 0.2rem; font-weight: 600; }
    .item-cat { font-size: 0.8rem; color: #777; margin: 0; }
    .item-price { font-weight: 700; font-size: 1rem; color: var(--primary); min-width: 80px; text-align: right; }
    
    .remove-btn { background: none; border: none; color: #ccc; cursor: pointer; padding: 5px; transition: color 0.2s; }
    .remove-btn:hover { color: #ef4444; }

    .cart-summary { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; position: sticky; top: 100px; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 1rem; color: #64748b; font-size: 0.95rem; }
    .free { color: #10b981; font-weight: 600; }
    .summary-total { display: flex; justify-content: space-between; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px dashed #e2e8f0; font-weight: 800; font-size: 1.3rem; color: #1e293b; margin-bottom: 1.5rem; }
    
    .checkout-btn { width: 100%; background: #1e293b; color: white; border: none; padding: 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: transform 0.2s; }
    .checkout-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

    @media (max-width: 768px) {
      .cart-content { grid-template-columns: 1fr; }
      .cart-summary { order: -1; }
    }
  `]
})
export class Cart {
  constructor(public cartService: CartService) {}
}
