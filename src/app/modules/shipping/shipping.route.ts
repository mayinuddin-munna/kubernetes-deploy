import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ShippingControllers } from './shipping.controller';
import { ShippingValidation } from './shipping.validation';

const router = express.Router();

router.post(
  '/',
  // validateRequest(ShippingValidation.ShippingSchema),
  ShippingControllers.createShipping,
);

router.get('/', ShippingControllers.getAllShipping);
router.get('/:id', ShippingControllers.getSingleShipping);

// router.patch('/:id', OrderControllers.updateOrder);
// router.delete('/:id', OrderControllers.deleteOrder);

export const ShippingRoutes = router;
