"use client";

import { SignInButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

export function JoinBanner() {
    return (
        <section className="pb-24">
            <div className="mx-auto max-w-2xl px-4 sm:px-6">
                <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 p-10 text-center">
                    <h3 className="mb-2 text-xl font-bold text-white">Got something hyped?</h3>
                    <p className="mb-6 text-sm text-slate-400">Join your friends and add your picks to the shelf.</p>
                    <SignInButton mode="modal">
                        <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-500">
                            <Sparkles className="h-4 w-4" aria-hidden="true" />
                            Sign in to add yours
                        </button>
                    </SignInButton>
                </div>
            </div>
        </section>
    );
}
