# PitchCoach

Production-focused Next.js 14 application for paid realtime pitch interrogation sessions.

## Product flow

1. User lands on `/` and goes to `/pricing`.
2. User buys a single session key via Stripe Checkout.
3. Stripe webhook generates `PCH-XXXX-XXXX` token and stores it in Netlify Blobs.
4. Success page fetches token using `session_id`.
5. Session page validates token and opens a realtime WebRTC session against OpenAI.

## Run locally

1. Copy `.env.example` to `.env.local` and provide real values.
2. Install dependencies with `npm install`.
3. Start the app with `npm run dev`.

## Routes

- `GET /` — landing page
- `GET /pricing` — pricing and checkout trigger
- `GET /success` — token display page after payment
- `GET /session` — realtime pitch interrogation room
- `POST /api/stripe/checkout` — create Stripe Checkout session
- `POST /api/stripe/webhook` — process Stripe webhook + token generation
- `GET /api/stripe/session` — lookup token by `session_id`
- `POST /api/start-session` — consume token and create OpenAI realtime ephemeral key
