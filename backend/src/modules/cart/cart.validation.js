import { z } from "zod";

export const addCartItemSchema = z.object({
  body: z.object({
    productId: z.string().min(1, "Product ID is required"),
    quantity: z.number().int().min(1, "Quantity must be at least 1")
  })
});

export const updateCartItemSchema = z.object({
  params: z.object({
    productId: z.string().min(1, "Product ID is required")
  }),
  body: z.object({
    quantity: z.number().int().min(1, "Quantity must be at least 1")
  })
});

export const removeCartItemSchema = z.object({
  params: z.object({
    productId: z.string().min(1, "Product ID is required")
  })
});
