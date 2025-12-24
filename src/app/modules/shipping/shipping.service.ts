import { Shipping } from './shipping.interface';
import { ShippingModel } from './shipping.model';

const createShippingIntoDB = async (shipping: Shipping) => {
  const result = await ShippingModel.create(shipping);
  return result;
};

const getAllShippingIntoDB = async () => {
  const result = await ShippingModel.find();
  return result;
};

const getSingleShippingIntoDB = async (id: string) => {
  const result = await ShippingModel.findById(id);
  return result;
};

export const ShippingServices = {
  createShippingIntoDB,
  getAllShippingIntoDB,
  getSingleShippingIntoDB,
};
