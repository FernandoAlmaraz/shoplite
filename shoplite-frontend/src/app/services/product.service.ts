import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly supabaseUrl = 'https://pjlqgennztgxykneosga.supabase.co/rest/v1/products';
  private readonly supabaseKey = 'sb_publishable_6D57oJm8ApsrfieSD_1X9w_fk4bjjfW';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los productos desde la API REST de Supabase.
   * @returns Observable con el array de productos.
   */
  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders({
      'apikey': this.supabaseKey,
      'Authorization': `Bearer ${this.supabaseKey}`
    });

    // Añadimos ?select=* para traer todas las columnas
    return this.http.get<Product[]>(`${this.supabaseUrl}?select=*`, { headers });
  }

  /**
   * (Opcional) Ejemplo de cómo podrías agregar un producto en el futuro
   */
  addProduct(product: Partial<Product>): Observable<any> {
    const headers = new HttpHeaders({
      'apikey': this.supabaseKey,
      'Authorization': `Bearer ${this.supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    });

    return this.http.post(this.supabaseUrl, product, { headers });
  }
}
