import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'PitchCoach | Venture Capital Interview Coach';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          background: '#0A0A0F',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ── Warm copper glow — top left ── */}
        <div style={{
          position: 'absolute',
          top: -300, left: -200,
          width: 900, height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,151,106,0.13) 0%, transparent 60%)',
          display: 'flex',
        }} />

        {/* ── Warm copper glow — bottom right ── */}
        <div style={{
          position: 'absolute',
          bottom: -350, right: -150,
          width: 1000, height: 1000,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,122,74,0.10) 0%, transparent 60%)',
          display: 'flex',
        }} />

        {/* ── Dot grid ── */}
        <svg
          style={{ position: 'absolute', inset: 0, opacity: 0.18 }}
          width="1200" height="630"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#D4976A" />
            </pattern>
          </defs>
          <rect width="1200" height="630" fill="url(#dots)" />
        </svg>

        {/* ── Horizontal rule across middle ── */}
        <div style={{
          position: 'absolute',
          top: 315, left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(212,151,106,0.12) 20%, rgba(212,151,106,0.12) 80%, transparent 100%)',
          display: 'flex',
        }} />

        {/* ══════════════════════════════════════
            MAIN CONTENT — padded container
        ══════════════════════════════════════ */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
        }}>

          {/* ── TOP ROW: logo mark + wordmark ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {/* V logo */}
            <svg width="44" height="44" viewBox="0 0 512 512">
              <circle cx="256" cy="256" r="256" fill="#D4976A" />
              <polygon points="116,130 256,450 396,130 320,130 256,300 192,130" fill="#0A0A0F" />
            </svg>
            <span style={{
              fontSize: 26,
              fontWeight: 700,
              color: '#F0EBE6',
              letterSpacing: '-0.02em',
            }}>
              PitchCoach
            </span>
            {/* separator */}
            <div style={{
              width: 1, height: 22,
              background: 'rgba(212,151,106,0.3)',
              marginLeft: 4,
              display: 'flex',
            }} />
            <span style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#9B918A',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              Venture Capital Interview Coach

            </span>
          </div>

          {/* ── MIDDLE: hero copy ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              <span style={{
                fontSize: 82,
                fontWeight: 800,
                color: '#F0EBE6',
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                display: 'flex',
              }}>
                Your pitch has holes.
              </span>
              <span style={{
                fontSize: 82,
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                display: 'flex',
                // copper gradient via SVG trick
                color: '#D4976A',
              }}>
                Find them first.
              </span>
            </div>

            <p style={{
              fontSize: 22,
              color: '#9B918A',
              lineHeight: 1.5,
              maxWidth: 680,
              margin: 0,
              display: 'flex',
            }}>
              7 minutes. No warm-up. A VC-style AI that interrupts, challenges, and exposes every weak spot — before a real investor does.
            </p>
          </div>

          {/* ── BOTTOM ROW: empty spacer to maintain padding balance ── */}
          <div style={{ display: 'flex' }} />

        </div>

        {/* ── Copper accent bar — left edge ── */}
        <div style={{
          position: 'absolute',
          left: 0, top: 80, bottom: 80,
          width: 3,
          background: 'linear-gradient(to bottom, transparent, #C47A4A, transparent)',
          borderRadius: 2,
          display: 'flex',
        }} />

      </div>
    ),
    { ...size }
  );
}
