import { Model } from "mongoose";

export type TProductVariants = { type: string; value: string };

export type TInventory = { quantity: number; inStock: boolean };

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TProductVariants[];
  inventory: TInventory;
};

export interface ProductModel extends Model<TProduct> {
  isProductExists(productName: string): Promise<TProduct | null>;
}
