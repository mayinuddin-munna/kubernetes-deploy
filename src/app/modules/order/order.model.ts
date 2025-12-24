import { v4 as uuidv4 } from 'uuid';
import mongoose, { Schema, model } from 'mongoose';
import { OrderItem, Orders, ShippingAddress } from './order.interface';

export const ShippingAddressSchema = new Schema<ShippingAddress>({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false } /* TODO: make true */,
  address: { type: String, required: true },
});

export const OrderItemSchema = new Schema<OrderItem>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SellerStore',
    required: true,
  },
  quantity: { type: Number, required: true },
});

const OrdersSchema = new Schema<Orders>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: '0',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    discountTotal: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'bkash', 'nagad', 'rocket', 'visa', 'mastercard'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing',
    },
    sellerCode: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // deliveryDate: { type: Date },
  },
  { timestamps: true },
);

// const existingOrder = await Order.findOne({ userId, status: "pending" });
// if (existingOrder) {
//   return res.status(400).json({ message: "You already have a pending order" });
// }

// Pre-save hook to handle duplicate orderId with a warning
OrdersSchema.pre('save', async function (next) {
  if (!this.orderId || this.orderId === '0') {
    this.orderId = uuidv4(); // Directly assign a UUID without checking
  }
  next();
});

export const OrderModel = model<Orders>('Orders', OrdersSchema);
