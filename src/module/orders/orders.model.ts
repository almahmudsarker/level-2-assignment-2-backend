import { Schema, model } from "mongoose";
import { TOrder } from "./orders.interface";

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    productId: {
      type: String,
      required: [true, "Product ID is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
  },
  { versionKey: false }
);

export const Order = model<TOrder>("Order", orderSchema);
