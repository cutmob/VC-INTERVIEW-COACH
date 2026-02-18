import { Redis } from "@upstash/redis";
import { TOKEN_REGEX } from "@/lib/constants";

export type SessionToken = {
  remaining_sessions: number;
  expires_at: number;
  active: boolean;
  created: string;
  stripeSessionId: string;
};

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

let _redis: Redis | null = null;
function redis() {
  if (!_redis) _redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
  return _redis;
}

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
  await redis().set(`token:${token}`, value);
}

export async function getToken(token: string): Promise<SessionToken | null> {
  return redis().get<SessionToken>(`token:${token}`);
}

export async function setTokenConsumed(token: string, value: SessionToken) {
  await redis().set(`token:${token}`, value);
}

export async function hasWebhookBeenProcessed(id: string): Promise<boolean> {
  const val = await redis().get<string>(`webhook:${id}`);
  return val === "1";
}

export async function markWebhookProcessed(id: string) {
  await redis().set(`webhook:${id}`, "1", { ex: 86400 });
}
