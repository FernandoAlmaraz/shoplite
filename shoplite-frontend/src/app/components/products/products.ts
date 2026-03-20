import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit, OnDestroy {

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  currentSlide = 0;
  private autoPlayInterval: any;

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) { }

  addToCart(product: Product, event: MouseEvent) {
    this.cartService.addToCart(product);
    this.triggerFlyAnimation(event);
  }

  private triggerFlyAnimation(event: MouseEvent) {
    // 1. Encontrar el destino (el carrito en el header)
    const cartElement = document.querySelector('.nav-cart') || document.querySelector('.cart-badge');
    if (!cartElement) return;

    const cartRect = cartElement.getBoundingClientRect();
    
    // 2. Crear el elemento volante (la gota/bola)
    const flyItem = document.createElement('div');
    flyItem.className = 'fly-item';
    
    // Posición inicial (donde se hizo clic)
    flyItem.style.left = `${event.clientX - 12}px`;
    flyItem.style.top = `${event.clientY - 12}px`;

    document.body.appendChild(flyItem);

    // 3. Animación hacia el carrito
    // Usamos requestAnimationFrame para asegurar que el navegador registre la posición inicial
    requestAnimationFrame(() => {
      // Forzamos un pequeño delay para que la transición CSS se dispare
      setTimeout(() => {
        flyItem.style.left = `${cartRect.left + cartRect.width / 2 - 24}px`;
        flyItem.style.top = `${cartRect.top + cartRect.height / 2 - 24}px`;
        flyItem.style.transform = 'scale(0.5)';
        flyItem.style.opacity = '0';
      }, 20);
    });

    // 4. Limpieza (Aumentamos a 1.6s para coincidir con el nuevo estilo CSS)
    setTimeout(() => {
      flyItem.remove();
    }, 1600);
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe({
        next: (data) => {
          console.log('✅ Datos cargados DESDE EL SERVICIO:', data);
          this.allProducts = [...data];
          this.filteredProducts = [...data]; // Inicialmente mostramos todos
          this.cdr.detectChanges();
          this.startAutoPlay();
        },
        error: (err) => {
          console.error('❌ Error en el servicio de productos:', err);
        }
      });
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredProducts = this.allProducts.filter(p => 
      p.name.toLowerCase().includes(this.searchTerm) || 
      p.description.toLowerCase().includes(this.searchTerm) ||
      p.category.toLowerCase().includes(this.searchTerm)
    );
    this.currentSlide = 0; // Reset carousel to first item of search
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // --- Carousel Logic ---
  nextSlide(): void {
    if (this.filteredProducts.length === 0) return;
    this.currentSlide = (this.currentSlide + 1) % this.filteredProducts.length;
    this.resetAutoPlay();
  }

  prevSlide(): void {
    if (this.filteredProducts.length === 0) return;
    this.currentSlide = (this.currentSlide - 1 + this.filteredProducts.length) % this.filteredProducts.length;
    this.resetAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.resetAutoPlay();
  }

  private startAutoPlay(): void {
    if (this.filteredProducts.length === 0) return;
    this.autoPlayInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.filteredProducts.length;
      this.cdr.detectChanges();
    }, 4000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}