export interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export interface PaymentDetails {
  cardName: string;
  cardNumber: string;   // last 4 digits are stored/displayed only
  expiry: string;
  method: 'card' | 'cod';
}

export interface Order {
  id?: number;
  userId: number;
  items: CartItem[];
  address: ShippingAddress;
  payment: PaymentDetails;
  subtotal: number;
  shippingFee: number;
  total: number;
  placedAt: string;
}
