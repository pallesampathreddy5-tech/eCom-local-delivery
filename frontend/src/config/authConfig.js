export const ROLES = {
  CUSTOMER: "CUSTOMER",
  SHOPKEEPER: "SHOPKEEPER",
  DELIVERY_AGENT: "DELIVERY_AGENT",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN"
};

export const ROLE_ROUTE_MAP = {
  [ROLES.CUSTOMER]: "/customer/dashboard",
  [ROLES.SHOPKEEPER]: "/shop/dashboard",
  [ROLES.DELIVERY_AGENT]: "/delivery/dashboard",
  [ROLES.ADMIN]: "/admin/dashboard",
  [ROLES.SUPER_ADMIN]: "/super-admin/dashboard"
};
