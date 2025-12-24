import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { WishlistValidation } from '../wishlist/wishlist.validation';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post(
  '/create-review',
  validateRequest(WishlistValidation.WishlistSchema),
  ReviewControllers.createReview,
);

router.get('/', ReviewControllers.getAllReview);
router.get('/:id', ReviewControllers.getSingleReview);

// router.patch('/:id', ReviewControllers.updateOrder);
// router.delete('/:id', ReviewControllers.deleteOrder);

export const ReviewRoutes = router;
