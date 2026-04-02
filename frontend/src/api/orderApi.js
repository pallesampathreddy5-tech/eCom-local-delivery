import httpClient from "./httpClient";

export const checkoutPreviewApi = (payload) =>
  httpClient.post("/orders/checkout/preview", payload).then((response) => response.data);

export const placeOrderApi = (payload) =>
  httpClient.post("/orders/checkout/place-order", payload).then((response) => response.data);

export const getMyOrdersApi = () =>
  httpClient.get("/orders/my").then((response) => response.data);
