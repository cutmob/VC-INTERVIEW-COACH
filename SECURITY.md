# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please email the maintainers directly rather than opening a public issue.

## Security Best Practices

This project implements several security measures:

### 1. Environment Variables
- All sensitive credentials are stored in environment variables
- Never commit `.env` or `.env.local` files
- Use different keys for development and production
- Stripe variables are optional (leave empty for dev mode)

### 2. Dev Token Endpoint Security

The `/api/dev-token` endpoint has three security modes:

**Development Mode (no secret)**
- Only works when `NODE_ENV=development`
- Open access for easy local testing
- Automatically disabled in production
- Safe because it only runs on localhost

**Protected Mode (with secret)**
- Set `DEV_TOKEN_SECRET` to require authentication
- Requires `Authorization: Bearer <secret>` header
- Works in any environment
- Use for shared development environments

**Disabled Mode (production, no secret)**
- Automatically returns 404 in production
- Prevents unauthorized token generation
- Recommended for production deployments

**Recommendation:**
- Local dev: Leave empty for convenience
- Shared dev: Set a secret
- Production: Leave empty (disabled) or set a strong secret

### 3. Webhook Security
- Stripe webhook signatures are verified on every request
- Webhook events are deduplicated to prevent replay attacks
- Invalid signatures return 400 errors

### 3. Rate Limiting
- All public endpoints are rate-limited by IP address
- Redis-backed rate limiting with configurable windows
- 429 responses for exceeded limits

### 4. Input Validation
- Token format validation with regex patterns
- Session ID validation before Stripe API calls
- Input sanitization on all user-provided data

### 5. Token Security
- Tokens are single-use (consumed after first session start)
- Tokens expire after 24 hours (or 1 year for dev tokens)
- Tokens are stored with cryptographic randomness
- Session reconnection allowed within 7-minute window (time keeps ticking)
- Refunded payments automatically invalidate tokens

### 6. Content Security Policy
- CSP headers configured in middleware
- Restricts script sources to trusted domains
- Prevents XSS attacks

## Deployment Checklist

Before deploying to production:

- [ ] Use live Stripe keys (not test keys) OR leave empty for dev mode
- [ ] Set up proper webhook endpoint with HTTPS (if using Stripe)
- [ ] Configure Redis with authentication
- [ ] Enable rate limiting
- [ ] Review `DEV_TOKEN_SECRET` setting (empty = disabled, or set strong secret)
- [ ] Review CSP headers in `middleware.ts`
- [ ] Enable audit logging
- [ ] Set up monitoring for failed webhook events (if using Stripe)
- [ ] Test webhook signature verification (if using Stripe)
- [ ] Verify token expiration logic
- [ ] Test refund handling (if using Stripe)

## Known Limitations

- Redis is optional but recommended for production
- Netlify Blobs fallback has different performance characteristics
- Rate limiting is IP-based (can be bypassed with proxies)
- Session reconnection within 7-minute window shares the same time limit
- Dev token endpoint is open in development mode (localhost only)
