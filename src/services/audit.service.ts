import axios from "axios";
import * as cheerio from "cheerio";

import { cache } from "../cache/cache";
import { env } from "../config/env";
import { auditLimiter } from "../utils/concurrency";

export const auditService = async (url: string) => {

  // Check cache first
  const cacheKey = url;

  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    return {
      ...(cachedResult as object),
      cached: true,
    };
  }

  // Execute audit with concurrency limit
  return auditLimiter(async () => {

    const start = Date.now();

    const response = await axios.get(url, {
      timeout: env.REQUEST_TIMEOUT,
      headers: {
        "User-Agent": "PagePulse/1.0",
      },
    });

    const responseTime = Date.now() - start;

    const $ = cheerio.load(response.data);

    const result = {
      url,
      status: response.status,
      responseTime,
      title: $("head title").first().text().trim(),
      images: $("img").length,
      links: $("a").length,
    };

    // Save to cache
    cache.set(cacheKey, result);

    return {
      ...result,
      cached: false,
    };

  });

};