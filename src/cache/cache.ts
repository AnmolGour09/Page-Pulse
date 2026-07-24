import NodeCache from "node-cache";

const ttl = Number(process.env.CACHE_TTL) || 300;

export const cache = new NodeCache({
  stdTTL: ttl,
  checkperiod: 60,
});