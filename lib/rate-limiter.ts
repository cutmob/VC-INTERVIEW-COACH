import { getRedis } from "@/lib/redis";

const WINDOW_SEC = 60;
const MAX_REQUESTS = 30;

export async function rateLimit(key: string): Promise<{ ok: boolean; retryAfter?: number }> {
  const redisKey = `rl:${key}`;
  const count = await getRedis().incr(redisKey);

  if (count === 1) {
    await getRedis().expire(redisKey, WINDOW_SEC);
  }

  if (count > MAX_REQUESTS) {
    const ttl = await getRedis().ttl(redisKey);
    return { ok: false, retryAfter: ttl > 0 ? ttl : WINDOW_SEC };
  }

  return { ok: true };
}
