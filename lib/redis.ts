import Redis from "ioredis";

let _redis: Redis | null = null;

export function getRedis() {
  if (!_redis) {
    const url = process.env.REDIS_URL!;
    _redis = new Redis(url, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      // Redis Labs on Vercel may use self-signed certs
      tls: url.startsWith("rediss://") ? { rejectUnauthorized: false } : undefined,
    });
  }
  return _redis;
}
