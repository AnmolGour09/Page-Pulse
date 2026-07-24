import pLimit from "p-limit";
import { env } from "../config/env";

export const auditLimiter = pLimit(
  env.MAX_CONCURRENT_REQUESTS
);