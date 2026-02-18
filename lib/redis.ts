import Redis from "ioredis";

let _redis: Redis | null = null;

export function getRedis() {
  if (!_redis) {
    _redis = new Redis(process.env.REDIS_URL!, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
  }
  return _redis;
}
