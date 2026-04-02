import { sendError } from "../utils/apiResponse.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || null;
  return sendError(res, { statusCode, message, details });
};
