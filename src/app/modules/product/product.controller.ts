import httpStatus from 'http-status';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;
  console.log(req.file);

  const result = await ProductServices.createProductIntoDB(productData);

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Create successfully!',
    data: result,
  });
});

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const { product: productData } = req.body;

  const result = await ProductServices.getAllProductsFromDB(productData);

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All products retrieve successfully!',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const result = await ProductServices.getSingleProductFromDB(productId);

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Create successfully!',
    data: result,
  });
});

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await ProductServices.updateProductIntoDB(
      productId,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'Product is update successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductIntoDB(productId);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'fail',
        error: "Couldn't delete the product",
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product is delete successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
