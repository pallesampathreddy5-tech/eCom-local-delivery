import { ensureBootstrapSuperAdmin } from "../src/bootstrap/superAdmin.js";
import { connectDB } from "../src/config/db.js";

const runBootstrap = async () => {
  try {
    await connectDB();
    await ensureBootstrapSuperAdmin();
    process.exit(0);
  } catch (error) {
    console.error("Bootstrap super admin script failed", error);
    process.exit(1);
  }
};

runBootstrap();
