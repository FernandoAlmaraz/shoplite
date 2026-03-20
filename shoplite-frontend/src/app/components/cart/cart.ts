import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { trigger, transition, style, animate, state, query, stagger, animateChild } from '@angular/animations';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  animations: [
    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':leave', [
          stagger(100, [
            animate('0.4s cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'translateX(-100px) scale(0.8)', height: 0, padding: 0, margin: 0 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('itemAnim', [
      transition(':leave', [
        animate('0.4s cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'translateX(-100px) scale(0.8)', height: 0, padding: 0, margin: 0 }))
      ])
    ])
  ]
})
export class Cart {
  shakingIndex = signal<number | null>(null);
  isClearing = signal<boolean>(false);
  showEmptyState = signal<boolean>(true);

  constructor(public cartService: CartService) { }

  onRemove(index: number) {
    // 1. Activar animación de "vibración" en el basurero
    this.shakingIndex.set(index);

    // 2. Esperar un instante y borrar (lo cual dispara la animación @itemAnim)
    setTimeout(() => {
      this.cartService.removeFromCart(index);
      this.shakingIndex.set(null);
    }, 150);
  }

  onClearCart() {
    this.isClearing.set(true);
    this.showEmptyState.set(false);

    const count = this.cartService.count();
    const delay = Math.min(count * 100 + 400, 2000);

    setTimeout(() => {
      this.cartService.clearCart();
      this.isClearing.set(false);

      // Un pequeño respiro extra antes de mostrar el mensaje de vacío
      setTimeout(() => {
        this.showEmptyState.set(true);
      }, 100);
    }, delay);
  }
}
