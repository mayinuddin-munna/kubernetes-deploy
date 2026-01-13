import express from 'express';
import { UserControllers } from './auth.controller';
import { protect } from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './auth.validation';
import { s3, s3UploadMiddleware } from '../../middlewares/s3UploadMiddleware';

const router = express.Router();

router.post(
  '/create-user',
  ...s3UploadMiddleware(s3, 'profilePicture', 1),
  // validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);

router.post('/login-user', UserControllers.loginUser);

router.post('/logout-user', protect, UserControllers.logoutUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);

export const UserRoutes = router;
