import { Router } from "express";
import { ROLES } from "../../constants/roles.js";
import { requireAuth, requireRoles } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { allShopsHandler, createAdminUserHandler, pendingShopsHandler, updateShopApprovalHandler } from "./admin.controller.js";
import { createAdminUserSchema, updateShopApprovalSchema } from "./admin.validation.js";

const adminRouter = Router();

adminRouter.use(requireAuth, requireRoles([ROLES.ADMIN, ROLES.SUPER_ADMIN]));

adminRouter.get("/shops", allShopsHandler);
adminRouter.get("/shops/pending", pendingShopsHandler);
adminRouter.patch("/shops/:shopUserId/approval", validate(updateShopApprovalSchema), updateShopApprovalHandler);
adminRouter.post("/users/admin", requireRoles([ROLES.SUPER_ADMIN]), validate(createAdminUserSchema), createAdminUserHandler);

export default adminRouter;
