import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './auth.service';
import generateToken from '../../utils/generateToken';

const createUser = catchAsync(async (req: Request, res: Response) => {
  let userData: any;

  if (typeof req.body.user === 'string') {
    userData = JSON.parse(req.body.user);
  } else {
    userData = req.body;
  }

  if (req.fileUrls && req.fileUrls.length > 0) {
    userData.profilePicture = req.fileUrls[0];
  }

  const result = await UserServices.createUserIntoDB(res, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const user = await UserServices.loginUserIntoDB(userData);

  // generate cookie + token
  const token = generateToken(res, user._id.toString());

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in successfully',
    data: {
      user,
      token,
    },
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged out successfully!',
    data: null,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { UserId } = req.params;

  const result = await UserServices.getSingleUserFromDB(UserId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getSingleUser,
};
