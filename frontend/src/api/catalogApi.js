import httpClient from "./httpClient";

export const getCategoriesApi = () =>
  httpClient.get("/catalog/categories").then((response) => response.data);

export const getProductsApi = (params = {}) =>
  httpClient.get("/catalog/products", { params }).then((response) => response.data);
