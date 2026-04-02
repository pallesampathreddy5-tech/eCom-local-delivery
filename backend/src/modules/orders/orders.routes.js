import { Router } from "express";
import { ROLES } from "../../constants/roles.js";
import { requireAuth, requireRoles } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { checkoutPreviewHandler, myOrdersHandler, placeOrderHandler } from "./orders.controller.js";
import { checkoutPreviewSchema, placeOrderSchema } from "./orders.validation.js";

const ordersRouter = Router();

ordersRouter.use(requireAuth, requireRoles([ROLES.CUSTOMER]));

ordersRouter.post("/checkout/preview", validate(checkoutPreviewSchema), checkoutPreviewHandler);
ordersRouter.post("/checkout/place-order", validate(placeOrderSchema), placeOrderHandler);
ordersRouter.get("/my", myOrdersHandler);

export default ordersRouter;
