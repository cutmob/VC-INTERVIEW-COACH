"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function SideDecor() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const currentTheme = resolvedTheme || theme;
    const isDark = currentTheme === "dark";

    return (
        <div className="pointer-events-none fixed left-0 top-0 z-0 h-full w-[400px] overflow-hidden">
            <TechWires isDark={isDark} />

            {/* Fade mask to blend into content */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: "linear-gradient(90deg, transparent 0%, var(--background) 100%)",
                    maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)"
                }}
            />
        </div>
    );
}


function TechWires({ isDark }: { isDark: boolean }) {
    // Circuit/Tech lines - orthogonal and sharp
    const paths = [
        "M0,50 L60,50 L60,100 L140,100 L140,140 L220,140",
        "M0,250 L40,250 L40,220 L120,220 L120,180 L180,180",
        "M0,450 L80,450 L80,500 L160,500 L160,550 L240,550",
        "M0,700 L50,700 L50,650 L140,650 L140,620 L200,620",
        "M0,900 L70,900 L70,950 L150,950 L150,980 L230,980",
        // Data streams (straight shots)
        "M0,150 L250,150",
        "M0,350 L200,350",
        "M0,600 L220,600",
        "M0,800 L240,800",
    ];

    const gradId = isDark ? "tech-grad-dark" : "tech-grad-light";

    return (
        <svg className={`h-full w-full ${isDark ? "opacity-40" : "opacity-25"}`} preserveAspectRatio="xMinYMin slice" viewBox="0 0 400 1000">
            <defs>
                {isDark ? (
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A47E5B" />
                        <stop offset="100%" stopColor="#E8A87C" />
                    </linearGradient>
                ) : (
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C77D4D" />
                        <stop offset="100%" stopColor="#D9B68C" />
                    </linearGradient>
                )}
            </defs>

            {paths.map((d, i) => (
                <motion.path
                    key={i}
                    d={d}
                    fill="none"
                    stroke={i > 4 ? `url(#${gradId})` : "currentColor"}
                    strokeWidth={i > 4 ? 1 : 1.5}
                    strokeDasharray={i > 4 ? "2 4" : "none"}
                    className={i > 4 ? "text-transparent" : isDark ? "text-wood-600/30" : "text-wood-400/40"}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                            duration: 1.5 + Math.random(),
                            delay: i * 0.1,
                            ease: "circOut"
                        }
                    }}
                />
            ))}

            {/* Pulse signals traveling down wires */}
            {[150, 350, 600, 800].map((y, i) => (
                <motion.rect
                    key={`pulse-${i}`}
                    width="12"
                    height="2"
                    fill={`url(#${gradId})`}
                    initial={{ x: 0, y: y - 1, opacity: 0 }}
                    animate={{
                        x: [0, 250],
                        opacity: [0, 1, 0, 0],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "linear",
                        repeatDelay: Math.random() * 2
                    }}
                />
            ))}
        </svg>
    );
}
