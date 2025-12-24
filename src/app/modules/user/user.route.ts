import express from 'express';
import { admin, protect } from '../../middlewares/authMiddleware';
import { UsersControllers } from './user.controller';
import { upload } from '../../middlewares/fileUploadMiddleware';

const router = express.Router();

router.post('/register', UsersControllers.registerUser);
router.post('/login', UsersControllers.loginUser);
router.post('/logout-user', protect, UsersControllers.logoutUser);

router.put(
  '/update',
  protect,
  upload.single('file'),
  /* admin, */ UsersControllers.updateProfile,
);
router.put('/update/password', protect, UsersControllers.updatePassword);

// this is working
router.put('/:id', protect, UsersControllers.updateUser);
router.delete('/:id', protect, /* admin, */ UsersControllers.deleteUser);

router.get('/', protect, admin, UsersControllers.getAllUsers);
router.get('/:id', protect, /* admin, */ UsersControllers.getSingleUser);

export const UsersRoutes = router;
