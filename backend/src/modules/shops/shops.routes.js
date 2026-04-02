import { Router } from "express";
import { approvedShopsHandler } from "./shops.controller.js";

const shopsRouter = Router();

shopsRouter.get("/public", approvedShopsHandler);

export default shopsRouter;
