import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ManufacturerStoreServices } from './manufacturer.service';

const createManufacturerStore = catchAsync(
  async (req: Request, res: Response) => {
    const createManufacturer = req.body;

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
      if (!createManufacturer[field]) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    const result =
      await ManufacturerStoreServices.createManufacturerStoreIntoDB(
        createManufacturer,
      );

    // Send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Manufacturer Store created successfully!',
      data: result,
    });
  },
);

const getAllManufacturerStore = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await ManufacturerStoreServices.getAllManufacturerStoreFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Manufacturer Store data retrieved successfully!',
      data: result,
    });
  },
);

const getSingleManufacturerStore = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await ManufacturerStoreServices.getSingleManufacturerStoreFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Manufacturer Store data retrieved successfully!',
      data: result,
    });
  },
);

const updateManufacturerStore = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const storeData = req.body;

    const result =
      await ManufacturerStoreServices.updateSingleManufacturerStoreFromDB(
        id,
        storeData,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Manufacturer Store data update successfully!',
      data: result,
    });
  },
);

export const ManufacturerStoreControllers = {
  createManufacturerStore,
  getAllManufacturerStore,
  getSingleManufacturerStore,
  updateManufacturerStore,
};
