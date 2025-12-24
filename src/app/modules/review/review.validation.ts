import { Types } from 'mongoose';
import { z } from 'zod';

const ReviewSchema = z.object({
  body: z.object({
    product: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid ObjectId for product',
    }),
    user: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid ObjectId for user',
    }),
    rating: z
      .number()
      .min(1, { message: 'Rating must be at least 1' })
      .max(5, { message: 'Rating must be at most 5' }),
    comment: z.string().optional(),
  }),
});

export const OrdersValidation = { ReviewSchema };
