import mongoose from 'mongoose';
import { TUser } from './auth.interface';

const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
        },
        message:
          'Password must contain at least one lowercase, one uppercase, and one digit',
      },
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'super-admin'],
      required: true,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<TUser>('User', UserModel);
