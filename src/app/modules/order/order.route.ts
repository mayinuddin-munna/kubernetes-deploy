import express from 'express';
import { OrderControllers } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrdersValidation } from './order.validation';

const router = express.Router();

router.post(
  '/',
  // validateRequest(OrdersValidation.OrdersValidationSchema),
  OrderControllers.createOrder,
);

router.get('/', OrderControllers.getAllOrders);
router.get('/:id', OrderControllers.getSingleOrder);

router.patch('/:id', OrderControllers.updateOrder);
router.delete('/:id', OrderControllers.deleteOrder);

export const OrderRoutes = router;
