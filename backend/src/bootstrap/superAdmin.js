import bcrypt from "bcryptjs";
import env from "../config/env.js";
import { ROLES } from "../constants/roles.js";
import { User } from "../models/User.js";

const getMissingBootstrapFields = () => {
  const missing = [];

  if (!env.bootstrapSuperAdminEmail) missing.push("BOOTSTRAP_SUPER_ADMIN_EMAIL");
  if (!env.bootstrapSuperAdminPassword) missing.push("BOOTSTRAP_SUPER_ADMIN_PASSWORD");
  if (!env.bootstrapSuperAdminMobile) missing.push("BOOTSTRAP_SUPER_ADMIN_MOBILE");

  return missing;
};

export const ensureBootstrapSuperAdmin = async () => {
  const missingBootstrapFields = getMissingBootstrapFields();

  if (missingBootstrapFields.length > 0) {
    console.log(
      `Skipping bootstrap super admin creation. Missing env vars: ${missingBootstrapFields.join(", ")}`
    );
    return;
  }

  const email = env.bootstrapSuperAdminEmail.toLowerCase().trim();
  const existingSuperAdmin = await User.findOne({
    $or: [{ role: ROLES.SUPER_ADMIN }, { email }, { mobile: env.bootstrapSuperAdminMobile }]
  });

  if (existingSuperAdmin) {
    console.log("Bootstrap super admin already exists; skipping creation.");
    return;
  }

  const passwordHash = await bcrypt.hash(env.bootstrapSuperAdminPassword, 12);

  await User.create({
    role: ROLES.SUPER_ADMIN,
    fullName: env.bootstrapSuperAdminFullName,
    mobile: env.bootstrapSuperAdminMobile,
    email,
    passwordHash,
    isActive: true
  });

  console.log(`Bootstrap super admin created for ${email}.`);
};
