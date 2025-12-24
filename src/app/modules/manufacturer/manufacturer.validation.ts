import { z } from 'zod';

const manufacturerStoreValidationSchema = z.object({
  body: z.object({
    storeName: z.string().min(3, 'Store Name is required'),
    storeEmail: z.string().min(1, 'Email is required').email('Invalid email'),
    storeCode: z.string().min(1, 'Store Code is required'),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    storePhoneNumber: z.string().min(1, 'Phone Number is required'),
    whatsappNumber: z.string().min(1, 'WhatsApp Number is required'),
    storeAddress: z.string().min(1, 'Store Address is required'),
    openingHours: z.string().optional(),
    storeStatus: z.enum(['active', 'inactive']).optional(),
    storeOwnerType: z.string().optional(),
    storeType: z.string().optional(),
    storeCategory: z.string().optional(),
    facebookPageLink: z.string().optional(),
    websiteUrl: z.string().optional(),
    storeLogo: z.string().optional(),
    bannerUrl: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const manufacturerStoreValidation = {
  manufacturerStoreValidationSchema,
};
