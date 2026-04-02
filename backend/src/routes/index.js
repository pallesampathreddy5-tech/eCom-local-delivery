import { Router } from "express";
import authRouter from "../modules/auth/auth.routes.js";
import adminRouter from "../modules/admin/admin.routes.js";
import catalogRouter from "../modules/catalog/catalog.routes.js";
import cartRouter from "../modules/cart/cart.routes.js";
import ordersRouter from "../modules/orders/orders.routes.js";
import paymentsRouter from "../modules/payments/payments.routes.js";
import excelRouter from "../modules/excel/excel.routes.js";
import shopProductsRouter from "../modules/shopProducts/shopProducts.routes.js";
import shopsRouter from "../modules/shops/shops.routes.js";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/catalog", catalogRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/payments", paymentsRouter);
apiRouter.use("/shops", shopsRouter);
apiRouter.use("/", shopProductsRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/admin/excel", excelRouter);

export default apiRouter;
