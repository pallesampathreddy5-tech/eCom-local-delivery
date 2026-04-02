import bcrypt from "bcryptjs";
import crypto from "crypto";
import ms from "ms";
import { ROLES } from "../../constants/roles.js";
import { AppError } from "../../utils/AppError.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../utils/jwt.js";
import { User } from "../../models/User.js";
import { ShopProfile } from "../../models/ShopProfile.js";
import { DeliveryAgentProfile } from "../../models/DeliveryAgentProfile.js";
import { RefreshToken } from "../../models/RefreshToken.js";
import env from "../../config/env.js";

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const buildTokenPayload = (user) => ({
  userId: user._id.toString(),
  role: user.role,
  fullName: user.fullName
});

const getAccessAndRefreshTokens = async (user) => {
  const payload = buildTokenPayload(user);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  const refreshMs = ms(env.refreshTtl);
  const expiresAt = new Date(Date.now() + refreshMs);

  await RefreshToken.create({
    userId: user._id,
    tokenHash: hashToken(refreshToken),
    expiresAt
  });

  return { accessToken, refreshToken, refreshExpiresAt: expiresAt };
};

const ensureUniqueIdentity = async ({ mobile, email }) => {
  const existingByMobile = await User.findOne({ mobile });
  if (existingByMobile) {
    throw new AppError(409, "Mobile number already registered");
  }

  if (email) {
    const existingByEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingByEmail) {
      throw new AppError(409, "Email already registered");
    }
  }
};

export const registerCustomer = async ({ fullName, mobile, email, password }) => {
  await ensureUniqueIdentity({ mobile, email });
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    role: ROLES.CUSTOMER,
    fullName,
    mobile,
    email: email || undefined,
    passwordHash
  });

  return user;
};

export const registerShopkeeper = async (payload) => {
  const { shopName, ownerName, mobile, address, latitude, longitude, email, password, shopCategory, kycDocumentUrl } = payload;
  await ensureUniqueIdentity({ mobile, email });
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    role: ROLES.SHOPKEEPER,
    fullName: ownerName,
    mobile,
    email: email || undefined,
    passwordHash
  });

  await ShopProfile.create({
    userId: user._id,
    shopName,
    ownerName,
    shopCategory,
    address,
    geo: {
      latitude,
      longitude
    },
    kycDocumentUrl
  });

  return user;
};

export const registerDeliveryAgent = async ({ fullName, mobile, email, address, aadhaarOrKycUrl, photoUrl, password }) => {
  await ensureUniqueIdentity({ mobile, email });
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    role: ROLES.DELIVERY_AGENT,
    fullName,
    mobile,
    email,
    passwordHash
  });

  await DeliveryAgentProfile.create({
    userId: user._id,
    address,
    aadhaarOrKycUrl,
    photoUrl
  });

  return user;
};

export const loginUser = async ({ loginId, password }) => {
  const normalized = loginId.toLowerCase();
  const user = await User.findOne({
    $or: [{ email: normalized }, { mobile: loginId }]
  });

  if (!user) {
    throw new AppError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new AppError(401, "Invalid credentials");
  }

  return { user, ...(await getAccessAndRefreshTokens(user)) };
};

export const refreshSession = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError(401, "Refresh token missing");
  }

  const payload = verifyRefreshToken(refreshToken);
  const tokenHash = hashToken(refreshToken);

  const stored = await RefreshToken.findOne({ tokenHash, userId: payload.userId, revokedAt: null });
  if (!stored || stored.expiresAt < new Date()) {
    throw new AppError(401, "Invalid refresh token");
  }

  stored.revokedAt = new Date();
  await stored.save();

  const user = await User.findById(payload.userId);
  if (!user) {
    throw new AppError(401, "User not found");
  }

  return { user, ...(await getAccessAndRefreshTokens(user)) };
};

export const logoutSession = async (refreshToken) => {
  if (!refreshToken) return;
  const tokenHash = hashToken(refreshToken);
  await RefreshToken.updateOne({ tokenHash }, { $set: { revokedAt: new Date() } });
};
