"use client";

import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Container } from "./Container";
import { BookMarked, Sparkles } from "lucide-react";

export function Navbar() {
    const { isSignedIn } = useUser();

    return (
        <header className="fixed top-0 left-0 right-0 z-50" suppressHydrationWarning>
            {/* Frosted glass bar */}
            <div className="border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <Container>
                    <div className="flex h-16 items-center justify-between">

                        {/* Logo */}
                        <Link
                            href="/"
                            className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
                            aria-label="HypeShelf home"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
                                <BookMarked className="h-4 w-4 text-white" aria-hidden="true" />
                            </div>
                            <span className="text-base font-bold tracking-tight text-white">
                                Hype<span className="text-indigo-400">Shelf</span>
                            </span>
                        </Link>

                        {/* Center nav pills */}
                        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
                            <Link
                                href="/#picks"
                                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                            >
                                Latest Picks
                            </Link>
                            <Link
                                href="/dashboard"
                                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                            >
                                Dashboard
                            </Link>
                        </nav>

                        {/* Right actions */}
                        <div className="flex items-center gap-3">
                            {isSignedIn ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:block"
                                    >
                                        My Shelf
                                    </Link>
                                    <UserButton afterSignOutUrl="/" />
                                </>
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-white/20">
                                        <Sparkles className="h-3.5 w-3.5 text-indigo-600" aria-hidden="true" />
                                        Sign in
                                    </button>
                                </SignInButton>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </header>
    );
}
