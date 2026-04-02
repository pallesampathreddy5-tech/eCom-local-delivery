import multer from "multer";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/apiResponse.js";
import { AppError } from "../../utils/AppError.js";
import { createAuditLog } from "../../utils/auditLog.js";
import { buildTemplateWorkbook, commitExcelProducts, parseExcelRows } from "./excel.service.js";

const upload = multer({ storage: multer.memoryStorage() });

export const excelUploadMiddleware = upload.single("file");

export const downloadTemplateHandler = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const buffer = await buildTemplateWorkbook(category);

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", `attachment; filename=template-${category || "generic"}.xlsx`);
  return res.status(200).send(Buffer.from(buffer));
});

export const previewExcelUploadHandler = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError(400, "Excel file is required");
  }

  const { category } = req.body;
  const parsed = await parseExcelRows({ buffer: req.file.buffer, category });

  return sendSuccess(res, {
    message: "Excel preview generated",
    data: {
      totalRows: parsed.rows.length + parsed.errors.length,
      validRows: parsed.rows.length,
      invalidRows: parsed.errors.length,
      errors: parsed.errors,
      preview: parsed.rows.slice(0, 20)
    }
  });
});

export const commitExcelUploadHandler = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError(400, "Excel file is required");
  }

  const { category, shopUserId } = req.body;
  if (!shopUserId) {
    throw new AppError(400, "shopUserId is required");
  }

  const parsed = await parseExcelRows({ buffer: req.file.buffer, category });
  if (parsed.errors.length > 0) {
    throw new AppError(400, "Excel contains validation errors", parsed.errors);
  }

  const created = await commitExcelProducts({
    adminRole: req.user.role,
    shopUserId,
    rows: parsed.rows
  });
  await createAuditLog({
    req,
    action: "EXCEL_PRODUCTS_COMMITTED",
    targetType: "ProductBulkUpload",
    targetId: shopUserId,
    metadata: { category, createdCount: created.length }
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Excel products uploaded",
    data: {
      createdCount: created.length
    }
  });
});
