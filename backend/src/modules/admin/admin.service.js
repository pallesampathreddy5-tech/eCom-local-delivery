import { AppError } from "../../utils/AppError.js";
import { ShopProfile } from "../../models/ShopProfile.js";
import { DeliveryAgentProfile } from "../../models/DeliveryAgentProfile.js";
import { listShopsForAdmin } from "../shops/shops.service.js";
import { User } from "../../models/User.js";
import { AuditLog } from "../../models/AuditLog.js";
import { ROLES } from "../../constants/roles.js";
import bcrypt from "bcryptjs";

export const pendingShopsForApproval = async () => {
  return listShopsForAdmin({ status: "PENDING" });
};

export const allShopsForAdmin = async () => {
  return listShopsForAdmin({});
};

export const updateShopApproval = async ({ shopUserId, status }) => {
  const profile = await ShopProfile.findOne({ userId: shopUserId });
  if (!profile) {
    throw new AppError(404, "Shop profile not found");
  }

  profile.approvalStatus = status;
  await profile.save();
  return profile;
};

export const createAdminBySuperAdmin = async ({ fullName, mobile, email, password }) => {
  const existingByMobile = await User.findOne({ mobile });
  if (existingByMobile) {
    throw new AppError(409, "Mobile number already registered");
  }

  const existingByEmail = await User.findOne({ email: email.toLowerCase() });
  if (existingByEmail) {
    throw new AppError(409, "Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    role: ROLES.ADMIN,
    fullName,
    mobile,
    email: email.toLowerCase(),
    passwordHash,
    isActive: true
  });

  return user;
};

export const pendingDeliveryAgentsForApproval = async () => {
  const profiles = await DeliveryAgentProfile.find({ approvalStatus: "PENDING" }).lean();

  return Promise.all(
    profiles.map(async (profile) => {
      const user = await User.findById(profile.userId).lean();
      return {
        id: profile._id,
        agentUserId: profile.userId.toString(),
        fullName: user?.fullName || "-",
        mobile: user?.mobile || "-",
        email: user?.email || "-",
        address: profile.address,
        approvalStatus: profile.approvalStatus
      };
    })
  );
};

export const updateDeliveryApproval = async ({ agentUserId, status }) => {
  const profile = await DeliveryAgentProfile.findOne({ userId: agentUserId });
  if (!profile) {
    throw new AppError(404, "Delivery agent profile not found");
  }

  profile.approvalStatus = status;
  await profile.save();
  return profile;
};

export const listAuditLogs = async ({ limit = 200 } = {}) => {
  return AuditLog.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("actorUserId", "fullName email mobile role")
    .lean();
};
