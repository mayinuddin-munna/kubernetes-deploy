import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { WishlistValidation } from './wishlist.validation';
import { WishlistControllers } from './wishlist.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(WishlistValidation.WishlistSchema),
  WishlistControllers.createWishlist,
);

router.get('/', WishlistControllers.getAllWishlist);
router.get('/:id', WishlistControllers.getSingleWishlist);

router.delete('/:id', WishlistControllers.deleteSingleWishlist);

export const WishlistRoutes = router;
