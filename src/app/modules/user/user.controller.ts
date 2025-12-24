import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const result = await UserServices.loginUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  await UserServices.logoutUserIntoDB(res);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged out successfully!',
    data: null,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { userQuery } = req.params;
  //   const pageSize = 4;
  //   const page = Number(req.query.pageNumber) || 1;
  //   const count = await Users.countDocuments();
  //   const users = await Users.find({})
  //     .select('-password')
  //     .limit(pageSize)
  //     .skip(pageSize * (page - 1));
  //   res.status(201).json({
  //     users,
  //     page,
  //     pages: Math.ceil(count / pageSize),
  //     count,
  //   });

  const result = await UserServices.getAllUsersFromDB(userQuery);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single user retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user;

  console.log(req?.file, req?.files);

  // const result = await UserServices.updateProfileFromDB(_id, {
  //   ...req.body,
  //   avatar: config.base_url + '/public/upload/' + req?.file?.filename,
  // });

  const result = { data: 'ok' };
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Profile update successfully',
    data: result,
  });
});

const updatePassword = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;

  const result = await UserServices.updatePasswordFromDB(id, {
    oldPassword,
    newPassword,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully!',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userInfo = req.body;

  const result = await UserServices.updateUserFromDB(id, userInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.deleteSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Delete successfully',
    data: result,
  });
});

export const UsersControllers = {
  registerUser,
  loginUser,
  updateProfile,
  updatePassword,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  logoutUser,
};
