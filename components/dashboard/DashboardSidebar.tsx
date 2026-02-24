"use client";

import { useEffect, useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { RecommendationForm } from "@/components/recommendations/RecommendationForm";
import { AddRecommendationInput } from "@/lib/types";
import { Bookmark, PlusCircle } from "lucide-react";

interface DashboardSidebarProps {
    onAdd: (data: AddRecommendationInput) => Promise<void>;
    isSubmitting: boolean;
    staffPicks: Doc<"recommendations">[];
    activeTab: "shelf" | "add";
    role?: string;
}

export function DashboardSidebar({ onAdd, isSubmitting, staffPicks, activeTab, role }: DashboardSidebarProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isAdmin = mounted && role === "admin";



    return (
        <aside className="order-2 lg:order-1" suppressHydrationWarning>
            <div className="sticky top-24 space-y-4">
                {/* Role Status Badge */}
                <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[10px] font-bold uppercase tracking-wider ${isAdmin
                    ? "border-amber-500/20 bg-amber-500/5 text-amber-400"
                    : "border-white/5 bg-white/5 text-slate-500"
                    }`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${isAdmin ? "bg-amber-400 animate-pulse" : "bg-slate-600"}`} />
                    {isAdmin ? "Admin Access" : "Standard User"}
                </div>
                <section
                    aria-labelledby="add-rec-heading"
                    className={`rounded-2xl border border-white/5 bg-white/[0.03] p-6 ${activeTab === "shelf" ? "hidden lg:block" : ""}`}
                >
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20">
                            <PlusCircle className="h-4 w-4 text-indigo-400" aria-hidden="true" />
                        </div>
                        <h2 id="add-rec-heading" className="font-semibold text-white">Add a recommendation</h2>
                    </div>
                    <RecommendationForm onSubmit={onAdd} isSubmitting={isSubmitting} />
                </section>

                {/* Admin Staff Picks widget */}
                {role === "admin" && staffPicks.length > 0 && (
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                        <div className="mb-3 flex items-center gap-2">
                            <Bookmark className="h-4 w-4 text-amber-400" aria-hidden="true" />
                            <h3 className="text-sm font-semibold text-amber-300">Staff Picks</h3>
                        </div>
                        <ul className="space-y-2">
                            {staffPicks.map((r) => (
                                <li key={r._id} className="text-sm">
                                    <span className="font-medium text-white">{r.title}</span>
                                    <span className="text-slate-500"> · {r.userName}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </aside>
    );
}
