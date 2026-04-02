import { Router } from "express";
import { ROLES } from "../../constants/roles.js";
import { requireAuth, requireRoles } from "../../middlewares/auth.middleware.js";
import {
  commitExcelUploadHandler,
  downloadTemplateHandler,
  excelUploadMiddleware,
  previewExcelUploadHandler
} from "./excel.controller.js";

const excelRouter = Router();

excelRouter.use(requireAuth, requireRoles([ROLES.ADMIN, ROLES.SUPER_ADMIN]));

excelRouter.get("/template/:category", downloadTemplateHandler);
excelRouter.post("/upload/preview", excelUploadMiddleware, previewExcelUploadHandler);
excelRouter.post("/upload/commit", excelUploadMiddleware, commitExcelUploadHandler);

export default excelRouter;
