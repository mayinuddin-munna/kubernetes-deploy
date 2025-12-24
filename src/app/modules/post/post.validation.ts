import { z } from 'zod';

const postValidationSchema = z.object({
  body: z.object({
    productName: z.string().min(3, 'Product Name is required'),
    category: z.string().min(1, 'Category is required'),
    image: z.string(),
    brand: z.string(),
    displayPrice: z.number(),
    price: z
      .number({ required_error: 'Price is required' })
      .nonnegative('Price must be non-negative')
      .min(1, 'Price must be greater than or equal to 1'),
    ratings: z.number(),
    tags: z.array(z.string()),
    sku: z.string(),
    description: z.string(),
  }),
});

export const PostValidation = { postValidationSchema };
