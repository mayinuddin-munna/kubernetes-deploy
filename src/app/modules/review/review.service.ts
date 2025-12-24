import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (review: TReview) => {
  const result = await Review.create(review);
  return result;
};

const getAllReviewIntoDB = async () => {
  const result = await Review.find();
  return result;
};

const getSingleReviewIntoDB = async (id: string) => {
  const result = await Review.findById(id);
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewIntoDB,
  getSingleReviewIntoDB,
};
