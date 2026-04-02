export const sendSuccess = (res, { statusCode = 200, message = "OK", data = null }) => {
  return res.status(statusCode).json({ success: true, message, data });
};

export const sendError = (res, { statusCode = 500, message = "Internal Server Error", details = null }) => {
  return res.status(statusCode).json({ success: false, message, details });
};
