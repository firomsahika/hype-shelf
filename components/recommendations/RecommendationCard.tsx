"use client";

import { RecommendationDisplay, Genre } from "../../lib/types"
import { StaffPickBadge } from "./StaffPickBadge";
import { ExternalLink, Trash2, Star } from "lucide-react";
import { capitalize } from "@/lib/utils";

const genreColors: Record<Genre, string> = {
    horror: "bg-red-500/15 text-red-400 ring-red-500/20",
    action: "bg-yellow-500/15 text-yellow-400 ring-yellow-500/20",
    comedy: "bg-green-500/15 text-green-400 ring-green-500/20",
    drama: "bg-indigo-500/15 text-indigo-400 ring-indigo-500/20",
    "sci-fi": "bg-cyan-500/15 text-cyan-400 ring-cyan-500/20",
    thriller: "bg-orange-500/15 text-orange-400 ring-orange-500/20",
    romance: "bg-pink-500/15 text-pink-400 ring-pink-500/20",
    documentary: "bg-slate-500/15 text-slate-400 ring-slate-500/20",
    animation: "bg-violet-500/15 text-violet-400 ring-violet-500/20",
    other: "bg-slate-500/15 text-slate-400 ring-slate-500/20",
};

interface RecommendationCardProps {
    recommendation: RecommendationDisplay;
    currentUserId?: string;
    role?: string;
    /**
     * Admin-only: toggles Staff Pick. Real authorization enforced in Convex mutation.
     */
    onToggleStaffPick?: (id: string) => void;
    /**
     * Delete rec. Real authorization enforced in Convex mutation.
     * Admins can delete any; users can only delete their own.
     */
    onDelete?: (id: string) => void;
}

export function RecommendationCard({
    recommendation,
    currentUserId,
    role,
    onToggleStaffPick,
    onDelete,
}: RecommendationCardProps) {
    const isAdmin = role === "admin";
    // NOTE: frontend visibility is UX-only. Actual authorization is enforced in Convex mutations.
    const canDelete = isAdmin || recommendation.userId === currentUserId;

    return (
        <article className="group min-w-0 rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-all hover:border-white/10 hover:bg-white/[0.05]">
            <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
                {/* Title + Staff Pick */}
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <h3 className="min-w-0 break-words text-base font-semibold text-white">{recommendation.title}</h3>
                    {recommendation.isStaffPick && <StaffPickBadge />}
                </div>

                {/* Genre badge */}
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${genreColors[recommendation.genre]}`}
                >
                    {capitalize(recommendation.genre)}
                </span>
            </div>

            {/* Blurb */}
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {recommendation.blurb}
            </p>

            {/* Footer row */}
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/5 pt-4">
                <span className="flex-1 text-xs text-slate-600">
                    Added by{" "}
                    <span className="font-medium text-slate-400">{recommendation.userName}</span>
                </span>

                {recommendation.link && (
                    <a
                        href={recommendation.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-indigo-400 transition-colors hover:text-indigo-300"
                        aria-label={`Open ${recommendation.title} link`}
                    >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        View
                    </a>
                )}

                {/* Admin: toggle staff pick */}
                {isAdmin && (
                    <button
                        onClick={() => onToggleStaffPick?.(recommendation._id)}
                        className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-amber-500/10 hover:text-amber-400"
                        aria-label={recommendation.isStaffPick ? "Remove Staff Pick" : "Mark as Staff Pick"}
                        title={recommendation.isStaffPick ? "Remove Staff Pick" : "Mark as Staff Pick"}
                    >
                        <Star
                            className={`h-4 w-4 ${recommendation.isStaffPick ? "fill-amber-400 text-amber-400" : ""}`}
                            aria-hidden="true"
                        />
                    </button>
                )}

                {/* Delete button */}
                {canDelete && (
                    <button
                        onClick={() => onDelete?.(recommendation._id)}
                        className="rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
                        aria-label={`Delete ${recommendation.title}`}
                    >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                )}
            </div>
        </article>
    );
}
