import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products: any[] = [];
  
  // URL generada por Supabase usando la tabla 'products'
  private supabaseUrl = 'https://pjlqgennztgxykneosga.supabase.co/rest/v1/products?select=*';
  
  // Clave pública (anon)
  private supabaseKey = 'sb_publishable_6D57oJm8ApsrfieSD_1X9w_fk4bjjfW';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Supabase REST API requiere estas dos cabeceras para autenticar consultas públicas
    const headers = new HttpHeaders({
      'apikey': this.supabaseKey,
      'Authorization': `Bearer ${this.supabaseKey}`
    });

    // Petición al backend JAMstack
    this.http.get<any[]>(this.supabaseUrl, { headers })
      .subscribe({
        next: (data) => {
          console.log('✅ Datos cargados DESDE SUPABASE:', data);
          this.products = [...data]; // spread operator fuerza nueva referencia del array
          this.cdr.detectChanges();  // fuerza a Angular a re-renderizar la vista
        },
        error: (err) => {
          console.error('❌ Error al cargar datos de Supabase:', err);
        }
      });
  }
}