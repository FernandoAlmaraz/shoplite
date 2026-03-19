import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container fade-in">
      <h1>Ofertas Especiales</h1>
      <div class="empty-state">
        <p>¡Vuelve pronto! Estamos preparando las mejores ofertas para ti.</p>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; text-align: center; }
    h1 { font-size: 2.5rem; margin-bottom: 2rem; }
    .empty-state { padding: 4rem; background: white; border-radius: 12px; border: 1px dashed #ddd; }
  `]
})
export class Offers {}
