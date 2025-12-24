import { Types } from 'mongoose';

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  productName: string;
  category: string;
  image: string;
  brand: string;
  displayPrice: number;
  price: number;
  ratings: number;
  colors: string[];
  sizes: string[];
  tags: string[];
  sku: string;
  description: string;
  sellerCode: string;
  seller: Types.ObjectId;
  inventory: TInventory;
};
