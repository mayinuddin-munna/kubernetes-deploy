import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = req.body;
  const result = await OrderServices.createOrderIntoDB(order);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Create successfully!',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query as { email?: string };
  const result = await OrderServices.getAllOrdersFromDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders is retrieve successfully!',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderServices.getSingleOrderFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieve successfully!',
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await OrderServices.updateOrderFromDB(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is update successfully!',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await OrderServices.deleteOrderIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is delete successfully!',
    data: null,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
