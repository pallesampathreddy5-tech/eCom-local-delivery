import { ShopProfile } from "../../models/ShopProfile.js";
import { User } from "../../models/User.js";

export const listApprovedShops = async () => {
  const shops = await ShopProfile.find({ approvalStatus: "APPROVED" }).lean();

  return shops.map((shop) => ({
    id: shop._id,
    shopUserId: shop.userId.toString(),
    shopName: shop.shopName,
    ownerName: shop.ownerName,
    category: shop.shopCategory,
    address: shop.address,
    approvalStatus: shop.approvalStatus
  }));
};

export const listShopsForAdmin = async ({ status }) => {
  const query = status ? { approvalStatus: status } : {};
  const shops = await ShopProfile.find(query).lean();

  return Promise.all(
    shops.map(async (shop) => {
      const user = await User.findById(shop.userId).lean();
      return {
        id: shop._id,
        shopUserId: shop.userId.toString(),
        shopName: shop.shopName,
        ownerName: shop.ownerName,
        category: shop.shopCategory,
        address: shop.address,
        approvalStatus: shop.approvalStatus,
        mobile: user?.mobile || null,
        email: user?.email || null
      };
    })
  );
};
