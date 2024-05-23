import { z } from "zod";

const productVariantValidationSchema = z.object({
  type: z.string().min(1, "Variant type is required"),
  value: z.string().min(1, "Variant value is required"),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, "Inventory quantity must be at least 0"),
  inStock: z
    .boolean()
    .refine((val) => val !== undefined, "In-stock status is required"),
});

const productValidationSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .refine((val) => val.trim().length > 0, "Name is required"),
  description: z
    .string()
    .refine((val) => val.trim().length > 0, "Description is required"),
  price: z.number().min(0.01, "Price must be at least 0.01"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).max(10, "Tags cannot exceed 10 entries"),
  variants: z
    .array(productVariantValidationSchema)
    .min(1, "Product must have at least one variant"),
  inventory: inventoryValidationSchema,
});

const partialProductValidationSchema = productValidationSchema.partial();

export const zodValidation = {
  productValidationSchema,
  partialProductValidationSchema,
};
