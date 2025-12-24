import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { ShippingServices } from './shipping.service';

const createShipping = catchAsync(async (req: Request, res: Response) => {
  const shipping = req.body;
  const result = await ShippingServices.createShippingIntoDB(shipping);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Shipping item Create successfully!',
    data: result,
  });
});

const getAllShipping = catchAsync(async (req: Request, res: Response) => {
  const result = await ShippingServices.getAllShippingIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shipping is retrieve successfully!',
    data: result,
  });
});

const getSingleShipping = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ShippingServices.getSingleShippingIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Shipping is retrieve successfully!',
    data: result,
  });
});

export const ShippingControllers = {
  createShipping,
  getAllShipping,
  getSingleShipping,
};
