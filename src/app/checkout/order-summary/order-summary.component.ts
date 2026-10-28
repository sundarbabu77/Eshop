import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  order: Order | null = null;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.order = this.orderService.getLastOrder();

    // Guard against a direct/refreshed visit to the summary page with no
    // order in memory — send the shopper back to the storefront instead.
    if (!this.order) {
      this.router.navigate(['/products']);
    }
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
}
