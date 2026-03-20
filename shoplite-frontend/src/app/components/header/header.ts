import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuOpen = false;
  cartAnimated = signal(false);

  constructor(public cartService: CartService) {
    // Escuchamos cambios en el contador para disparar la animación
    effect(() => {
      const count = this.cartService.count();
      if (count > 0) {
        this.cartAnimated.set(true);
        setTimeout(() => this.cartAnimated.set(false), 300);
      }
    }, { allowSignalWrites: true });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
