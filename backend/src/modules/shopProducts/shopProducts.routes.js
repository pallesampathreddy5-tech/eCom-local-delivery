import { Router } from "express";
import { ROLES } from "../../constants/roles.js";
import { requireAuth, requireRoles } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createAdminProductHandler, createShopProductHandler, listMyProductsHandler } from "./shopProducts.controller.js";
import { createAdminProductSchema, createShopProductSchema } from "./shopProducts.validation.js";

const shopProductsRouter = Router();

shopProductsRouter.post(
  "/shop/products",
  requireAuth,
  requireRoles([ROLES.SHOPKEEPER]),
  validate(createShopProductSchema),
  createShopProductHandler
);

shopProductsRouter.get(
  "/shop/products",
  requireAuth,
  requireRoles([ROLES.SHOPKEEPER]),
  listMyProductsHandler
);

shopProductsRouter.post(
  "/admin/products",
  requireAuth,
  requireRoles([ROLES.ADMIN, ROLES.SUPER_ADMIN]),
  validate(createAdminProductSchema),
  createAdminProductHandler
);

export default shopProductsRouter;
