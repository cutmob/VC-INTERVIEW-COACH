import { NextRequest, NextResponse } from "next/server";
import { saveToken } from "@/lib/token";

/**
 * Dev-only endpoint to generate unlimited-use test tokens.
 * 
 * SECURITY MODES:
 * 1. If DEV_TOKEN_SECRET is set: Requires Authorization header
 * 2. If NODE_ENV=development and no secret: Open access (local dev only)
 * 3. If NODE_ENV=production and no secret: Endpoint disabled
 * 
 * Usage: POST /api/dev-token
 * With secret: Add header "Authorization: Bearer <DEV_TOKEN_SECRET>"
 * Without secret (dev only): No auth required
 */
export async function POST(req: NextRequest) {
  const secret = process.env.DEV_TOKEN_SECRET;
  const isDev = process.env.NODE_ENV === "development";

  // Production without secret = disabled
  if (!isDev && !secret) {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  // If secret is set, require it
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Development mode without secret = open access (local only)
  // This is safe because it only works on localhost

  const token = `PCH-${randomPart()}-${randomPart()}`;
  const yearInSeconds = 60 * 60 * 24 * 365;

  await saveToken(token, {
    remaining_sessions: 999999,
    expires_at: Math.floor(Date.now() / 1000) + yearInSeconds,
    active: false,
    created: new Date().toISOString(),
    stripeSessionId: "dev_manual",
  }, yearInSeconds);

  return NextResponse.json({ 
    token, 
    note: "Unlimited dev token — 1 year expiry",
    mode: secret ? "protected" : "development"
  });
}

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function randomPart() {
  return Array.from({ length: 4 })
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join("");
}
