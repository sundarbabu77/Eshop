import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  declarations: [CheckoutComponent, OrderSummaryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule {}
