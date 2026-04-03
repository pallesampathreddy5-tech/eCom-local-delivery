import app from "./app.js";
import { ensureBootstrapSuperAdmin } from "./bootstrap/superAdmin.js";
import env from "./config/env.js";
import { connectDB } from "./config/db.js";

const bootstrap = async () => {
  try {
    await connectDB();
    await ensureBootstrapSuperAdmin();
    app.listen(env.port, () => {
      console.log(`Backend running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start backend", error);
    process.exit(1);
  }
};

bootstrap();
