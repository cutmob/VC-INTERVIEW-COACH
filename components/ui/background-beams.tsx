"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none",
                className
            )}
        >
            <div
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(255,255,255,0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
                }}
                className="absolute inset-0 z-0 h-full w-full opacity-[0.4]"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute -left-40 -top-40 h-full w-full [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
            >
                {/* Beams */}
                <div className="absolute inset-x-0 -bottom-40 h-[100%] bg-gradient-to-t from-amber-700/20 via-orange-800/5 to-transparent blur-3xl" />
                <div className="absolute -left-20 -top-20 h-[600px] w-[600px] rounded-full bg-amber-600/20 blur-[100px]" />
                <div className="absolute -right-20 -top-20 h-[600px] w-[600px] rounded-full bg-orange-700/20 blur-[100px]" />
            </motion.div>
        </div>
    );
};
