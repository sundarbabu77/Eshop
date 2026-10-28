// Add these route entries to your existing AppRoutingModule's `routes` array.
// (Not a full file — merge into your project's app-routing.module.ts)
// HomeComponent is a temporary test harness — remove once the real
// Product Catalog (Use Case 1) and Login (Use Case 4) screens exist.

import { HomeComponent } from './home/home.component';

{
  path: '',
  component: HomeComponent
},
{
  path: 'products',
  component: HomeComponent   // placeholder redirect target used by empty-cart/guard messages
},
{
  path: 'checkout',
  loadChildren: () =>
    import('./checkout/checkout.module').then(m => m.CheckoutModule)
}
