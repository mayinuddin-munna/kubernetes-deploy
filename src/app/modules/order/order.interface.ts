import { Types } from 'mongoose';

export interface OrderItem {
  product: Types.ObjectId;
  seller: Types.ObjectId;
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Orders {
  orderId: string;
  userId: Types.ObjectId;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  totalAmount: number;
  discountTotal: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'rocket' | 'visa' | 'mastercard';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  sellerCode: string;
  isActive: boolean;
  // deliveryDate: Date;
}
