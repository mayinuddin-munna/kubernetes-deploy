/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

export interface IUserRequest extends Request {
  user?: any;
}

export interface TUser extends mongoose.Document {
  name?: string;
  email: string;
  role: 'user' | 'seller' | 'manufacturer';
  password: string;
  userCode: string;
  avatar?: string;
  isAdmin: boolean;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
  // eslint-disable-next-line @typescript-eslint/ban-types, no-unused-vars
  comparePassword(entirePassword: string): Promise<Boolean>;
}
