import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { WishlistServices } from './wishlist.service';

const createWishlist = catchAsync(async (req: Request, res: Response) => {
  const cart = req.body;
  const result = await WishlistServices.createWishlistIntoDB(cart);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Wishlist item Create successfully!',
    data: result,
  });
});

const getAllWishlist = catchAsync(async (req: Request, res: Response) => {
  const result = await WishlistServices.getAllWishlistIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist is retrieve successfully!',
    data: result,
  });
});

const getSingleWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await WishlistServices.getSingleWishlistIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Wishlist is retrieve successfully!',
    data: result,
  });
});

const deleteSingleWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await WishlistServices.deleteSingleWishlistIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Wishlist is deleted successfully!',
    data: result,
  });
});

export const WishlistControllers = {
  createWishlist,
  getAllWishlist,
  getSingleWishlist,
  deleteSingleWishlist
};
