import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManufacturerStoreControllers } from './manufacturer.controller';
import { manufacturerStoreValidation } from './manufacturer.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(
    manufacturerStoreValidation.manufacturerStoreValidationSchema,
  ),
  ManufacturerStoreControllers.createManufacturerStore,
);

router.get('/', ManufacturerStoreControllers.getAllManufacturerStore);

router.get('/:id', ManufacturerStoreControllers.getSingleManufacturerStore);
router.patch('/:id', ManufacturerStoreControllers.updateManufacturerStore);

export const ManufacturerStoreRoutes = router;
