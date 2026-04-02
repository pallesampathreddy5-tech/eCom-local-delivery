import { sendSuccess } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addItemToCart, getMyCart, removeCartItem, updateItemQuantity } from "./cart.service.js";

export const getMyCartHandler = asyncHandler(async (req, res) => {
  const data = await getMyCart(req.user.userId);
  return sendSuccess(res, { message: "Cart fetched", data });
});

export const addItemHandler = asyncHandler(async (req, res) => {
  const data = await addItemToCart({ customerId: req.user.userId, ...req.validated.body });
  return sendSuccess(res, { message: "Item added to cart", data });
});

export const updateItemHandler = asyncHandler(async (req, res) => {
  const data = await updateItemQuantity({
    customerId: req.user.userId,
    productId: req.validated.params.productId,
    quantity: req.validated.body.quantity
  });

  return sendSuccess(res, { message: "Cart item updated", data });
});

export const removeItemHandler = asyncHandler(async (req, res) => {
  const data = await removeCartItem({
    customerId: req.user.userId,
    productId: req.validated.params.productId
  });

  return sendSuccess(res, { message: "Cart item removed", data });
});
