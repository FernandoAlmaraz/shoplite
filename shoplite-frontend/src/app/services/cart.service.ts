import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Estado privado del carrito usando Signals para reactividad moderna
  private cartItemsSignal = signal<Product[]>(this.loadCart());

  // Signal público (solo lectura) para que los componentes lo consuman
  public cartItems = this.cartItemsSignal.asReadonly();

  // Signal computada para el total de productos
  public count = computed(() => this.cartItemsSignal().length);

  // Signal computada para el precio total
  public total = computed(() => 
    this.cartItemsSignal().reduce((acc, item) => acc + item.price, 0)
  );

  constructor() {}

  /**
   * Agrega un producto al carrito y lo guarda en localStorage
   */
  addToCart(product: Product) {
    this.cartItemsSignal.update(items => {
      const updatedItems = [...items, product];
      this.saveCart(updatedItems);
      return updatedItems;
    });
  }

  /**
   * Elimina un producto por su ID (o índice)
   */
  removeFromCart(index: number) {
    this.cartItemsSignal.update(items => {
      const updatedItems = items.filter((_, i) => i !== index);
      this.saveCart(updatedItems);
      return updatedItems;
    });
  }

  /**
   * Limpia todo el carrito
   */
  clearCart() {
    this.cartItemsSignal.set([]);
    localStorage.removeItem('shoplite_cart');
  }

  // --- Helpers para persistencia ---

  private saveCart(items: Product[]) {
    localStorage.setItem('shoplite_cart', JSON.stringify(items));
  }

  private loadCart(): Product[] {
    const saved = localStorage.getItem('shoplite_cart');
    return saved ? JSON.parse(saved) : [];
  }
}
