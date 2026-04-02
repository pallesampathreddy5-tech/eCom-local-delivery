import httpClient from "./httpClient";

export const getCartApi = () => httpClient.get("/cart").then((response) => response.data);

export const addToCartApi = (payload) =>
  httpClient.post("/cart/items", payload).then((response) => response.data);

export const updateCartItemApi = (productId, payload) =>
  httpClient.patch(`/cart/items/${productId}`, payload).then((response) => response.data);

export const removeCartItemApi = (productId) =>
  httpClient.delete(`/cart/items/${productId}`).then((response) => response.data);
