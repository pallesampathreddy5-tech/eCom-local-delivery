import { Router } from "express";
import { ROLES } from "../../constants/roles.js";
import { requireAuth, requireRoles } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { addItemHandler, getMyCartHandler, removeItemHandler, updateItemHandler } from "./cart.controller.js";
import { addCartItemSchema, removeCartItemSchema, updateCartItemSchema } from "./cart.validation.js";

const cartRouter = Router();

cartRouter.use(requireAuth, requireRoles([ROLES.CUSTOMER]));

cartRouter.get("/", getMyCartHandler);
cartRouter.post("/items", validate(addCartItemSchema), addItemHandler);
cartRouter.patch("/items/:productId", validate(updateCartItemSchema), updateItemHandler);
cartRouter.delete("/items/:productId", validate(removeCartItemSchema), removeItemHandler);

export default cartRouter;
