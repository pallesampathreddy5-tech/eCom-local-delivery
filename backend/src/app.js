import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import env from "./config/env.js";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());
const corsOptions = {
  origin(origin, callback) {
    if (!origin || env.frontendOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
};

app.use(
  cors(corsOptions)
);
app.options("*", cors(corsOptions));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 250
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Service healthy" });
});

app.use("/api/v1", apiRouter);
app.use(errorHandler);

export default app;
