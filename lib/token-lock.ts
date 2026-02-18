import { getRedis } from "@/lib/redis";

export async function withTokenLock<T>(token: string, fn: () => Promise<T>): Promise<T> {
  const key = `lock:${token}`;
  const acquired = await getRedis().set(key, "1", "EX", 10, "NX");

  if (!acquired) {
    throw new Error("Token currently locked. Try again.");
  }

  try {
    return await fn();
  } finally {
    await getRedis().del(key);
  }
}
