import mongoose, { Schema } from 'mongoose';
import { TInventory, TProduct } from './product.interface';

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const ProductSchema = new Schema<TProduct>(
  {
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    brand: {
      type: String,
      required: true,
    },
    displayPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ratings: {
      type: Number,
      required: false,
    },
    colors: [
      {
        type: String,
        required: true,
      },
    ],
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    sku: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sellerCode: {
      type: String,
      required: false,
      unique: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SellerStore',
      required: true,
    },
    inventory: inventorySchema,
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model<TProduct>('Product', ProductSchema);
