import { z } from 'zod';

const ShippingAddressSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
});

const OrderItemSchema = z.object({
  product: z.string().min(1, 'Product ID is required'),
  seller: z.string(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

const OrdersValidationSchema = z.object({
  body: z.object({
    orderId: z.string().min(1, 'Order ID is required'),
    userId: z.string().min(1, 'User ID is required'),
    shippingAddress: ShippingAddressSchema,
    items: z.array(OrderItemSchema).nonempty('At least one item is required'),
    totalAmount: z
      .number()
      .min(0, 'Total amount must be greater than or equal to 0'),
    discountTotal: z
      .number()
      .min(0, 'Discount Total must be greater than or equal to 0'),
    paymentMethod: z.enum(
      ['cod', 'bkash', 'nagad', 'rocket', 'visa', 'mastercard'],
      {
        errorMap: () => ({ message: 'Invalid method method' }),
      },
    ),
    paymentStatus: z
      .enum(['pending', 'paid', 'failed'], {
        errorMap: () => ({ message: 'Invalid payment status' }),
      })
      .optional(),
    orderStatus: z
      .enum(['processing', 'shipped', 'delivered', 'cancelled'], {
        errorMap: () => ({ message: 'Invalid order status' }),
      })
      .optional(),
    isActive: z.boolean().optional(),
    // deliveryDate: z.date().optional(),
  }),
});

export const OrdersValidation = { OrdersValidationSchema };
