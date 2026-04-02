import { AppError } from "../../utils/AppError.js";
import { Product } from "../../models/Product.js";
import { ShopProfile } from "../../models/ShopProfile.js";

const ensureApprovedShop = async (shopUserId) => {
  const profile = await ShopProfile.findOne({ userId: shopUserId });
  if (!profile) throw new AppError(404, "Shop profile not found");
  if (profile.approvalStatus !== "APPROVED") {
    throw new AppError(403, "Shop is not approved by admin yet");
  }
  return profile;
};

export const createProductByShopkeeper = async ({ shopUserId, payload }) => {
  const profile = await ensureApprovedShop(shopUserId);

  const product = await Product.create({
    ...payload,
    shopUserId,
    shopName: profile.shopName,
    createdByRole: "SHOPKEEPER"
  });

  return product;
};

export const createProductByAdmin = async ({ adminRole, shopUserId, payload }) => {
  const profile = await ensureApprovedShop(shopUserId);

  const product = await Product.create({
    ...payload,
    shopUserId,
    shopName: profile.shopName,
    createdByRole: adminRole === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN"
  });

  return product;
};

export const listShopProducts = async (shopUserId) => {
  return Product.find({ shopUserId }).sort({ createdAt: -1 });
};
