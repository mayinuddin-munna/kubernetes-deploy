export interface TManufacturerStore {
  storeName: string;
  storeEmail: string;
  city?: string;
  state?: string;
  country?: string;
  storePhoneNumber: string;
  whatsappNumber: string;
  storeAddress: string;
  openingHours?: string;
  storeStatus: 'active' | 'inactive';
  storeOwnerType?: string;
  storeType?: string;
  storeCategory?: string;
  facebookPageLink?: string;
  websiteUrl?: string;
  storeLogo?: string;
  bannerUrl?: string;
  storeDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
