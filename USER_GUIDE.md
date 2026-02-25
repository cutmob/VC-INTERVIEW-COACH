# PitchCoach User Guide

Welcome! This guide will help you use PitchCoach to practice your startup pitch with an AI VC coach.

## What is PitchCoach?

PitchCoach simulates a real venture capital partner interrogation. You'll have 7 minutes to pitch your startup while an AI coach:
- Interrupts when you're vague
- Challenges weak claims
- Asks tough follow-up questions
- Exposes holes in your pitch

Think of it as a practice round before facing real investors.

## Getting Started

### Step 1: Get a Session Token

**Option A: Free Dev Mode (Local Setup)**

If you're running this locally:

1. Open your browser console (F12)
2. Run this command:
```javascript
fetch('/api/dev-token', { method: 'POST' })
  .then(r => r.json())
  .then(d => console.log('Your token:', d.token))
```
3. Copy the token (format: `PCH-XXXX-XXXX`)

**Option B: Purchase a Session**

If payments are enabled:

1. Go to `/pricing`
2. Click "Start Session"
3. Complete payment with Stripe
4. Copy your token from the success page

### Step 2: Start Your Session

1. Go to `/session`
2. Paste your token in the input field
3. Click "Start Session"
4. Allow microphone access when prompted

### Step 3: Pitch Your Startup

The AI coach will open with:
> "Go ahead. You have 60 seconds to tell me what you're building and why it matters. Clock starts now."

Start pitching immediately. You have 7 minutes total.

## Tips for a Good Session

### What the AI Looks For

The AI evaluates your pitch on:

1. **Problem Clarity**: Is the problem real, urgent, and specific?
2. **Contrarian Insight**: What do you know that others don't?
3. **Founder-Market Fit**: Why are YOU the right person for this?
4. **Market Size**: Is the TAM massive? Why now?
5. **Traction**: Real numbers, not vague claims
6. **Differentiation**: What's your moat?
7. **Business Model**: How do you make money?
8. **Go-to-Market**: Specific acquisition strategy

### How to Respond

**Good responses:**
- "Our MRR is $18k, up from $5k three months ago"
- "I spent 5 years at Google working on this exact problem"
- "We have 3 signed LOIs worth $500k total"

**Bad responses:**
- "We're growing really fast"
- "It's going well"
- "We have no competitors" (red flag!)
- "We're working on it"

### When the AI Interrupts

The AI will interrupt if you:
- Speak for more than 12 seconds without answering the question
- Use vague language without specifics
- Pivot to a different topic
- Make red-flag statements
- Deflect or get defensive

**When interrupted:**
- Stop talking immediately
- Listen to the question
- Answer directly with specifics
- Don't get defensive

## Session Features

### Voice Selection

Choose between:
- **Male voice** (Cedar) - Default
- **Female voice** (Marin)

Select before starting your session.

### Time Limit

You have exactly **7 minutes** total. The timer starts when the AI begins speaking.

### Reconnection

If you get disconnected:
- You can reconnect with the same token
- Your remaining time continues from where you left off
- The session expires after 7 minutes total

### Upload Pitch Materials

During the session, you can upload:
- Pitch deck slides (PNG, JPEG)
- Product screenshots
- Charts and graphs

**Limits:**
- Max 4MB per file
- PNG and JPEG only
- The AI can see and reference your uploads

## Common Questions

### Q: Can I pause the session?
**A:** No. The 7-minute timer runs continuously. This simulates a real VC meeting.

### Q: Can I restart if I mess up?
**A:** Each token is single-use. Generate a new dev token or purchase another session.

### Q: What if I run out of time?
**A:** The session ends automatically after 7 minutes. Plan your pitch accordingly.

### Q: Can I practice multiple times?
**A:** In dev mode, generate unlimited tokens. In production, each session requires payment.

### Q: Does the AI remember previous sessions?
**A:** No. Each session is completely independent and ephemeral.

### Q: What happens to my data?
**A:** Sessions are processed by OpenAI's API. No recordings are stored. See the privacy policy for details.

## Troubleshooting

### "Token unavailable" error
- Your token may be expired or already used
- Generate a new token via `/api/dev-token`
- Or purchase a new session

### Microphone not working
- Check browser permissions (click the lock icon in address bar)
- Ensure microphone is not being used by another app
- Try refreshing the page and starting again

### "Unable to create realtime session"
- Check your internet connection
- Verify OpenAI API is accessible
- Try again in a few moments

### Audio cutting out
- Check your internet connection
- Close other bandwidth-heavy applications
- Try using a wired connection instead of WiFi

### AI not responding
- Ensure you're speaking clearly
- Check that your microphone is working
- The AI may be processing - wait a moment

## Best Practices

### Before Your Session

1. **Prepare your pitch**: Know your numbers
2. **Have materials ready**: Deck, metrics, LOIs
3. **Test your microphone**: Make sure it works
4. **Find a quiet space**: Minimize background noise
5. **Set a timer**: Practice staying under 7 minutes

### During Your Session

1. **Start strong**: 60-second overview
2. **Be specific**: Numbers, not adjectives
3. **Stay calm**: Don't get defensive when challenged
4. **Answer directly**: Don't dodge questions
5. **Watch the clock**: Pace yourself

### After Your Session

1. **Take notes**: What questions stumped you?
2. **Fill the gaps**: Research what you didn't know
3. **Practice again**: Iterate on your pitch
4. **Get real feedback**: Try with human investors

## What to Expect

### The AI's Style

The AI coach is:
- **Direct**: No sugar-coating
- **Skeptical**: Assumes you're wrong until proven right
- **Impatient**: Won't tolerate vague answers
- **Relentless**: Keeps pushing on weak points

This is intentional. Real VCs are tough. Better to face it here first.

### Common Challenges

Most founders struggle with:
- **Vague metrics**: "Growing fast" vs "$18k MRR"
- **No moat**: "We'll just move faster" isn't a moat
- **Weak founder-market fit**: Why YOU for THIS problem?
- **Unrealistic projections**: Hockey sticks without justification
- **Ignoring competition**: "No competitors" is a red flag

### Success Indicators

You're doing well if:
- You answer with specific numbers
- You admit what you don't know
- You stay calm under pressure
- You can defend your assumptions
- You finish within 7 minutes

## Technical Details

### Browser Compatibility

Works best on:
- Chrome (recommended)
- Edge
- Safari (may have audio issues)
- Firefox (may have audio issues)

### System Requirements

- Modern browser with WebRTC support
- Working microphone
- Stable internet connection (1+ Mbps)
- JavaScript enabled

### Privacy & Data

- Sessions are processed via OpenAI's Realtime API
- No recordings are stored on our servers
- Audio is transmitted in real-time only
- Tokens are deleted after use or expiration

## Getting Help

### Issues with the App

- Check the browser console for errors (F12)
- Try a different browser
- Clear cache and cookies
- Restart your browser

### Questions About Usage

- Re-read this guide
- Check the FAQ section above
- Open an issue on GitHub

### Commercial Licensing

- Email: support@driftrail.com
- For proprietary use without AGPL requirements

## Next Steps

Ready to practice? Here's your checklist:

- [ ] Get a session token
- [ ] Test your microphone
- [ ] Prepare your pitch (numbers ready!)
- [ ] Find a quiet space
- [ ] Go to `/session` and start
- [ ] Take notes on what to improve
- [ ] Practice again!

Good luck with your pitch! 🚀
