import ExcelJS from "exceljs";
import { AppError } from "../../utils/AppError.js";
import { resolveExcelCategory } from "./excel.constants.js";
import { createProductByAdmin } from "../shopProducts/shopProducts.service.js";

const normalizeHeader = (value) => String(value || "").trim();

export const buildTemplateWorkbook = async (category) => {
  const config = resolveExcelCategory(category);
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Products");

  sheet.addRow(config.headers);
  sheet.getRow(1).font = { bold: true };

  const sample = Object.fromEntries(config.headers.map((header) => [header, ""]));
  sample.name = "Sample Product";
  sample.categoryId = config.defaultCategoryId;
  sample.price = 99;
  sample.stock = 20;
  sample.description = "Sample description";
  sheet.addRow(config.headers.map((h) => sample[h]));

  return workbook.xlsx.writeBuffer();
};

export const parseExcelRows = async ({ buffer, category }) => {
  const config = resolveExcelCategory(category);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const sheet = workbook.worksheets[0];
  if (!sheet) throw new AppError(400, "Excel sheet is missing");

  const headerRow = sheet.getRow(1).values.slice(1).map(normalizeHeader);
  const missingHeaders = config.requiredHeaders.filter((header) => !headerRow.includes(header));
  if (missingHeaders.length > 0) {
    throw new AppError(400, `Missing headers: ${missingHeaders.join(", ")}`);
  }

  const rows = [];
  const errors = [];

  for (let rowIndex = 2; rowIndex <= sheet.rowCount; rowIndex += 1) {
    const row = sheet.getRow(rowIndex);
    const values = row.values.slice(1);

    if (!values.some((value) => String(value || "").trim() !== "")) {
      continue;
    }

    const mapped = {};
    headerRow.forEach((header, idx) => {
      mapped[header] = values[idx];
    });

    const validationIssues = [];
    for (const requiredHeader of config.requiredHeaders) {
      if (!String(mapped[requiredHeader] || "").trim()) {
        validationIssues.push(`${requiredHeader} is required`);
      }
    }

    const price = Number(mapped.price || 0);
    const stock = Number(mapped.stock || 0);

    if (Number.isNaN(price) || price < 0) validationIssues.push("price must be >= 0");
    if (Number.isNaN(stock) || stock < 0) validationIssues.push("stock must be >= 0");

    if (validationIssues.length > 0) {
      errors.push({ row: rowIndex, errors: validationIssues });
      continue;
    }

    const metaText = config.headers
      .filter((header) => !["name", "categoryId", "price", "stock", "description", "image"].includes(header))
      .map((header) => `${header}: ${mapped[header] || ""}`)
      .join(" | ");

    rows.push({
      name: String(mapped.name).trim(),
      categoryId: String(mapped.categoryId || config.defaultCategoryId).trim(),
      price,
      stock,
      description: [String(mapped.description || "").trim(), metaText].filter(Boolean).join(" | "),
      image: String(mapped.image || "").trim() || undefined
    });
  }

  return { rows, errors, config };
};

export const commitExcelProducts = async ({ adminRole, shopUserId, rows }) => {
  const created = [];

  for (const payload of rows) {
    const product = await createProductByAdmin({ adminRole, shopUserId, payload });
    created.push(product);
  }

  return created;
};
