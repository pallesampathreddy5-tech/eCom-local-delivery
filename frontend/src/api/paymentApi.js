import httpClient from "./httpClient";

export const verifyPaymentApi = (payload) =>
  httpClient.post("/payments/verify", payload).then((response) => response.data);
