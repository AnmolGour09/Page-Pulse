import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  REQUEST_TIMEOUT: Number(process.env.REQUEST_TIMEOUT) || 5000,

  MAX_CONCURRENT_REQUESTS:
    Number(process.env.MAX_CONCURRENT_REQUESTS) || 5,
};