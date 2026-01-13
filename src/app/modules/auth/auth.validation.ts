import { z } from 'zod';

const createUserValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(), // Changed to string and optional
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        'Password must contain at least one lowercase, one uppercase, and one digit',
    }),
  profilePicture: z.string().url('Invalid URL').optional(), // Profile picture remains optional
  status: z.enum(['active', 'blocked'], {
    message: 'Status must be active or blocked',
  }),
  role: z.enum(['user', 'admin', 'super-admin'], {
    message: 'Role must be user, admin, or super-admin',
  }),
});

export const UserValidation = { createUserValidationSchema };
