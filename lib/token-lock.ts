import { getStore } from "@netlify/blobs";

const lockStore = getStore({ name: "token-locks", consistency: "strong" });

export async function withTokenLock<T>(token: string, fn: () => Promise<T>): Promise<T> {
  const key = `lock:${token}`;
  const acquired = await lockStore.set(key, "1")
    .then(() => true).catch(() => false);

  if (!acquired) {
    throw new Error("Token currently locked. Try again.");
  }

  try {
    return await fn();
  } finally {
    await lockStore.delete(key);
  }
}
