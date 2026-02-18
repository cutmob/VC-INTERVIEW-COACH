import { getStore } from "@netlify/blobs";
import { TOKEN_REGEX } from "@/lib/constants";

export type SessionToken = {
  remaining_sessions: number;
  expires_at: number;
  active: boolean;
  created: string;
  stripeSessionId: string;
};

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const tokenStore = getStore({ name: "session-tokens", consistency: "strong" });
const idempotencyStore = getStore({ name: "webhook-idempotency", consistency: "strong" });

export function generateToken() {
  const part = () =>
    Array.from({ length: 4 })
      .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
      .join("");

  return `PCH-${part()}-${part()}`;
}

export async function saveToken(token: string, value: SessionToken) {
  if (!TOKEN_REGEX.test(token)) {
    throw new Error("Invalid token format");
  }
  await tokenStore.setJSON(token, value);
}

export async function getToken(token: string): Promise<SessionToken | null> {
  return tokenStore.get(token, { type: "json" }) as Promise<SessionToken | null>;
}

export async function setTokenConsumed(token: string, value: SessionToken) {
  await tokenStore.setJSON(token, value);
}

export async function hasWebhookBeenProcessed(id: string): Promise<boolean> {
  const val = await idempotencyStore.get(id, { type: "text" });
  return val === "1";
}

export async function markWebhookProcessed(id: string) {
  await idempotencyStore.set(id, "1", { expirationTtl: 60 * 60 * 24 * 7 });
}
