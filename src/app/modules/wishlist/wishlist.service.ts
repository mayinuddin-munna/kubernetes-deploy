import { Wishlist } from './wishlist.interface';
import { Wishlists } from './wishlist.model';

const createWishlistIntoDB = async (wishlist: Wishlist) => {
  const result = await Wishlists.create(wishlist);
  return result;
};

const getAllWishlistIntoDB = async () => {
  const result = await Wishlists.find()
    .populate('user')
    .populate('sellerStore')
    .populate('products');
  return result;
};

const getSingleWishlistIntoDB = async (id: string) => {
  const result = await Wishlists.findById(id)
    .populate('user')
    .populate('sellerStore')
    .populate('products');
  return result;
};

const deleteSingleWishlistIntoDB = async (_id: string) => {
  const wishlistItem = await Wishlists.findById(_id);

  if (!wishlistItem) {
    return { success: false, message: 'Wishlist item not found!' };
  }

  const result = await Wishlists.deleteOne({ _id });
  return result;
};

export const WishlistServices = {
  createWishlistIntoDB,
  getAllWishlistIntoDB,
  getSingleWishlistIntoDB,
  deleteSingleWishlistIntoDB,
};
