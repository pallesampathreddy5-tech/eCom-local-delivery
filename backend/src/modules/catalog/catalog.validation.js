import { z } from "zod";

export const listProductsSchema = z.object({
  query: z.object({
    categoryId: z.string().optional(),
    search: z.string().optional(),
    shopUserId: z.string().optional()
  })
});

export const productByIdSchema = z.object({
  params: z.object({
    productId: z.string().min(1, "Product ID is required")
  })
});
