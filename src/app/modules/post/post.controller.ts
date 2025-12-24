import httpStatus from 'http-status';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { PostServices } from './post.service';
import { v2 as cloudinary } from 'cloudinary';
import { TPost } from './post.interface';

interface MulterFile {
  path: string;
  mimetype: string;
  originalname: string;
}

const createPost = catchAsync(async (req: Request, res: Response) => {
  // Ensure file exists
  if (!req.file) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'No file uploaded',
      data: '',
    });
  }

  const file = req.file as MulterFile;

  const result = await cloudinary.uploader.upload(file.path, {
    folder: 'uploads',
    resource_type: 'auto',
  });

  const {
    postTitle,
    natureOfDiscount,
    natureOfDiscountType,
    discountNatureDetails,
    promoVideoURL,
    products,
    fbDiscountDetails,
    storeCode,
  } = req.body;

  // Prepare post data
  const postData: TPost = {
    postTitle,
    natureOfDiscount,
    natureOfDiscountType,
    discountNatureDetails,
    bannerURL: result.secure_url,
    promoVideoURL,
    products,
    fbDiscountDetails,
    storeCode,
  };

  const newPost = await PostServices.createPostIntoDB(postData);

  // Respond with success
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Post created successfully',
    data: newPost,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await PostServices.getAllPostsFromDB();

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All posts retrieve successfully!',
    data: result,
  });
});

const getSinglePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PostServices.getSinglePostFromDB(id);

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Create successfully!',
    data: result,
  });
});

const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const updateData = req.body;
    const result = await PostServices.updatePostIntoDB(postId, updateData);

    res.status(200).json({
      success: true,
      message: 'Post is update successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const result = await PostServices.deletePostIntoDB(postId);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'fail',
        error: "Couldn't delete the post",
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post is delete successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

export const PostControllers = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
