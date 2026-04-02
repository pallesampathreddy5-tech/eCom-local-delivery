import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  loginHandler,
  logoutHandler,
  meHandler,
  refreshHandler,
  registerCustomerHandler,
  registerDeliveryAgentHandler,
  registerShopkeeperHandler
} from "./auth.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import {
  loginSchema,
  registerCustomerSchema,
  registerDeliveryAgentSchema,
  registerShopkeeperSchema
} from "./auth.validation.js";

const authRouter = Router();

authRouter.post("/register/customer", validate(registerCustomerSchema), registerCustomerHandler);
authRouter.post("/register/shopkeeper", validate(registerShopkeeperSchema), registerShopkeeperHandler);
authRouter.post("/register/delivery-agent", validate(registerDeliveryAgentSchema), registerDeliveryAgentHandler);
authRouter.post("/login", validate(loginSchema), loginHandler);
authRouter.post("/refresh", refreshHandler);
authRouter.post("/logout", logoutHandler);
authRouter.get("/me", requireAuth, meHandler);

export default authRouter;
