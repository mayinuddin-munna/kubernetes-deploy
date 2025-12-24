import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Orders } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (orders: Orders) => {
  const result = await OrderModel.create(orders);

  return result;
};

// const getAllOrdersFromDB = async (email?: string) => {
//   let result;
//   if (email) {
//     result = await OrderModel.find({ email })
//       .populate({
//         path: 'items.product',
//         model: 'Product',
//       })
//       .exec();
//   } else {
//     result = await OrderModel.find()
//       .populate({
//         path: 'items.product',
//         model: 'Product',
//       })
//       .exec();
//   }
//   return result;
// };

const getAllOrdersFromDB = async (email?: string) => {
  let result;
  if (email) {
    result = await OrderModel.find({ "shippingAddress.email": email })
      .populate({
        path: "items.product",
        model: "Product",
      })
      .exec();
  } else {
    result = await OrderModel.find()
      .populate({
        path: "items.product",
        model: "Product",
      })
      .exec();
  }
  return result;
};


const getSingleOrderFromDB = async (id: string) => {
  const result = await OrderModel.findById(id).populate({
    path: 'items.product',
    model: 'Product',
  })
  .exec();;

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateOrderFromDB = async (id: string, updateData: any) => {
  const result = await OrderModel.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });

  return result;
};

const deleteOrderIntoDB = async (id: string) => {
  const result = await OrderModel.deleteOne({ id });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found!');
  }

  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderFromDB,
  deleteOrderIntoDB,
};
