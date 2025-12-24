import { TManufacturerStore } from './manufacturer.interface';
import { ManufacturerStore } from './manufacturer.model';

const createManufacturerStoreIntoDB = async (
  manufacturerStore: TManufacturerStore,
) => {
  const result = await ManufacturerStore.create(manufacturerStore);
  return result;
};

const getAllManufacturerStoreFromDB = async (searchTerm?: string) => {
  // eslint-disable-next-line no-console
  console.log(searchTerm);

  const result = await ManufacturerStore.find();

  return result;
};

const getSingleManufacturerStoreFromDB = async (_id: string) => {
  const result = await ManufacturerStore.findOne({ _id }).populate({
    path: 'user',
    select: '-password',
  });

  return result;
};

const updateSingleManufacturerStoreFromDB = async (
  _id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storeData: any,
) => {
  const result = await ManufacturerStore.findOneAndUpdate({ _id }, storeData, {
    new: true,
  });

  return result;
};

export const ManufacturerStoreServices = {
  createManufacturerStoreIntoDB,
  getAllManufacturerStoreFromDB,
  getSingleManufacturerStoreFromDB,
  updateSingleManufacturerStoreFromDB,
};
