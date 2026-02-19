"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return (
            <div className="relative z-[9999] ml-0 sm:ml-2 h-7 w-7 sm:h-9 sm:w-9">
                <button className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center bg-transparent cursor-default border-none opacity-100" aria-hidden="true">
                    <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-wood-900 fill-wood-900" />
                </button>
            </div>
        )
    }

    const isDark = resolvedTheme === "dark"

    function toggle() {
        setTheme(isDark ? "light" : "dark")
    }

    return (
        <div
            className="relative z-[9999] ml-0 sm:ml-2"
            style={{ isolation: "isolate" }}
        >
            <button
                type="button"
                onClick={toggle}
                className={`relative flex h-7 w-7 sm:h-9 sm:w-9 cursor-pointer items-center justify-center bg-transparent border-none transition-all duration-300 hover:opacity-70 ${isDark
                    ? "text-zinc-400"
                    : "text-wood-900"
                    }`}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {isDark ? (
                    <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.5} />
                ) : (
                    <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
                )}
            </button>
        </div>
    )
}
