import env from "../../config/env.js";
import { sendSuccess } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  loginUser,
  logoutSession,
  refreshSession,
  registerCustomer,
  registerDeliveryAgent,
  registerShopkeeper
} from "./auth.service.js";

const refreshCookieOptions = {
  httpOnly: true,
  secure: env.appEnv !== "dev",
  sameSite: env.appEnv === "dev" ? "lax" : "strict",
  path: "/api/v1/auth",
  ...(env.cookieDomain ? { domain: env.cookieDomain } : {})
};

const toSafeUser = (user) => ({
  id: user._id,
  role: user.role,
  fullName: user.fullName,
  mobile: user.mobile,
  email: user.email || null
});

export const registerCustomerHandler = asyncHandler(async (req, res) => {
  const user = await registerCustomer(req.validated.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: "Customer registered successfully",
    data: { user: toSafeUser(user) }
  });
});

export const registerShopkeeperHandler = asyncHandler(async (req, res) => {
  const user = await registerShopkeeper(req.validated.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: "Shopkeeper registered successfully",
    data: { user: toSafeUser(user) }
  });
});

export const registerDeliveryAgentHandler = asyncHandler(async (req, res) => {
  const user = await registerDeliveryAgent(req.validated.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: "Delivery agent registered successfully",
    data: { user: toSafeUser(user) }
  });
});

export const loginHandler = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await loginUser(req.validated.body);

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);
  return sendSuccess(res, {
    message: "Login successful",
    data: {
      accessToken,
      user: toSafeUser(user)
    }
  });
});

export const refreshHandler = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const { user, accessToken, refreshToken } = await refreshSession(token);
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  return sendSuccess(res, {
    message: "Token refreshed",
    data: {
      accessToken,
      user: toSafeUser(user)
    }
  });
});

export const logoutHandler = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  await logoutSession(token);
  res.clearCookie("refreshToken", refreshCookieOptions);

  return sendSuccess(res, { message: "Logged out successfully" });
});

export const meHandler = asyncHandler(async (req, res) => {
  return sendSuccess(res, {
    message: "Current user fetched",
    data: {
      user: {
        userId: req.user.userId,
        role: req.user.role,
        fullName: req.user.fullName
      }
    }
  });
});
