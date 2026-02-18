import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { rateLimit } from "@/lib/rate-limiter";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-02-24.acacia"
});

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const allowed = await rateLimit(`session-lookup:${ip}`);
  if (!allowed.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Checkout session is not paid" }, { status: 400 });
  }

  const token = session.metadata?.token;
  if (!token) {
    return NextResponse.json({ error: "Token not ready yet" }, { status: 404 });
  }

  return NextResponse.json({ token, sessions_remaining: 1 });
}
