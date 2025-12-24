import express from 'express';
import { ProductControllers } from './product.controller';
// import { ProductValidation } from './product.validation';
// import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  // validateRequest(ProductValidation.productValidationSchema),
  ProductControllers.createProduct,
);

router.put('/product/:productId', ProductControllers.updateProduct);
router.delete('/product/:productId', ProductControllers.deleteProduct);

router.get('/', ProductControllers.getAllProduct);
router.get('/:productId', ProductControllers.getSingleProduct);

export const ProductRoutes = router;
