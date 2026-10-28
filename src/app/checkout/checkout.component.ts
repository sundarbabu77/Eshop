import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../core/services/cart.service';
import { AuthService } from '../core/services/auth.service';
import { OrderService } from '../core/services/order.service';
import { CartItem, Order } from '../core/models/order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartItems: CartItem[] = [];
  subtotal = 0;
  shippingFee = 99;
  submitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.subtotal = this.cartService.getSubtotal();
    });

    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      line1: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      method: ['card', Validators.required]
    });
  }

  get f() {
    return this.checkoutForm.controls;
  }

  get total(): number {
    return this.subtotal + (this.cartItems.length ? this.shippingFee : 0);
  }

  placeOrder(): void {
    if (this.checkoutForm.invalid || this.cartItems.length === 0) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const user = this.authService.getUserSnapshot();
    const formValue = this.checkoutForm.value;

    const order: Order = {
      userId: user ? user.id : 0,
      items: this.cartItems,
      address: {
        fullName: formValue.fullName,
        line1: formValue.line1,
        city: formValue.city,
        state: formValue.state,
        zip: formValue.zip,
        phone: formValue.phone
      },
      payment: {
        cardName: formValue.cardName,
        // only the last 4 digits are kept for display on the summary page
        cardNumber: formValue.cardNumber.slice(-4),
        expiry: formValue.expiry,
        method: formValue.method
      },
      subtotal: this.subtotal,
      shippingFee: this.shippingFee,
      total: this.total,
      placedAt: new Date().toISOString()
    };

    this.submitting = true;
    this.errorMessage = '';

    this.orderService.placeOrder(order).subscribe({
      next: savedOrder => {
        this.orderService.setLastOrder(savedOrder);
        this.cartService.clearCart();
        this.submitting = false;
        this.router.navigate(['/checkout/summary']);
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = 'Could not place your order right now. Please try again.';
      }
    });
  }
}
