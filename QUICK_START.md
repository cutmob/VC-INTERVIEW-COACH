# Quick Start Guide

Get PitchCoach running in 2 minutes without Stripe.

## Instant Setup (No Payment Required)

```bash
# 1. Clone and install
git clone https://github.com/cutmob/pitchcoach.git
cd pitchcoach
npm install

# 2. Create .env.local with just OpenAI key
echo "OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE" > .env.local
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env.local

# 3. Run the app
npm run dev
```

## Get Your Free Dev Token

Open http://localhost:3000 and:

1. Go to `/pricing` (or just open your browser console)
2. Run this in the console:

```javascript
fetch('/api/dev-token', { method: 'POST' })
  .then(r => r.json())
  .then(d => console.log('Your token:', d.token))
```

3. Copy the token (format: `PCH-XXXX-XXXX`)
4. Go to `/session` and paste your token
5. Start your AI coaching session!

## Dev Mode Features

When Stripe is not configured:

- ✅ Unlimited free tokens via `/api/dev-token`
- ✅ No authentication required (local dev only)
- ✅ Tokens last 1 year
- ✅ Unlimited sessions per token
- ✅ Full OpenAI Realtime API access

## Add Stripe Later (Optional)

Want to test the payment flow? See [SETUP.md](SETUP.md) for full Stripe setup.

## Environment Variables

### Minimal Setup (Dev Mode)
```env
OPENAI_API_KEY=sk-proj-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### With Stripe (Payment Mode)
```env
OPENAI_API_KEY=sk-proj-...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Optional
```env
REDIS_URL=redis://localhost:6379
DEV_TOKEN_SECRET=your-secret-here  # Require auth for dev tokens
```

## Security Notes

### Dev Token Endpoint

The `/api/dev-token` endpoint has three modes:

1. **Development (no secret)**: Open access, anyone can generate tokens
   - Only works when `NODE_ENV=development`
   - Safe for local development
   - Automatically disabled in production

2. **Protected (with secret)**: Requires authentication
   - Set `DEV_TOKEN_SECRET=your-secret-here`
   - Requires `Authorization: Bearer your-secret-here` header
   - Works in any environment

3. **Disabled (production, no secret)**: Endpoint returns 404
   - Automatically disabled in production without secret
   - Prevents unauthorized token generation

### Recommendation

- **Local dev**: Leave `DEV_TOKEN_SECRET` empty for easy testing
- **Shared dev**: Set `DEV_TOKEN_SECRET` to require authentication
- **Production**: Either set a strong secret or leave empty (disabled)

## Troubleshooting

### "Token unavailable" error
- Generate a new token via `/api/dev-token`
- Check that your OpenAI API key is valid
- Ensure you have Realtime API access

### "Unable to create realtime session"
- Verify your OpenAI API key
- Check OpenAI usage limits
- Ensure Realtime API is enabled on your account

### Dev token endpoint returns 404
- Check `NODE_ENV` is set to `development`
- Or set `DEV_TOKEN_SECRET` in your `.env.local`

## Next Steps

- Read [ARCHITECTURE.md](ARCHITECTURE.md) to understand the design
- See [SETUP.md](SETUP.md) for full Stripe setup
- Check [SECURITY.md](SECURITY.md) for production deployment

## Production Deployment

For production:

1. Set up Stripe (see [SETUP.md](SETUP.md))
2. Configure Redis for production
3. Set strong `DEV_TOKEN_SECRET` or leave empty to disable
4. Use live OpenAI API keys
5. Enable HTTPS
6. Review [SECURITY.md](SECURITY.md)
