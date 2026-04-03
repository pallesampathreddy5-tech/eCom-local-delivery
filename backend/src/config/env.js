import dotenv from "dotenv";

dotenv.config();

const required = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const normalizeOrigin = (origin) => origin.trim().replace(/\/+$/, "");

const parseOrigins = (value) =>
  value
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);

const env = {
  port: Number(process.env.PORT || 5000),
  appEnv: process.env.APP_ENV || "dev",
  mongoUri: required("MONGODB_URI"),
  accessSecret: required("JWT_ACCESS_SECRET"),
  refreshSecret: required("JWT_REFRESH_SECRET"),
  accessTtl: process.env.ACCESS_TOKEN_TTL || "15m",
  refreshTtl: process.env.REFRESH_TOKEN_TTL || "7d",
  cookieDomain: process.env.COOKIE_DOMAIN || "",
  frontendOrigins: parseOrigins(process.env.FRONTEND_ORIGIN || "http://localhost:5173"),
  bootstrapSuperAdminEmail: process.env.BOOTSTRAP_SUPER_ADMIN_EMAIL || "",
  bootstrapSuperAdminPassword: process.env.BOOTSTRAP_SUPER_ADMIN_PASSWORD || "",
  bootstrapSuperAdminFullName: process.env.BOOTSTRAP_SUPER_ADMIN_FULL_NAME || "Platform Super Admin",
  bootstrapSuperAdminMobile: process.env.BOOTSTRAP_SUPER_ADMIN_MOBILE || ""
};

export default env;
