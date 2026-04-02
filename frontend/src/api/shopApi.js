import httpClient from "./httpClient";

export const getPublicShopsApi = () =>
  httpClient.get("/shops/public").then((response) => response.data);

export const getMyShopProductsApi = () =>
  httpClient.get("/shop/products").then((response) => response.data);

export const createShopProductApi = (payload) =>
  httpClient.post("/shop/products", payload).then((response) => response.data);

export const getPendingShopsApi = () =>
  httpClient.get("/admin/shops/pending").then((response) => response.data);

export const getPendingDeliveryAgentsApi = () =>
  httpClient.get("/admin/delivery-agents/pending").then((response) => response.data);

export const getAllShopsApi = () =>
  httpClient.get("/admin/shops").then((response) => response.data);

export const updateShopApprovalApi = (shopUserId, payload) =>
  httpClient.patch(`/admin/shops/${shopUserId}/approval`, payload).then((response) => response.data);

export const updateDeliveryApprovalApi = (agentUserId, payload) =>
  httpClient.patch(`/admin/delivery-agents/${agentUserId}/approval`, payload).then((response) => response.data);

export const createAdminProductApi = (payload) =>
  httpClient.post("/admin/products", payload).then((response) => response.data);

export const createAdminUserApi = (payload) =>
  httpClient.post("/admin/users/admin", payload).then((response) => response.data);

export const getAuditLogsApi = () =>
  httpClient.get("/admin/audit-logs").then((response) => response.data);

export const downloadExcelTemplateApi = (category) =>
  httpClient.get(`/admin/excel/template/${category}`, { responseType: "blob" }).then((response) => response.data);

export const previewExcelUploadApi = (formData) =>
  httpClient
    .post("/admin/excel/upload/preview", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then((response) => response.data);

export const commitExcelUploadApi = (formData) =>
  httpClient
    .post("/admin/excel/upload/commit", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then((response) => response.data);
