import { TPost } from './post.interface';
import { PostModel } from './post.model';

const createPostIntoDB = async (postData: TPost) => {
  const result = await PostModel.create(postData);
  return result;
};

const getAllPostsFromDB = async () => {
  const result = await PostModel.find().populate('products');
  return result;
};

const getSinglePostFromDB = async (_id: string) => {
  const result = await PostModel.findOne({ _id }).populate('products');
  return result;
};

const updatePostIntoDB = async (_id: string, updateData: TPost) => {
  const result = await PostModel.updateOne({ _id }, { $set: updateData });
  return result;
};

const deletePostIntoDB = async (_id: string) => {
  const result = await PostModel.deleteOne({ _id });
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  deletePostIntoDB,
};
