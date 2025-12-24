import { TSellerStore } from './sellerStore.interface';
import { SellerStore } from './sellerStore.model';

const createSellerStoreIntoDB = async (sellerStore: TSellerStore) => {
  const result = await SellerStore.create(sellerStore);
  return result;
};

const getAllSellerStoreFromDB = async (searchTerm?: string) => {
  // eslint-disable-next-line no-console
  console.log(searchTerm);

  const result = await SellerStore.find();

  return result;
};

const getSingleStoreFromDB = async (_id: string) => {
  const result = await SellerStore.findOne({ _id }).populate({
    path: 'user',
    select: '-password',
  });

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSingleStoreFromDB = async (_id: string, storeData: any) => {
  const result = await SellerStore.findOneAndUpdate({ _id }, storeData, {
    new: true,
  });

  return result;
};

export const SellerStoreServices = {
  createSellerStoreIntoDB,
  getAllSellerStoreFromDB,
  getSingleStoreFromDB,
  updateSingleStoreFromDB,
};
