"use client";

import { useState, useEffect } from 'react'
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Container } from "@/components/layout/Container";
import { LayoutGrid, TrendingUp } from "lucide-react";

interface DashboardHeaderProps {
    totalCount: number;
    staffPickCount: number;
}

export function DashboardHeader({ totalCount, staffPickCount }: DashboardHeaderProps) {
    const { user, isLoaded } = useUser();
    // Secure role from verified Convex JWT — cannot be forged by the client
    const role = useQuery(api.users.getMyRole);
    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !isLoaded) return null; // Or a skeleton loader

    return (
        <div className="border-b border-white/5 bg-gradient-to-r from-indigo-950/50 via-slate-900/80 to-violet-950/50 py-8"  suppressHydrationWarning>
            <Container>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
                            Welcome back&nbsp;👋
                        </p>
                        <h1 className="text-2xl font-bold text-white">
                            {user?.firstName ? `${user.firstName}'s Shelf` : "My Shelf"}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 py-2">
                            <LayoutGrid className="h-4 w-4 text-slate-400" aria-hidden="true" />
                            <span className="text-sm font-semibold text-white">{totalCount}</span>
                            <span className="text-xs text-slate-500">total</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 py-2">
                            <TrendingUp className="h-4 w-4 text-indigo-400" aria-hidden="true" />
                            <span className="text-sm font-semibold text-white">{staffPickCount}</span>
                            <span className="text-xs text-slate-500">staff picks</span>
                        </div>
                        {role === "admin" && (
                            <div className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-2">
                                <span className="text-xs font-semibold text-indigo-400">Admin</span>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
