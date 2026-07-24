import pinoHttp from "pino-http";
import { randomUUID } from "crypto";

import { logger } from "../logger/logger";

export const httpLogger = pinoHttp({
  logger,

  genReqId(req, res) {
    const id = randomUUID();

    res.setHeader("X-Request-Id", id);

    return id;
  },
});