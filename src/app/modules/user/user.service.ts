/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import generateToken from './generateToken';
import { TUser } from './user.interface';
import Users from './user.model';
import config from '../../config';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import { SellerStore } from '../sellerStore/sellerStore.model';
import { ManufacturerStore } from '../manufacturer/manufacturer.model';

// const createUserIntoDB = async (users: TUser) => {
//   const { name, email, role, password, avatar } = users;

//   // Get current Month & Year
//   const currentDate = new Date();
//   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//   const year = currentDate.getFullYear();

//   // Define the prefix based on role
//   let prefix = '';
//   if (role === 'user') prefix = 'US';
//   else if (role === 'seller') prefix = 'SL';
//   else if (role === 'manufacturer') prefix = 'MF';

//   // Generate unique identifier
//   let userCode;
//   let isUnique = false;
//   while (!isUnique) {
//     const randomNum = Math.floor(1000 + Math.random() * 9000);
//     userCode = `${prefix}-${month}${year}-${randomNum}`;

//     const existingUser = await Users.findOne({ userCode });
//     if (!existingUser) isUnique = true;
//   }

//   const user = new Users({
//     name,
//     email,
//     role,
//     password,
//     avatar,
//     userCode,
//   });

//   await user.save();

//   return {
//     id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     avatar: user.avatar,
//     isAdmin: user.isAdmin,
//     userCode: user.userCode,
//     token: generateToken({ id: user._id, role: user.role }),
//   };
// };

const createUserIntoDB = async (users: TUser) => {
  const { name, email, role, password, avatar } = users;

  // Get current Month & Year
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();

  // Define the prefix based on role
  let prefix = '';
  if (role === 'user') prefix = 'US';
  else if (role === 'seller') prefix = 'SL';
  else if (role === 'manufacturer') prefix = 'MF';

  // Generate unique identifier
  let userCode;
  let isUnique = false;
  while (!isUnique) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    userCode = `${prefix}-${month}${year}-${randomNum}`;

    const existingUser = await Users.findOne({ userCode });
    if (!existingUser) isUnique = true;
  }

  const user = new Users({
    name,
    email,
    role,
    password,
    avatar,
    userCode,
  });

  await user.save();

  // Automatically create SellerStore or ManufacturerStore
  if (role === 'seller' || role === 'manufacturer') {
    const phone = `+880${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const storePrefix = role === 'seller' ? 'SL' : 'MF';
    const storeCode = `${storePrefix}-STORE-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    if (role === 'seller') {
      await SellerStore.create({
        user: user._id,
        storeName: `${name}'s Store ${storeCode}`,
        storeEmail: email,
        storePhoneNumber: `${phone}`,
        whatsappNumber: `${phone}`,
        storeAddress: 'N/A',
        storeCode,
        storeOwnerType: role,
        storeStatus: 'active',
      });
    }

    // If you have ManufacturerStore model, use that instead:
    if (role === 'manufacturer') {
      await ManufacturerStore.create({
        user: user._id,
        storeName: `${name}'s Store ${storeCode}`,
        storeEmail: email,
        storePhoneNumber: `${phone}`,
        whatsappNumber: `${phone}`,
        storeAddress: 'N/A',
        storeCode,
        storeOwnerType: role,
        storeStatus: 'active',
      });
    }
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
    userCode: user.userCode,
    token: generateToken({ id: user._id, role: user.role }),
  };
};

const loginUserIntoDB = async (users: TUser) => {
  const { email, password } = users;

  // Find user by email
  const user = await Users.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
  }

  // Validate password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Email or password incorrect');
  }

  // Return user details
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
    userCode: user.userCode,
    token: generateToken({ id: user._id, role: user.role }),
  };
};

const logoutUserIntoDB = async (res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: config.node_env === 'development',
    sameSite: 'strict',
    expires: new Date(0),
  });
};

const getAllUsersFromDB = async (userQuery: string) => {
  const pageSize = 4;
  const query = userQuery;
  const page = Number(query) || 1;
  const count = await Users.countDocuments();
  const users = await Users.find({})
    .select('-password')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  return {
    users,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  };
};

const getSingleUserFromDB = async (_id: string) => {
  const result = await Users.findById(_id).select('-password');

  if (!result) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User in not found!');
  }

  return result;
};

const updateProfileFromDB = async (_id: string, userInfo: any) => {
  const user = await Users.findById(_id).select('-password');

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is not found!');
  }

  const { name, email, avatar } = userInfo;
  // console.log({
  //   name,
  //   email,
  //   avatar,
  // });

  await Users.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      avatar,
    },
    { new: true },
  ).select('-password');

  return {
    id: user?._id,
    name: user?.name,
    email: user?.email,
    avatar: user?.avatar,
    isAdmin: user?.isAdmin,
    token: generateToken(user?._id),
  };
};

const updatePasswordFromDB = async (
  _id: string,
  userInfo: { oldPassword: string; newPassword: string },
) => {
  const { oldPassword, newPassword } = userInfo;

  const user = await Users.findById(_id);

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found!');
  }

  if (!(await user.comparePassword(oldPassword))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);

  await Users.findByIdAndUpdate(_id, { password: hash }, { new: true });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  };
};

const updateUserFromDB = async (
  _id: string,
  userInfo: { name?: string; email?: string; avatar?: string },
) => {
  const user = await Users.findById(_id).select('-password');

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found!');
  }

  const { name, email, avatar } = userInfo;

  const updatedUser = await Users.findByIdAndUpdate(
    _id,
    {
      name: name || user.name,
      email: email || user.email,
      avatar: avatar || user.avatar,
    },
    { new: true, select: '-password' },
  );

  return updatedUser;
};

const deleteSingleUserFromDB = async (_id: string) => {
  const result = await Users.findById(_id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User in not found!');
  }

  await Users.findByIdAndDelete(_id);

  return result;
};

export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
  logoutUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateProfileFromDB,
  updatePasswordFromDB,
  updateUserFromDB,
  deleteSingleUserFromDB,
};
