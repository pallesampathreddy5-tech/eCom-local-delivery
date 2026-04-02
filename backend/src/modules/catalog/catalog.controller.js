import { sendSuccess } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { getCategories, getProductById, getProducts } from "./catalog.service.js";

export const getCategoriesHandler = asyncHandler(async (req, res) => {
  const categories = await getCategories();
  return sendSuccess(res, {
    message: "Categories fetched",
    data: { categories }
  });
});

export const getProductsHandler = asyncHandler(async (req, res) => {
  const { categoryId, search, shopUserId } = req.validated.query;
  const products = await getProducts({ categoryId, search, shopUserId });

  return sendSuccess(res, {
    message: "Products fetched",
    data: { products }
  });
});

export const getProductByIdHandler = asyncHandler(async (req, res) => {
  const { productId } = req.validated.params;
  const product = await getProductById(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  return sendSuccess(res, {
    message: "Product fetched",
    data: { product }
  });
});
