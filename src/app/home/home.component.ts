import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../core/services/cart.service';
import { AuthService } from '../core/services/auth.service';

/**
 * TEST HARNESS ONLY.
 * Stands in for the real Product Catalog (Use Case 1) and Login (Use Case 4)
 * screens, just enough to exercise the Checkout & Summary feature (Use Case 6)
 * in isolation. Replace/remove once the real catalog and auth screens exist.
 */
@Component({
  selector: 'app-home',
  template: `
    <div class="container py-5 text-center">
      <h2 class="mb-4">Checkout Test Harness</h2>
      <p class="text-muted">
        This page stands in for the product catalog + login screens so you
        can test <code>/checkout</code> before those are built.
      </p>

      <div class="d-flex justify-content-center gap-2 mb-3">
        <button class="btn btn-outline-secondary" (click)="login()">
          {{ loggedInLabel }}
        </button>
        <button class="btn btn-outline-secondary" (click)="addTestItem()">
          Add Test Item to Cart ({{ itemCount }})
        </button>
      </div>

      <button class="btn btn-primary" routerLink="/checkout">
        Go to Checkout
      </button>
    </div>
  `
})
export class HomeComponent {
  itemCount = 0;
  loggedInLabel = 'Simulate Login';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartService.getCart().subscribe(items => (this.itemCount = items.length));
  }

  login(): void {
    // Bypasses the real HTTP login call for test purposes only.
    this.authService.login('asha@example.com', 'Passw0rd!').subscribe(success => {
      this.loggedInLabel = success ? 'Logged in ✓' : 'Login failed (is json-server running?)';
    });
  }

  addTestItem(): void {
    this.cartService.addToCart({
      productId: 1,
      name: 'Wireless Headphones',
      price: 2499,
      image: 'https://picsum.photos/seed/p1/300/200',
      quantity: 1
    });
  }
}
