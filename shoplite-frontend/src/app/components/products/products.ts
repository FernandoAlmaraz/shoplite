import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit, OnDestroy {

  products: any[] = [];
  currentSlide = 0;
  private autoPlayInterval: any;

  private supabaseUrl = 'https://pjlqgennztgxykneosga.supabase.co/rest/v1/products?select=*';
  private supabaseKey = 'sb_publishable_6D57oJm8ApsrfieSD_1X9w_fk4bjjfW';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'apikey': this.supabaseKey,
      'Authorization': `Bearer ${this.supabaseKey}`
    });

    this.http.get<any[]>(this.supabaseUrl, { headers })
      .subscribe({
        next: (data) => {
          this.products = [...data];
          this.cdr.detectChanges();
          this.startAutoPlay();
        },
        error: (err) => {
          console.error('❌ Error al cargar datos de Supabase:', err);
        }
      });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // --- Carousel Logic ---
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.products.length;
    this.resetAutoPlay();
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.products.length) % this.products.length;
    this.resetAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.resetAutoPlay();
  }

  private startAutoPlay(): void {
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