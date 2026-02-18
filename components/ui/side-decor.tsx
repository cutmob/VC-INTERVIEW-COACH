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
            {isDark ? <TechWires /> : <OrganicVines />}

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

function OrganicVines() {
    // Organic, curved paths
    const paths = [
        "M0,100 C60,90 100,140 140,180 C180,220 160,280 200,320",
        "M0,350 C50,340 100,370 140,400 C180,430 150,480 190,510",
        "M0,600 C70,590 120,630 170,660 C210,690 180,750 220,780",
        "M0,850 C60,840 110,880 160,910 C200,940 170,980 210,1000",
        // Secondary weaving vines
        "M0,200 C40,220 80,190 120,220 C160,250 140,290 180,310",
        "M0,450 C50,470 90,440 130,470 C170,500 150,540 190,560",
        "M0,700 C40,720 80,690 120,720 C160,750 140,790 180,810",
    ];

    return (
        <svg className="h-full w-full opacity-30" preserveAspectRatio="xMinYMin slice" viewBox="0 0 400 1000">
            {paths.map((d, i) => (
                <motion.path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5 + (i % 2)}
                    strokeLinecap="round"
                    className="text-wood-600 dark:text-wood-500"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: 1,
                        opacity: [0, 1, 0.8],
                        transition: {
                            duration: 4 + Math.random() * 2,
                            delay: i * 0.3,
                            ease: [0.4, 0, 0.2, 1] // Organic easing
                        }
                    }}
                />
            ))}
            {/* Subtle floating leaves/particles */}
            {[...Array(6)].map((_, i) => (
                <motion.circle
                    key={`leaf-${i}`}
                    r={2 + Math.random()}
                    className="text-wood-500/60"
                    initial={{ x: 50, y: 100 + i * 150, opacity: 0 }}
                    animate={{
                        x: [50, 80 + Math.random() * 40],
                        y: [100 + i * 150, 90 + i * 150],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: i * 0.5,
                    }}
                />
            ))}
        </svg>
    );
}

function TechWires() {
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

    return (
        <svg className="h-full w-full opacity-40" preserveAspectRatio="xMinYMin slice" viewBox="0 0 400 1000">
            <defs>
                <linearGradient id="tech-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A47E5B" /> {/* Wood-500-ish */}
                    <stop offset="100%" stopColor="#E8A87C" /> {/* Copper/Amber */}
                </linearGradient>
            </defs>

            {paths.map((d, i) => (
                <motion.path
                    key={i}
                    d={d}
                    fill="none"
                    stroke={i > 4 ? "url(#tech-grad)" : "currentColor"}
                    strokeWidth={i > 4 ? 1 : 1.5}
                    strokeDasharray={i > 4 ? "2 4" : "none"} // "Dotted" data streams
                    className={i > 4 ? "text-transparent" : "text-wood-600/30"} // Base lines are dark
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
                    fill="url(#tech-grad)"
                    initial={{ x: 0, y: y - 1, opacity: 0 }}
                    animate={{
                        x: [0, 250],
                        opacity: [0, 1, 0, 0], // Flash effect
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
