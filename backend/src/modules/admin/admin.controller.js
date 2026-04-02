import { sendSuccess } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { allShopsForAdmin, createAdminBySuperAdmin, pendingShopsForApproval, updateShopApproval } from "./admin.service.js";

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

  return sendSuccess(res, { message: `Shop ${status.toLowerCase()}`, data: { shop } });
});

export const createAdminUserHandler = asyncHandler(async (req, res) => {
  const adminUser = await createAdminBySuperAdmin(req.validated.body);
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
