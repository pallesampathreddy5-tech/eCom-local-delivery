import { ROLES } from "../config/authConfig";
import {
  loginApi,
  logoutApi,
  registerCustomerApi,
  registerDeliveryAgentApi,
  registerShopkeeperApi
} from "./authApi";

export const loginRequest = async ({ loginId, password, role }) => {
  const response = await loginApi({ loginId, password });
  const user = response?.data?.user;

  if (!user) {
    throw new Error("Invalid login response");
  }

  if (user.role !== role) {
    throw new Error(`This account belongs to ${user.role}. Please select the correct role.`);
  }

  return response;
};

export const registerRequestByRole = (role, payload) => {
  if (role === ROLES.CUSTOMER) return registerCustomerApi(payload);
  if (role === ROLES.SHOPKEEPER) return registerShopkeeperApi(payload);
  if (role === ROLES.DELIVERY_AGENT) return registerDeliveryAgentApi(payload);
  throw new Error("Unsupported registration role");
};

export const logoutRequest = () => logoutApi();
