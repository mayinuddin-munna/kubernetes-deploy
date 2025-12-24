import mongoose, { Schema } from 'mongoose';
import { TPost } from './post.interface';

const PostSchema = new Schema<TPost>(
  {
    postTitle: {
      type: String,
      required: true,
    },
    natureOfDiscount: {
      type: String,
      required: true,
    },
    natureOfDiscountType: {
      type: String,
      required: true,
    },
    discountNatureDetails: {
      type: String,
      required: true,
    },
    bannerURL: {
      type: String,
      required: true,
    },
    promoVideoURL: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
    fbDiscountDetails: {
      type: String,
      required: true,
    },
    storeCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export const PostModel = mongoose.model<TPost>('Post', PostSchema);
