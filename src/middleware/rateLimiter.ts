import { rateLimit } from "express-rate-limit";

const isTest = process.env.NODE_ENV === "test";

export const rateLimiter = rateLimit({
  windowMs:
    (Number(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000,

  limit: isTest ? 1000 : (Number(process.env.RATE_LIMIT_MAX) || 100),

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many requests. Please try again later.",
    },
  },
});