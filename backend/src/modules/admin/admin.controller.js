import { sendSuccess } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createAuditLog } from "../../utils/auditLog.js";
import {
  allShopsForAdmin,
  createAdminBySuperAdmin,
  listAuditLogs,
  pendingDeliveryAgentsForApproval,
  pendingShopsForApproval,
  updateDeliveryApproval,
  updateShopApproval
} from "./admin.service.js";

export const pendingShopsHandler = asyncHandler(async (req, res) => {
  const shops = await pendingShopsForApproval();
  return sendSuccess(res, { message: "Pending shops fetched", data: { shops } });
});

export const allShopsHandler = asyncHandler(async (req, res) => {
  const shops = await allShopsForAdmin();
  return sendSuccess(res, { message: "All shops fetched", data: { shops } });
});

export const updateShopApprovalHandler = asyncHandler(async (req, res) => {
  const { shopUserId } = req.validated.params;
  const { status } = req.validated.body;
  const shop = await updateShopApproval({ shopUserId, status });
  await createAuditLog({
    req,
    action: "SHOP_APPROVAL_UPDATED",
    targetType: "ShopProfile",
    targetId: shopUserId,
    metadata: { status }
  });

  return sendSuccess(res, { message: `Shop ${status.toLowerCase()}`, data: { shop } });
});

export const createAdminUserHandler = asyncHandler(async (req, res) => {
  const adminUser = await createAdminBySuperAdmin(req.validated.body);
  await createAuditLog({
    req,
    action: "ADMIN_USER_CREATED",
    targetType: "User",
    targetId: adminUser._id,
    metadata: { createdRole: adminUser.role, email: adminUser.email }
  });
  return sendSuccess(res, {
    statusCode: 201,
    message: "Admin created successfully",
    data: {
      user: {
        id: adminUser._id,
        role: adminUser.role,
        fullName: adminUser.fullName,
        mobile: adminUser.mobile,
        email: adminUser.email
      }
    }
  });
});

export const pendingDeliveryAgentsHandler = asyncHandler(async (req, res) => {
  const agents = await pendingDeliveryAgentsForApproval();
  return sendSuccess(res, { message: "Pending delivery agents fetched", data: { agents } });
});

export const updateDeliveryApprovalHandler = asyncHandler(async (req, res) => {
  const { agentUserId } = req.validated.params;
  const { status } = req.validated.body;
  const agent = await updateDeliveryApproval({ agentUserId, status });
  await createAuditLog({
    req,
    action: "DELIVERY_APPROVAL_UPDATED",
    targetType: "DeliveryAgentProfile",
    targetId: agentUserId,
    metadata: { status }
  });

  return sendSuccess(res, { message: `Delivery agent ${status.toLowerCase()}`, data: { agent } });
});

export const auditLogsHandler = asyncHandler(async (req, res) => {
  const logs = await listAuditLogs({ limit: Number(req.query.limit || 200) });
  return sendSuccess(res, { message: "Audit logs fetched", data: { logs } });
});
