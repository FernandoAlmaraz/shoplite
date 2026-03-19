import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit, OnDestroy {

  products: Product[] = [];
  currentSlide = 0;
  private autoPlayInterval: any;

  constructor(
    private productService: ProductService, 
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Usamos el servicio profesional para obtener los datos
    this.productService.getProducts()
      .subscribe({
        next: (data) => {
          console.log('✅ Datos cargados DESDE EL SERVICIO:', data);
          this.products = [...data];
          this.cdr.detectChanges();
          this.startAutoPlay();
        },
        error: (err) => {
          console.error('❌ Error en el servicio de productos:', err);
        }
      });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // --- Carousel Logic ---
  nextSlide(): void {
    if (this.products.length === 0) return;
    this.currentSlide = (this.currentSlide + 1) % this.products.length;
    this.resetAutoPlay();
  }

  prevSlide(): void {
    if (this.products.length === 0) return;
    this.currentSlide = (this.currentSlide - 1 + this.products.length) % this.products.length;
    this.resetAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.resetAutoPlay();
  }

  private startAutoPlay(): void {
    if (this.products.length === 0) return;
    this.autoPlayInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.products.length;
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