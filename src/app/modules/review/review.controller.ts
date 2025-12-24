import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = req.body;
  const result = await ReviewServices.createReviewIntoDB(review);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review item Create successfully!',
    data: result,
  });
});

const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getAllReviewIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review is retrieve successfully!',
    data: result,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ReviewServices.getSingleReviewIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Review is retrieve successfully!',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReview,
  getSingleReview,
};
