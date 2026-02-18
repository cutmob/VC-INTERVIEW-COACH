import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-06-20"
});

export async function GET(req: NextRequest) {
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
