import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  let result;
  if (searchTerm) {
    result = await ProductModel.find({ name: new RegExp(searchTerm, 'i') });
  } else {
    result = await ProductModel.find();
  }
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id }).populate('seller');
  return result;
};

const updateProductIntoDB = async (_id: string, updateData: TProduct) => {
  const result = await ProductModel.updateOne({ _id }, { $set: updateData });
  return result;
};

const deleteProductIntoDB = async (_id: string) => {
  const result = await ProductModel.deleteOne({ _id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
