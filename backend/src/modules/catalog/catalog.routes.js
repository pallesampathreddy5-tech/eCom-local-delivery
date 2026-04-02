import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  getCategoriesHandler,
  getProductByIdHandler,
  getProductsHandler
} from "./catalog.controller.js";
import { listProductsSchema, productByIdSchema } from "./catalog.validation.js";

const catalogRouter = Router();

catalogRouter.get("/categories", getCategoriesHandler);
catalogRouter.get("/products", validate(listProductsSchema), getProductsHandler);
catalogRouter.get("/products/:productId", validate(productByIdSchema), getProductByIdHandler);

export default catalogRouter;
