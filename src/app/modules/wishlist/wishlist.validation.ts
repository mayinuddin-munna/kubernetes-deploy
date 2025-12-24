import { Types } from 'mongoose';
import { z } from 'zod';

const WishlistSchema = z.object({
  body: z.object({
    user: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid ObjectId for user',
    }),
    sellerStore: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid ObjectId for vendor',
    }),
    products: z
      .array(
        z.string().refine((id) => Types.ObjectId.isValid(id), {
          message: 'Invalid ObjectId for product',
        }),
      )
      .optional(),
  }),
});

export const WishlistValidation = { WishlistSchema };
