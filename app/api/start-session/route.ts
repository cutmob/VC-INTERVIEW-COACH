import { NextRequest, NextResponse } from "next/server";
import { auditLog } from "@/lib/audit-log";
import { REALTIME_MODEL, SYSTEM_PROMPT } from "@/lib/constants";
import { rateLimit } from "@/lib/rate-limiter";
import { isValidTokenFormat, normalizeToken } from "@/lib/sanitize-input";
import { getToken, setTokenConsumed } from "@/lib/token";
import { withTokenLock } from "@/lib/token-lock";

const SESSION_DURATION_SEC = 7 * 60; // 7 minutes

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const allowed = await rateLimit(`start-session:${ip}`);

  if (!allowed.ok) {
    auditLog("rate_limited", { endpoint: "start-session", ip });
    return NextResponse.json({ error: "Too many requests", retryAfter: allowed.retryAfter }, { status: 429 });
  }

  let payload: { token?: string };
  try {
    payload = (await req.json()) as { token?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const token = normalizeToken(payload.token ?? "");

  if (!isValidTokenFormat(token)) {
    return NextResponse.json({ error: "Invalid token format" }, { status: 400 });
  }

  let remainingSeconds = SESSION_DURATION_SEC;
  let previousState: Awaited<ReturnType<typeof getToken>> | null = null;

  try {
    await withTokenLock(token, async () => {
      const record = await getToken(token);
      if (!record || record.remaining_sessions <= 0 || record.expires_at < Math.floor(Date.now() / 1000)) {
        throw new Error("Token unavailable");
      }

      const now = Math.floor(Date.now() / 1000);

      // If session was already started, check if time remains
      if (record.session_started_at) {
        const elapsed = now - record.session_started_at;
        const left = SESSION_DURATION_SEC - elapsed;

        if (left <= 0) {
          throw new Error("Session time expired");
        }

        // Reconnection — time is still ticking, allow re-entry
        remainingSeconds = left;
        previousState = record;
        await setTokenConsumed(token, { ...record, active: true });
        return;
      }

      // Fresh session — single-use tokens can't start if already active
      if (record.remaining_sessions <= 1 && record.active) {
        throw new Error("Token unavailable");
      }

      previousState = record;
      await setTokenConsumed(token, {
        ...record,
        remaining_sessions: record.remaining_sessions - 1,
        active: true,
        session_started_at: now,
      });
    });
  } catch {
    auditLog("session.denied", { tokenPrefix: token.slice(0, 7) });
    return NextResponse.json({ error: "Token unavailable" }, { status: 409 });
  }

  try {
    const aiResponse = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: REALTIME_MODEL,
        voice: "alloy",
        instructions: SYSTEM_PROMPT,
        max_output_tokens: 150,
        modalities: ["audio", "text"]
      })
    });

    if (!aiResponse.ok) {
      throw new Error("Unable to create realtime session");
    }

    const data = (await aiResponse.json()) as { client_secret?: { value?: string } };
    const clientSecret = data.client_secret?.value;

    if (!clientSecret) {
      throw new Error("Missing realtime client secret");
    }

    auditLog("session.start", { tokenPrefix: token.slice(0, 7), ip, remainingSeconds });
    return NextResponse.json({
      client_secret: clientSecret,
      model: REALTIME_MODEL,
      remaining_seconds: remainingSeconds,
    });
  } catch {
    if (previousState) {
      await setTokenConsumed(token, previousState);
    }
    return NextResponse.json({ error: "Unable to create realtime session" }, { status: 502 });
  }
}
