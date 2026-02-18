import { NextRequest, NextResponse } from "next/server";
import { saveToken } from "@/lib/token";

/**
 * Dev-only endpoint to generate unlimited-use test tokens.
 * Protected by a secret key in the Authorization header.
 * Usage: POST /api/dev-token with header "Authorization: Bearer <DEV_SECRET>"
 */
export async function POST(req: NextRequest) {
  const secret = process.env.DEV_TOKEN_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Not configured" }, { status: 404 });
  }

  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = `PCH-${randomPart()}-${randomPart()}`;

  await saveToken(token, {
    remaining_sessions: 999999,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365, // 1 year
    active: false,
    created: new Date().toISOString(),
    stripeSessionId: "dev_manual",
  });

  return NextResponse.json({ token, note: "Unlimited dev token — 1 year expiry" });
}

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function randomPart() {
  return Array.from({ length: 4 })
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join("");
}
