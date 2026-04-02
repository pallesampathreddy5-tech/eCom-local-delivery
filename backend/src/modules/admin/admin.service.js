import { AppError } from "../../utils/AppError.js";
import { ShopProfile } from "../../models/ShopProfile.js";
import { listShopsForAdmin } from "../shops/shops.service.js";
import { User } from "../../models/User.js";
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
