import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { rateLimit } from "@/lib/rate-limiter";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-02-24.acacia"
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const allowed = await rateLimit(`checkout:${ip}`);
  if (!allowed.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!priceId || !baseUrl) {
    return NextResponse.json({ error: "Missing Stripe configuration" }, { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}`
  });

  return NextResponse.json({ url: session.url });
}
