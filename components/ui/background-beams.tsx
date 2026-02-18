"use client";
import React from "react";
import { cn } from "@/lib/utils";

/**
 * Light-mode background texture: soft warm radial glow + subtle grain.
 * Mirrors the dark-mode version with colours tuned for the light palette.
 */
export const BackgroundBeamsLight = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute inset-0 z-0 overflow-hidden pointer-events-none",
                className
            )}
        >
            {/* Warm radial glow — softer tones for light bg */}
            <div
                className="absolute inset-0"
                style={{
                    background: [
                        "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(199,125,77,0.07) 0%, transparent 70%)",
                        "radial-gradient(ellipse 50% 40% at 70% 60%, rgba(160,82,45,0.05) 0%, transparent 70%)",
                        "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(217,182,140,0.06) 0%, transparent 60%)",
                    ].join(", "),
                }}
            />

            {/* Fine film grain — same technique, lower opacity for light */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "200px",
                }}
            />
        </div>
    );
};

/**
 * Dark-mode background texture: fine film grain overlay + warm radial glow.
 * Uses inline SVG feTurbulence for the grain (no external assets).
 */
export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute inset-0 z-0 overflow-hidden pointer-events-none",
                className
            )}
        >
            {/* Warm radial glow — gives depth without the blob circles */}
            <div
                className="absolute inset-0"
                style={{
                    background: [
                        "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(196,122,74,0.08) 0%, transparent 70%)",
                        "radial-gradient(ellipse 50% 40% at 70% 60%, rgba(166,98,58,0.06) 0%, transparent 70%)",
                        "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(212,151,106,0.05) 0%, transparent 60%)",
                    ].join(", "),
                }}
            />

            {/* Fine film grain — inline SVG feTurbulence */}
            <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "180px",
                }}
            />
        </div>
    );
};
