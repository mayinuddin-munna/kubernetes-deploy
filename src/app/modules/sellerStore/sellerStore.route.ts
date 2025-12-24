import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SellerStoreControllers } from './sellerStore.controller';
import { sellerStoreValidation } from './sellerStore.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(sellerStoreValidation.sellerStoreValidationSchema),
  SellerStoreControllers.createSellerStore,
);

router.get('/', SellerStoreControllers.getAllSellerStore);

router.get('/:id', SellerStoreControllers.getSingleSellerStore);
router.patch('/:id', SellerStoreControllers.updateSellerStore);

export const SellerStoreRoutes = router;
