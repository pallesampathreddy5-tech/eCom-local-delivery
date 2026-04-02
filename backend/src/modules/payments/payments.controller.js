import { sendSuccess } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { markOrderPayment } from "../orders/orders.service.js";

export const verifyPaymentHandler = asyncHandler(async (req, res) => {
  const order = await markOrderPayment({ customerId: req.user.userId, ...req.validated.body });

  return sendSuccess(res, {
    message: "Payment verification processed",
    data: { order }
  });
});
