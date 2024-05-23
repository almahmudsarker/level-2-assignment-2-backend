import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: TProduct) => {
  if (await Product.isProductExists(payload.name)) {
    return null;
  }

  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (productName: string) => {
  if (productName) {
    const result = await Product.find({ $text: { $search: productName } });
    return result;
  }

  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

const updateSingleProductFromDB = async (payload: object, id: string) => {
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteProductFromDB,
};
