import { Router } from "express";
import { ROLES } from "../../constants/roles.js";
import { requireAuth, requireRoles } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { verifyPaymentHandler } from "./payments.controller.js";
import { verifyPaymentSchema } from "./payments.validation.js";

const paymentsRouter = Router();

paymentsRouter.use(requireAuth, requireRoles([ROLES.CUSTOMER]));
paymentsRouter.post("/verify", validate(verifyPaymentSchema), verifyPaymentHandler);

export default paymentsRouter;
