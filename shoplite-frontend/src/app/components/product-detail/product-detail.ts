import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product?: Product;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('🔍 Cargando producto ID:', id);
    
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          console.log('📦 Datos recibidos del servidor:', data);
          if (data && data.length > 0) {
            this.product = data[0];
            this.error = false;
          } else {
            console.warn('⚠️ Producto no encontrado en la base de datos.');
            this.error = true;
          }
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('❌ Error al cargar producto:', err);
          this.error = true;
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.loading = false;
      this.error = true;
    }
  }

  addToCart(event: MouseEvent) {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.triggerFlyAnimation(event);
    }
  }

  private triggerFlyAnimation(event: MouseEvent) {
    const cartElement = document.querySelector('.nav-cart') || document.querySelector('.cart-badge');
    if (!cartElement) return;

    const cartRect = cartElement.getBoundingClientRect();
    const flyItem = document.createElement('div');
    flyItem.className = 'fly-item';
    
    flyItem.style.left = `${event.clientX - 12}px`;
    flyItem.style.top = `${event.clientY - 12}px`;

    document.body.appendChild(flyItem);

    requestAnimationFrame(() => {
      setTimeout(() => {
        flyItem.style.left = `${cartRect.left + cartRect.width / 2 - 24}px`;
        flyItem.style.top = `${cartRect.top + cartRect.height / 2 - 24}px`;
        flyItem.style.transform = 'scale(0.5)';
        flyItem.style.opacity = '0';
      }, 20);
    });

    setTimeout(() => {
      flyItem.remove();
    }, 1600);
  }
}
