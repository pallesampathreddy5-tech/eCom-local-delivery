import { sendSuccess } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createProductByAdmin, createProductByShopkeeper, listShopProducts } from "./shopProducts.service.js";

export const createShopProductHandler = asyncHandler(async (req, res) => {
  const product = await createProductByShopkeeper({ shopUserId: req.user.userId, payload: req.validated.body });
  return sendSuccess(res, { statusCode: 201, message: "Product created", data: { product } });
});

export const listMyProductsHandler = asyncHandler(async (req, res) => {
  const products = await listShopProducts(req.user.userId);
  return sendSuccess(res, { message: "My products fetched", data: { products } });
});

export const createAdminProductHandler = asyncHandler(async (req, res) => {
  const { shopUserId, ...payload } = req.validated.body;
  const product = await createProductByAdmin({ adminRole: req.user.role, shopUserId, payload });
  return sendSuccess(res, { statusCode: 201, message: "Product created for shop", data: { product } });
});
