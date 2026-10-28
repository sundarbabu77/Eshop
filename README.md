# ShopEase — Checkout & Order Summary (Use Case 6)

Bootstrap for styling, json-server as the mock backend.

## 1. Install dependencies into your existing Angular workspace

```bash
npm install bootstrap json-server --save
```

Add Bootstrap to `angular.json` (styles array):

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
]
```

## 2. Copy files into your project

Copy this folder's `src/app/*` into your project's `src/app/`, keeping the
paths:

```
src/app/core/models/order.model.ts
src/app/core/services/cart.service.ts
src/app/core/services/auth.service.ts
src/app/core/services/order.service.ts
src/app/core/guards/auth.guard.ts
src/app/checkout/...
```

If you already have `CartService` / `AuthService` from earlier use cases,
merge the methods shown here into your existing ones instead of overwriting.

## 3. Wire up routing

Add the routes from `app-routing.module.snippet.ts` into your root
`AppRoutingModule`. Make sure `HttpClientModule` is imported once in
`AppModule` (needed by `AuthService` and `OrderService`).

Also copy `src/app/home/home.component.ts` in and declare `HomeComponent`
in `AppModule`'s `declarations` array. This is a **temporary test harness**
standing in for the real Product Catalog (Use Case 1) and Login (Use Case 4)
screens — it just has two buttons ("Simulate Login" and "Add Test Item to
Cart") and a link to `/checkout`, so you can exercise the checkout flow
before those other use cases are built. Delete it once your real catalog
and login pages exist, and remove the `path: 'products'` placeholder route
at that point too.

## 4. Run the mock backend

Copy `db.json` to your project root, then:

```bash
npx json-server --watch db.json --port 3000
```

This serves:
- `GET/POST http://localhost:3000/orders`
- `GET http://localhost:3000/users` (used by login)
- `GET http://localhost:3000/products`

## 5. Run the app

```bash
ng serve
```

Log in with the seeded user (`asha@example.com` / `Passw0rd!`), add items to
the cart, then visit `/checkout`.

## What this implements

- **Routing**: `/checkout` (address & payment form) and nested
  `/checkout/summary` (order confirmation), configured in
  `checkout-routing.module.ts`.
- **Route guard**: `AuthGuard` (`CanActivate`) blocks `/checkout` for
  logged-out users and redirects to `/login`.
- **Forms**: Reactive Forms (`FormBuilder`/`FormGroup`) for the address and
  payment step, with required/pattern validators and Bootstrap
  `is-invalid` / `invalid-feedback` styling.
- **Services as singletons**: `CartService` (cart state via
  `BehaviorSubject`) and `AuthService` (session) are reused unchanged from
  earlier use cases; `OrderService` is new and posts the order to
  json-server.
- **State handoff**: the placed order is held in `OrderService` and read by
  `OrderSummaryComponent` — no route params needed for the summary page.
- **Place Order flow**: on submit, posts to `/orders`, clears the cart via
  `CartService.clearCart()`, and navigates programmatically to
  `/checkout/summary` with `Router.navigate()`.
