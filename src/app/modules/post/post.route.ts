import express from 'express';
import { PostControllers } from './post.controller';
import { PostValidation } from './post.validation';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../middlewares/fileUploadMiddleware';

const router = express.Router();

router.post(
  '/', // validateRequest(PostValidation.postValidationSchema),
  upload.single('bannerURL'),
  PostControllers.createPost,
);

router.put('/:id', PostControllers.updatePost);
router.delete('/:id', PostControllers.deletePost);

router.get('/:id', PostControllers.getSinglePost);
router.get('/', PostControllers.getAllPosts);

export const PostRoutes = router;
