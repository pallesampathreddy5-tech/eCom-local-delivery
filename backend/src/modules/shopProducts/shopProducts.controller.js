import { sendSuccess } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createAuditLog } from "../../utils/auditLog.js";
import { createProductByAdmin, createProductByShopkeeper, listShopProducts } from "./shopProducts.service.js";

export const createShopProductHandler = asyncHandler(async (req, res) => {
  const product = await createProductByShopkeeper({ shopUserId: req.user.userId, payload: req.validated.body });
  await createAuditLog({
    req,
    action: "SHOPKEEPER_PRODUCT_CREATED",
    targetType: "Product",
    targetId: product._id,
    metadata: { shopUserId: req.user.userId, name: product.name }
  });
  return sendSuccess(res, { statusCode: 201, message: "Product created", data: { product } });
});

export const listMyProductsHandler = asyncHandler(async (req, res) => {
  const products = await listShopProducts(req.user.userId);
  return sendSuccess(res, { message: "My products fetched", data: { products } });
});

export const createAdminProductHandler = asyncHandler(async (req, res) => {
  const { shopUserId, ...payload } = req.validated.body;
  const product = await createProductByAdmin({ adminRole: req.user.role, shopUserId, payload });
  await createAuditLog({
    req,
    action: "ADMIN_PRODUCT_CREATED",
    targetType: "Product",
    targetId: product._id,
    metadata: { shopUserId, name: product.name }
  });
  return sendSuccess(res, { statusCode: 201, message: "Product created for shop", data: { product } });
});
