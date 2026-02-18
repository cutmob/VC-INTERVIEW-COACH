"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

interface Section {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface LegalLayoutProps {
    title: string;
    subtitle: string;
    sections: Section[];
}

export function LegalLayout({ title, subtitle, sections }: LegalLayoutProps) {
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0% -35% 0%" }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Offset for header
                behavior: "smooth",
            });
            setActiveSection(id);
        }
    };

    return (
        <SiteShell>
            <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 sm:gap-12 py-8 sm:py-12 lg:flex-row lg:gap-24">

                {/* Sidebar Navigation (Sticky) */}
                <aside className="static top-32 flex-shrink-0 lg:sticky lg:h-[calc(100vh-8rem)] lg:w-64">
                    <div className="mb-6 sm:mb-8">
                        <h1 className="heading-display text-2xl sm:text-3xl font-bold text-wood-900 dark:text-wood-900">
                            {title}
                        </h1>
                        <p className="mt-2 text-sm text-wood-600 dark:text-wood-600">
                            {subtitle}
                        </p>
                    </div>

                    <nav className="hidden space-y-1 border-l-2 border-wood-200 pl-4 lg:block dark:border-white/10">
                        {sections.map(({ id, title }) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className={cn(
                                    "block w-full text-left text-sm font-medium transition-colors duration-200 hover:text-wood-900 dark:hover:text-wood-300",
                                    activeSection === id
                                        ? "text-wood-900 font-bold dark:text-wood-300 -ml-[18px] border-l-2 border-wood-600 pl-4 dark:border-wood-400"
                                        : "text-wood-500 dark:text-wood-600"
                                )}
                            >
                                {title}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Dropdown / List (Simple for now, just stack) */}
                    <div className="flex flex-wrap gap-2 lg:hidden">
                        {sections.map(({ id, title }) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className={cn(
                                    "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                                    activeSection === id
                                        ? "bg-wood-400/20 text-wood-900 dark:bg-wood-400/10 dark:text-wood-300"
                                        : "text-wood-500 hover:text-wood-700 dark:text-wood-600 dark:hover:text-wood-400"
                                )}
                            >
                                {title}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 space-y-16">
                    {sections.map(({ id, title, content }) => (
                        <section key={id} id={id} className="scroll-mt-32">
                            <h2 className="heading-sans mb-4 text-xl font-bold text-wood-900 dark:text-wood-900">
                                {title}
                            </h2>
                            <div className="prose prose-wood dark:prose-invert max-w-none text-wood-700 dark:text-white/90">
                                {content}
                            </div>
                        </section>
                    ))}

                    {/* Section for OpenAI Link hardcoded as it's common */}
                    <section id="openai-policies" className="scroll-mt-32 border-t border-wood-200 pt-8 dark:border-white/10">
                        <h2 className="heading-sans mb-4 text-xl font-bold text-wood-900 dark:text-wood-900">
                            Third-Party AI Policies
                        </h2>
                        <div className="text-wood-700 dark:text-white/90">
                            <p>
                                Vantive utilizes OpenAI&apos;s API for its core functionality. We do not control their data processing policies, but we select enterprise-grade endpoints that do not train on your data by default. We encourage you to review their policies directly.
                            </p>
                            <div className="mt-4">
                                <a
                                    href="https://openai.com/policies"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-wood-600 hover:text-wood-900 hover:underline dark:text-wood-500 dark:hover:text-wood-300"
                                >
                                    Read OpenAI Terms & Policies &rarr;
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </SiteShell>
    );
}
