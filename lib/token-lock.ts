import { Redis } from "@upstash/redis";

let _redis: Redis | null = null;
function redis() {
  if (!_redis) _redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
  return _redis;
}

export async function withTokenLock<T>(token: string, fn: () => Promise<T>): Promise<T> {
  const key = `lock:${token}`;
  const acquired = await redis().set(key, "1", { nx: true, ex: 10 });

  if (!acquired) {
    throw new Error("Token currently locked. Try again.");
  }

  try {
    return await fn();
  } finally {
    await redis().del(key);
  }
}
