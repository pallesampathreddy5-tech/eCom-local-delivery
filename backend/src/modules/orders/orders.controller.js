import { sendSuccess } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getCheckoutPreview, getMyOrders, placeOrder } from "./orders.service.js";

export const checkoutPreviewHandler = asyncHandler(async (req, res) => {
  const data = await getCheckoutPreview({ customerId: req.user.userId, paymentMethod: req.validated.body.paymentMethod });
  return sendSuccess(res, { message: "Checkout preview fetched", data });
});

export const placeOrderHandler = asyncHandler(async (req, res) => {
  const data = await placeOrder({ customerId: req.user.userId, ...req.validated.body });
  return sendSuccess(res, { statusCode: 201, message: "Order placed", data });
});

export const myOrdersHandler = asyncHandler(async (req, res) => {
  const orders = await getMyOrders(req.user.userId);
  return sendSuccess(res, { message: "Orders fetched", data: { orders } });
});
