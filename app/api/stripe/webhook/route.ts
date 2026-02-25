import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auditLog } from "@/lib/audit-log";
import { generateToken, hasWebhookBeenProcessed, markWebhookProcessed, saveToken, deleteToken } from "@/lib/token";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-02-24.acacia"
});

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing webhook configuration" }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (await hasWebhookBeenProcessed(event.id)) {
    return NextResponse.json({ received: true, deduped: true });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const token = generateToken();

    await saveToken(token, {
      remaining_sessions: 1,
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      active: false,
      created: new Date().toISOString(),
      stripeSessionId: session.id
    });

    await stripe.checkout.sessions.update(session.id, {
      metadata: {
        token
      }
    });

    auditLog("token.generated", { stripeSessionId: session.id, tokenPrefix: token.slice(0, 7) });
  }

  // Handle refunds - invalidate the token
  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    
    // Find the checkout session associated with this charge
    if (charge.metadata?.token) {
      await deleteToken(charge.metadata.token);
      auditLog("token.refunded", { chargeId: charge.id, tokenPrefix: charge.metadata.token.slice(0, 7) });
    } else {
      // Try to find via payment intent
      const paymentIntentId = typeof charge.payment_intent === 'string' 
        ? charge.payment_intent 
        : charge.payment_intent?.id;
      
      if (paymentIntentId) {
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntentId,
          limit: 1
        });
        
        if (sessions.data.length > 0 && sessions.data[0].metadata?.token) {
          const token = sessions.data[0].metadata.token;
          await deleteToken(token);
          auditLog("token.refunded", { chargeId: charge.id, tokenPrefix: token.slice(0, 7) });
        }
      }
    }
  }

  await markWebhookProcessed(event.id);
  return NextResponse.json({ received: true });
}
