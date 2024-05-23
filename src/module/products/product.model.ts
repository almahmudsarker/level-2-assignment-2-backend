import { Schema, model } from "mongoose";
import {
  ProductModel,
  TInventory,
  TProduct,
  TProductVariants,
} from "./product.interface";

const productVariantSchema = new Schema<TProductVariants>({
  type: {
    type: String,
    required: [true, "Variant type should be required"],
  },
  value: {
    type: String,
    required: [true, "Variant value should be required"],
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, "Inventory quantity should be required"],
    min: 0,
  },
  inStock: {
    type: Boolean,
    required: [true, "In-stock status should be required"],
  },
});

const productSchema = new Schema<TProduct, ProductModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
  },
  description: {
    type: String,
    required: [true, "Description should be required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price should be required"],
    min: 0.01,
  },
  category: {
    type: String,
    required: [true, "Category should be required"],
  },
  tags: {
    type: [String],
    required: [true, "Tag should be required"],
    validate: {
      validator: (tags: string[]) => tags.length <= 10,
      message: "Tags cannot exceed 10 entries",
    },
  },
  variants: {
    type: [productVariantSchema],
    required: [true, "Product must have at least one variant"],
    validate: (v: TProductVariants[]) => Array.isArray(v) && v.length > 0,
  },
  inventory: {
    type: inventorySchema,
    required: [true, "Inventory information should be required"],
  },
});

productSchema.statics.isProductExists = async function (productName: string) {
  const existingProduct = await Product.findOne({ name: productName });
  return existingProduct;
};

productSchema.index({ name: "text", description: "text", category: "text" });

export const Product = model<TProduct, ProductModel>("Product", productSchema);
