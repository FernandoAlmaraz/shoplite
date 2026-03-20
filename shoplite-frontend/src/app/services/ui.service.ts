import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  /**
   * Triggers the "Liquid Glass" fly-to-cart animation.
   * Centralized logic to ensure visual consistency and easier maintenance.
   */
  triggerFlyAnimation(event: MouseEvent) {
    // 1. Find the target (cart in header)
    const cartElement = document.querySelector('.nav-cart') || document.querySelector('.cart-badge');
    if (!cartElement) return;

    const cartRect = cartElement.getBoundingClientRect();
    
    // 2. Create the flying item (raindrop style)
    const flyItem = document.createElement('div');
    flyItem.className = 'fly-item';
    
    // Initial position (where user clicked)
    flyItem.style.left = `${event.clientX - 12}px`;
    flyItem.style.top = `${event.clientY - 12}px`;

    document.body.appendChild(flyItem);

    // 3. Animate towards the cart
    requestAnimationFrame(() => {
      // Small timeout to allow the browser to register the initial position
      setTimeout(() => {
        flyItem.style.left = `${cartRect.left + cartRect.width / 2 - 24}px`;
        flyItem.style.top = `${cartRect.top + cartRect.height / 2 - 24}px`;
        flyItem.style.transform = 'scale(0.5)';
        flyItem.style.opacity = '0';
      }, 20);
    });

    // 4. Cleanup after animation ends (1.6s to match CSS)
    setTimeout(() => {
      flyItem.remove();
    }, 1600);
  }
}
