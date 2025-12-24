import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SellerStoreServices } from './sellerStore.service';

const createSellerStore = catchAsync(async (req: Request, res: Response) => {
  const createSeller = req.body;

  // Validate required fields
  const requiredFields = [
    'storeName',
    'storeEmail',
    'storePhoneNumber',
    'whatsappNumber',
    'storeAddress',
    'storeOwnerId',
    'storeOwnerType',
  ];

  for (const field of requiredFields) {
    if (!createSeller[field]) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: `${field} is required`,
      });
    }
  }

  const result =
    await SellerStoreServices.createSellerStoreIntoDB(createSeller);

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller Store created successfully!',
    data: result,
  });
});

const getAllSellerStore = catchAsync(async (req: Request, res: Response) => {
  const result = await SellerStoreServices.getAllSellerStoreFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller Store data retrieved successfully!',
    data: result,
  });
});

const getSingleSellerStore = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SellerStoreServices.getSingleStoreFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller Store data retrieved successfully!',
    data: result,
  });
});

const updateSellerStore = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const storeData = req.body;
  
  const result = await SellerStoreServices.updateSingleStoreFromDB(
    id,
    storeData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller Store data update successfully!',
    data: result,
  });
});

export const SellerStoreControllers = {
  createSellerStore,
  getAllSellerStore,
  getSingleSellerStore,
  updateSellerStore,
};
