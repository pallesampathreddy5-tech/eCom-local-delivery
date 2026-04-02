import httpClient from "./httpClient";

export const loginApi = (payload) =>
  httpClient.post("/auth/login", payload).then((response) => response.data);

export const registerCustomerApi = (payload) =>
  httpClient.post("/auth/register/customer", payload).then((response) => response.data);

export const registerShopkeeperApi = (payload) =>
  httpClient.post("/auth/register/shopkeeper", payload).then((response) => response.data);

export const registerDeliveryAgentApi = (payload) =>
  httpClient.post("/auth/register/delivery-agent", payload).then((response) => response.data);

export const logoutApi = () =>
  httpClient.post("/auth/logout").then((response) => response.data);
