import mongoose, { Schema } from 'mongoose';
import { Wishlist } from './wishlist.interface';

const wishlistSchema = new Schema<Wishlist>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    sellerStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SellerStore',
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
  },
  { timestamps: true },
);

export const Wishlists = mongoose.model('Wishlists', wishlistSchema);
