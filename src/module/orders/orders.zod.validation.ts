import { z } from "zod";

const orderValidationSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),

  productId: z.string().min(1, { message: "Product ID is required" }),

  price: z.number().min(0, { message: "Price cannot be negative" }),

  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});

export default orderValidationSchema;
