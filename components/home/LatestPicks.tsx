"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RecommendationList } from "@/components/recommendations/RecommendationList";
import { TrendingUp, Star } from "lucide-react";

/**
 * Renders the latest public picks from Convex.
 * This query is unauthenticated — anyone can see the latest 5 recs.
 */
export function LatestPicks() {
    // Live Convex query — automatically re-renders when data changes
    const recommendations = useQuery(api.recommendations.getLatest);

    return (
        <section id="picks" className="py-20" aria-labelledby="picks-heading">
            <div className="mx-auto max-w-2xl px-4 sm:px-6">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-indigo-400" aria-hidden="true" />
                            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Trending now</span>
                        </div>
                        <h2 id="picks-heading" className="text-2xl font-bold text-white">Latest picks</h2>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                        <Star className="h-3 w-3 fill-amber-400" aria-hidden="true" />
                        Staff Picks Active
                    </div>
                </div>
                <RecommendationList
                    recommendations={recommendations ?? []}
                    isLoading={recommendations === undefined}
                />
            </div>
        </section>
    );
}
