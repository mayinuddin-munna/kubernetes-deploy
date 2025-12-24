import { Types } from 'mongoose';
import { z } from 'zod';

const shippingItemSchema = z.object({
  product: z.string().refine((id) => Types.ObjectId.isValid(id), {
    message: 'Invalid ObjectId for product',
  }),
  quantity: z.number().min(1, 'Quantity must be at least 1').default(1),
});

const ShippingSchema = z.object({
  body: z.object({
    user: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid ObjectId for user',
    }),
    items: z.array(shippingItemSchema),
    totalPrice: z.number().nonnegative().default(0),
  }),
});

export const ShippingValidation = { ShippingSchema };
