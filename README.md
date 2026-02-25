# PitchCoach

AI-powered VC interview coach using OpenAI Realtime API. Practice your startup pitch with a relentless AI partner that interrupts vague answers and challenges weak claims.

> **📜 Dual Licensed:** AGPL-3.0+ (open source) / Commercial (proprietary use)  
> Free for open source projects. [Commercial licenses available](COMMERCIAL_LICENSE.md) for proprietary SaaS products.

## Why This Project?

This project showcases:
- **OpenAI Realtime API** integration with WebRTC for voice sessions
- **Webhook-driven token generation** - Secure API key delivery after purchase
- **Production-ready architecture** - Rate limiting, audit logging, webhook deduplication
- **Optional payments** - Stripe integration that can be disabled
- **Clean, minimal code** - Easy to understand and customize

Perfect for learning modern web development patterns or building your own AI coaching platform.

## Product Flow

1. User lands on `/` and navigates to `/pricing`
2. User purchases a single session via Stripe Checkout
3. Stripe webhook generates a `PCH-XXXX-XXXX` token and stores it in Redis/Netlify Blobs
4. Success page fetches the token using `session_id`
5. Session page validates the token and opens a WebRTC connection to OpenAI Realtime API

## Tech Stack

- **Next.js 14** (App Router)
- **Stripe** (Checkout + Webhooks)
- **OpenAI Realtime API** (WebRTC voice sessions)
- **Redis** (token storage, rate limiting)
- **Netlify Blobs** (fallback storage)
- **TypeScript** + **Tailwind CSS**

## Quick Start

Get running in 2 minutes without Stripe:

```bash
git clone https://github.com/cutmob/pitchcoach.git
cd pitchcoach
npm install
echo "OPENAI_API_KEY=sk-proj-YOUR_KEY" > .env.local
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env.local
npm run dev
```

Generate a free dev token:
```bash
curl -X POST http://localhost:3000/api/dev-token
```

See [QUICK_START.md](QUICK_START.md) for detailed instructions.

See [USER_GUIDE.md](USER_GUIDE.md) for how to use the app.

## Features

### Dev Mode (Default)
- ✅ No Stripe required
- ✅ Unlimited free tokens
- ✅ Perfect for learning and testing
- ✅ Full OpenAI Realtime API access

### Production Mode (Optional)
- 💳 Stripe payment integration
- 🎫 Single-use token generation
- 🔒 Webhook-driven security
- 📊 Audit logging

## Environment Variables

### Minimal (Dev Mode)
```env
OPENAI_API_KEY=sk-proj-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### With Stripe (Production)
```env
OPENAI_API_KEY=sk-proj-...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=https://yourdomain.com
REDIS_URL=redis://...
```

Leave Stripe variables empty to run in dev mode with unlimited free tokens.

## Stripe Setup Guide

1. **Create a Product** in your Stripe Dashboard
2. **Add a Price** (e.g., $10 one-time payment)
3. Copy the Price ID (starts with `price_`) to `NEXT_PUBLIC_STRIPE_PRICE_ID`
4. Get your Secret Key from API Keys section
5. Set up webhook endpoint at `/api/stripe/webhook` listening for `checkout.session.completed`
6. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

For local development, use the Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/stripe/checkout` | POST | Creates Stripe Checkout session |
| `/api/stripe/webhook` | POST | Handles Stripe webhooks, generates tokens |
| `/api/stripe/session` | GET | Retrieves token by `session_id` |
| `/api/start-session` | POST | Consumes token, returns OpenAI ephemeral key |
| `/api/dev-token` | POST | Dev-only endpoint for manual token generation |

## Architecture Highlights

### Token Generation Flow
```
User Payment → Stripe Webhook → Generate Token → Store in Redis → Update Stripe Session Metadata
```

### Token Validation Flow
```
User Submits Token → Validate Format → Check Redis → Verify Not Expired → Consume Token → Return OpenAI Key
```

### Security Features
- Rate limiting on all public endpoints
- Webhook signature verification
- Token format validation with regex
- Input sanitization
- Audit logging for all token operations
- Webhook deduplication to prevent double-processing

## Project Structure

```
app/
├── api/
│   ├── stripe/
│   │   ├── checkout/route.ts    # Create checkout session
│   │   ├── webhook/route.ts     # Process payments, generate tokens
│   │   └── session/route.ts     # Retrieve token by session_id
│   ├── start-session/route.ts   # Consume token, start OpenAI session
│   └── dev-token/route.ts       # Dev token generation
├── session/page.tsx             # Realtime voice session UI
├── success/page.tsx             # Post-payment token display
└── pricing/page.tsx             # Pricing and checkout trigger

lib/
├── token.ts                     # Token generation and storage
├── rate-limiter.ts              # Redis-backed rate limiting
├── audit-log.ts                 # Audit logging utility
├── redis.ts                     # Redis client setup
└── constants.ts                 # App constants and config
```

## Customization

This project is designed to be easily adapted for other use cases:

1. **Change the product**: Modify the Stripe Price ID and product details
2. **Different API**: Replace OpenAI Realtime API with any other API
3. **Multi-use tokens**: Adjust `remaining_sessions` logic in `lib/token.ts`
4. **Subscription model**: Switch Stripe mode from `payment` to `subscription`

## Contributing

**This project does not accept external contributions.**

You can:
- ✅ Fork for your own use (under AGPL-3.0+)
- ✅ Report bugs via issues
- ✅ Request features via issues
- ❌ Submit pull requests (will be closed)

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on why.

## License

This project is dual-licensed:

- **AGPL-3.0+** for open source use - see [LICENSE.md](LICENSE.md)
- **Commercial License** for proprietary use - see [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md)

**TL;DR:** Free for open source projects. If you're building a proprietary SaaS and don't want to share your code, you need a commercial license.

Contact support@driftrail.com for commercial licensing options.

### Quick Licensing Guide

- ✅ **Free (AGPL):** Open source projects, internal tools, learning
- 💰 **Commercial:** Proprietary SaaS, white-label, closed-source products

## Acknowledgments

Built with inspiration from the OpenAI Realtime API examples and Stripe's best practices for webhook handling.
