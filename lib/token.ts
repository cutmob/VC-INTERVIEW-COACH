import { getRedis } from "@/lib/redis";
import { TOKEN_REGEX } from "@/lib/constants";

export type SessionToken = {
  remaining_sessions: number;
  expires_at: number;
  active: boolean;
  created: string;
  stripeSessionId: string;
  session_started_at?: number; // Unix timestamp when the 7-min window began
};

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateToken() {
  const part = () =>
    Array.from({ length: 4 })
      .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
      .join("");

  return `PCH-${part()}-${part()}`;
}

export async function saveToken(token: string, value: SessionToken, ttlSeconds = 86400) {
  if (!TOKEN_REGEX.test(token)) {
    throw new Error("Invalid token format");
  }
  await getRedis().set(`token:${token}`, JSON.stringify(value), "EX", ttlSeconds);
}

export async function getToken(token: string): Promise<SessionToken | null> {
  const raw = await getRedis().get(`token:${token}`);
  return raw ? (JSON.parse(raw) as SessionToken) : null;
}

export async function setTokenConsumed(token: string, value: SessionToken) {
  await getRedis().set(`token:${token}`, JSON.stringify(value));
}

export async function hasWebhookBeenProcessed(id: string): Promise<boolean> {
  const val = await getRedis().get(`webhook:${id}`);
  return val === "1";
}

export async function markWebhookProcessed(id: string) {
  await getRedis().set(`webhook:${id}`, "1", "EX", 86400);
}
