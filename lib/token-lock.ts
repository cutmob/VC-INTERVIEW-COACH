import { getRedis } from "@/lib/redis";
import crypto from "crypto";

export async function withTokenLock<T>(token: string, fn: () => Promise<T>): Promise<T> {
  const key = `lock:${token}`;
  const owner = crypto.randomUUID();
  const acquired = await getRedis().set(key, owner, "EX", 10, "NX");

  if (!acquired) {
    throw new Error("Token currently locked. Try again.");
  }

  try {
    return await fn();
  } finally {
    // Only delete if we still own the lock
    const current = await getRedis().get(key);
    if (current === owner) {
      await getRedis().del(key);
    }
  }
}
