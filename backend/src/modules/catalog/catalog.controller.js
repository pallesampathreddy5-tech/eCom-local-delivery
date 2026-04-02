import { sendSuccess } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { getCategories, getProductById, getProducts } from "./catalog.service.js";

export const getCategoriesHandler = asyncHandler(async (req, res) => {
  return sendSuccess(res, {
    message: "Categories fetched",
    data: { categories: getCategories() }
  });
});

export const getProductsHandler = asyncHandler(async (req, res) => {
  const { categoryId, search } = req.validated.query;
  const products = getProducts({ categoryId, search });

  return sendSuccess(res, {
    message: "Products fetched",
    data: { products }
  });
});

export const getProductByIdHandler = asyncHandler(async (req, res) => {
  const { productId } = req.validated.params;
  const product = getProductById(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  return sendSuccess(res, {
    message: "Product fetched",
    data: { product }
  });
});
