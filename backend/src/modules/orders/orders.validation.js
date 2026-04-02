import { z } from "zod";
import { PAYMENT_METHOD } from "../../constants/order.js";

const paymentMethodSchema = z.enum([PAYMENT_METHOD.UPI, PAYMENT_METHOD.CARD, PAYMENT_METHOD.COD]);

export const checkoutPreviewSchema = z.object({
  body: z.object({
    paymentMethod: paymentMethodSchema.optional()
  })
});

export const placeOrderSchema = z.object({
  body: z.object({
    paymentMethod: paymentMethodSchema,
    shippingAddress: z.string().min(5, "Shipping address is required")
  })
});
