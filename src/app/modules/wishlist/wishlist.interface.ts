import { Types } from 'mongoose';

export interface Wishlist {
  user: Types.ObjectId;
  sellerStore: Types.ObjectId;
  products: Types.ObjectId[];
}
