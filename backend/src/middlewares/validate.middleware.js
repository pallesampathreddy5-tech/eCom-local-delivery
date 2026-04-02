import { z } from "zod";
import { AppError } from "../utils/AppError.js";

export const validate = (schema) => (req, res, next) => {
  try {
    req.validated = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }));
      return next(new AppError(400, "Validation failed", details));
    }
    return next(error);
  }
};
