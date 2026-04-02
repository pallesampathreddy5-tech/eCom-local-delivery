import { Router } from "express";
import authRouter from "../modules/auth/auth.routes.js";
import catalogRouter from "../modules/catalog/catalog.routes.js";
import cartRouter from "../modules/cart/cart.routes.js";
import ordersRouter from "../modules/orders/orders.routes.js";
import paymentsRouter from "../modules/payments/payments.routes.js";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/catalog", catalogRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/payments", paymentsRouter);

export default apiRouter;
