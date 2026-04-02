export const EXCEL_CATEGORY_CONFIG = {
  vegetables: {
    defaultCategoryId: "cat-vegetables",
    headers: ["name", "categoryId", "price", "stock", "unit", "origin", "isLeafy", "description", "image"],
    requiredHeaders: ["name", "price", "stock", "unit"]
  },
  fruits: {
    defaultCategoryId: "cat-fruits",
    headers: ["name", "categoryId", "price", "stock", "variety", "season", "ripeness", "description", "image"],
    requiredHeaders: ["name", "price", "stock", "variety"]
  },
  generic: {
    defaultCategoryId: "cat-snacks",
    headers: ["name", "categoryId", "price", "stock", "description", "image"],
    requiredHeaders: ["name", "price", "stock"]
  }
};

export const resolveExcelCategory = (category) => {
  if (!category) return EXCEL_CATEGORY_CONFIG.generic;
  const key = String(category).toLowerCase();
  return EXCEL_CATEGORY_CONFIG[key] || EXCEL_CATEGORY_CONFIG.generic;
};
