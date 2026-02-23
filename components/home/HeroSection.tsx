"use client";

import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Sparkles, ArrowRight } from "lucide-react";
import { BookMarked } from "lucide-react";

const STATS = [
    { value: "100%", label: "Curated by humans" },
    { value: "Real-time", label: "Powered by Convex" },
    { value: "RBAC", label: "Role-based security" },
];

export function HeroSection() {
    const { isSignedIn } = useUser();

    return (
        <section className="relative overflow-hidden pt-32 pb-24">
            {/* Background glows */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
                <div className="absolute top-60 -right-20 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[100px]" />
            </div>
            {/* Dot grid */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

            <div className="relative mx-auto max-w-2xl px-4 text-center">
                {/* Logo */}
                <div className="mb-8 flex items-center justify-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
                        <BookMarked className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-2xl font-bold text-white">Hype<span className="text-indigo-400">Shelf</span></span>
                </div>
                {/* Badge */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Your crew&apos;s taste, in one place
                </div>
                {/* Heading */}
                <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
                    Collect and share the stuff{" "}
                    <span className="gradient-text">you&apos;re hyped about.</span>
                </h1>
                <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-slate-400">
                    HypeShelf is the shared movie shelf for you and your friends. No noise, no algorithms — just honest picks from people you trust.
                </p>
                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {isSignedIn ? (
                        <Link href="/dashboard" className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:bg-indigo-500">
                            Go to your shelf
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                    ) : (
                        <>
                            <SignInButton mode="modal">
                                <button className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:bg-indigo-500">
                                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                                    Sign in to add yours
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </button>
                            </SignInButton>
                            <a href="#picks" className="rounded-xl border border-white/10 px-6 py-3.5 text-base font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white">
                                Browse picks
                            </a>
                        </>
                    )}
                </div>
                {/* Stats */}
                <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-white/5 pt-10">
                    {STATS.map((s) => (
                        <div key={s.label} className="text-center">
                            <p className="text-2xl font-bold text-white">{s.value}</p>
                            <p className="text-xs text-slate-500">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
