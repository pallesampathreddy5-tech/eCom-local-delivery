import bcrypt from "bcryptjs";
import env from "../config/env.js";
import { ROLES } from "../constants/roles.js";
import { User } from "../models/User.js";

const hasBootstrapConfig =
  env.bootstrapSuperAdminEmail &&
  env.bootstrapSuperAdminPassword &&
  env.bootstrapSuperAdminMobile;

export const ensureBootstrapSuperAdmin = async () => {
  if (!hasBootstrapConfig) {
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
