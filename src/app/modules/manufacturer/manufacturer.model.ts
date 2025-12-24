import mongoose from 'mongoose';
import { TManufacturerStore } from './manufacturer.interface';

const ManufacturerStoreModel = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
      unique: true,
    },
    storeEmail: {
      type: String,
      required: true,
      unique: true,
    },
    storeCode: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    storePhoneNumber: {
      type: String,
      required: false,
      unique: true,
    },
    whatsappNumber: {
      type: String,
      required: false,
      unique: true,
    },
    storeAddress: {
      type: String,
      required: true,
    },
    openingHours: {
      type: String,
    },
    storeStatus: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    storeOwnerType: {
      type: String,
    },
    storeType: {
      type: String,
    },
    storeCategory: {
      type: String,
    },
    facebookPageLink: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    storeLogo: {
      type: String,
    },
    bannerUrl: {
      type: String,
    },
    storeDescription: {
      type: String,
    },
  },
  { timestamps: true },
);

export const ManufacturerStore = mongoose.model<TManufacturerStore>(
  'ManufacturerStore',
  ManufacturerStoreModel,
);
