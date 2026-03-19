import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container fade-in">
      <h1>Tu Carrito</h1>
      <div class="empty-cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p>Tu carrito está vacío actualmente.</p>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; text-align: center; }
    h1 { font-size: 2.5rem; margin-bottom: 2rem; }
    .empty-cart { padding: 5rem; background: white; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
  `]
})
export class Cart {}
