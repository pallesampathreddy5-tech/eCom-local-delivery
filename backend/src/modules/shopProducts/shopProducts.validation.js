import { z } from "zod";

export const createShopProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Product name is required"),
    categoryId: z.string().min(2, "Category is required"),
    description: z.string().optional(),
    image: z.string().url().optional(),
    price: z.number().min(0, "Price must be >= 0"),
    stock: z.number().int().min(0, "Stock must be >= 0")
  })
});

export const createAdminProductSchema = z.object({
  body: z.object({
    shopUserId: z.string().min(1, "Shop user id is required"),
    name: z.string().min(2, "Product name is required"),
    categoryId: z.string().min(2, "Category is required"),
    description: z.string().optional(),
    image: z.string().url().optional(),
    price: z.number().min(0, "Price must be >= 0"),
    stock: z.number().int().min(0, "Stock must be >= 0")
  })
});
