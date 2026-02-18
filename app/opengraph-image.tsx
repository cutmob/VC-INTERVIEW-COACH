import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Vantive - Realtime AI Pitch Coach';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    // Brand Colors
    const colors = {
        background: '#0A0A0F', // Dark Charcoal
        text: '#E8E0D8',       // Warm Off-White
        accentLight: '#D4976A', // Copper Light
        accentMid: '#C47A4A',   // Copper Mid
        accentDark: '#A6623A',  // Copper Dark
        woodDeep: '#5D4037',    // Wood Deep
    };

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.background,
                    fontFamily: 'sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Abstract Background Glows */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-25%',
                        left: '-10%',
                        width: '800px',
                        height: '800px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle at center, ${colors.accentLight}15, transparent 70%)`,
                        filter: 'blur(80px)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-25%',
                        right: '-10%',
                        width: '900px',
                        height: '900px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle at center, ${colors.accentMid}10, transparent 70%)`,
                        filter: 'blur(100px)',
                    }}
                />

                {/* Technical Grid / Network Lines (SVG) */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
                    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 60 0 L 0 0 0 60" fill="none" stroke={colors.accentLight} strokeWidth="0.5" opacity="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        {/* Random nodes/connections for "network/AI" feel */}
                        <circle cx="100" cy="100" r="2" fill={colors.accentLight} />
                        <circle cx="1100" cy="500" r="2" fill={colors.accentLight} />
                        <circle cx="600" cy="315" r="3" fill={colors.accentLight} />
                        <line x1="100" y1="100" x2="600" y2="315" stroke={colors.accentLight} strokeWidth="1" strokeOpacity="0.1" />
                        <line x1="600" y1="315" x2="1100" y2="500" stroke={colors.accentLight} strokeWidth="1" strokeOpacity="0.1" />
                    </svg>
                </div>

                {/* Main Content Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        padding: '40px',
                        border: `1px solid ${colors.accentLight}33`, // Low opacity border
                        borderRadius: '24px',
                        background: 'rgba(10, 10, 15, 0.6)', // Semi-transparent bg for readability
                        backdropFilter: 'blur(4px)',
                        boxShadow: `0 0 40px ${colors.accentDark}22`,
                    }}
                >
                    {/* Logo Icon (Matching the geometric V polygon) */}
                    <div style={{ display: 'flex', marginBottom: '24px' }}>
                        <svg width="64" height="64" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="256" cy="256" r="256" fill={colors.accentLight} />
                            <polygon points="116,130 256,450 396,130 320,130 256,300 192,130" fill={colors.background} />
                        </svg>
                    </div>

                    <h1
                        style={{
                            fontSize: '80px',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            margin: 0,
                            color: colors.text,
                            textAlign: 'center',
                            lineHeight: 1,
                        }}
                    >
                        Vantive
                    </h1>

                    <div
                        style={{
                            marginTop: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        <div style={{ width: '40px', height: '1px', background: colors.accentMid }}></div>
                        <p
                            style={{
                                fontSize: '28px',
                                margin: 0,
                                color: colors.accentLight,
                                fontWeight: 500,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                fontFamily: 'monospace', // Tech feel
                            }}
                        >
                            Realtime AI Pitch Coach
                        </p>
                        <div style={{ width: '40px', height: '1px', background: colors.accentMid }}></div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
