import { z } from "zod";

export const verifyPaymentSchema = z.object({
  body: z.object({
    orderId: z.string().min(1, "Order ID is required"),
    success: z.boolean()
  })
});
