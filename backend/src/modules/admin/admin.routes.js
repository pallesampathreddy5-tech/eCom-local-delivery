import { Router } from "express";
import { ROLES } from "../../constants/roles.js";
import { requireAuth, requireRoles } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  auditLogsHandler,
  allShopsHandler,
  createAdminUserHandler,
  pendingDeliveryAgentsHandler,
  pendingShopsHandler,
  updateDeliveryApprovalHandler,
  updateShopApprovalHandler
} from "./admin.controller.js";
import { createAdminUserSchema, updateDeliveryApprovalSchema, updateShopApprovalSchema } from "./admin.validation.js";

const adminRouter = Router();

adminRouter.use(requireAuth, requireRoles([ROLES.ADMIN, ROLES.SUPER_ADMIN]));

adminRouter.get("/shops", allShopsHandler);
adminRouter.get("/shops/pending", pendingShopsHandler);
adminRouter.patch("/shops/:shopUserId/approval", validate(updateShopApprovalSchema), updateShopApprovalHandler);
adminRouter.get("/delivery-agents/pending", pendingDeliveryAgentsHandler);
adminRouter.patch("/delivery-agents/:agentUserId/approval", validate(updateDeliveryApprovalSchema), updateDeliveryApprovalHandler);
adminRouter.post("/users/admin", requireRoles([ROLES.SUPER_ADMIN]), validate(createAdminUserSchema), createAdminUserHandler);
adminRouter.get("/audit-logs", requireRoles([ROLES.SUPER_ADMIN]), auditLogsHandler);

export default adminRouter;
