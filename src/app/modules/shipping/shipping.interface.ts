import { Types } from 'mongoose';

export interface Shipping {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  zip: string;
}
