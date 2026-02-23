import { Recommendation } from "@/lib/types";
import { RecommendationCard } from "./RecommendationCard";
import { BookOpen } from "lucide-react";

interface RecommendationListProps {
    recommendations: Recommendation[];
    currentUserId?: string;
    role?: string;
    onToggleStaffPick?: (id: string) => void;
    onDelete?: (id: string) => void;
    isLoading?: boolean;
}

export function RecommendationList({
    recommendations,
    currentUserId,
    role,
    onToggleStaffPick,
    onDelete,
    isLoading = false,
}: RecommendationListProps) {
    if (isLoading) {
        return (
            <div className="space-y-3" aria-busy="true" aria-label="Loading recommendations">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-36 animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]"
                    />
                ))}
            </div>
        );
    }

    if (recommendations.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03]">
                    <BookOpen className="h-7 w-7 text-slate-600" aria-hidden="true" />
                </div>
                <p className="text-sm font-medium text-slate-400">No recommendations yet.</p>
                <p className="text-xs text-slate-600">Be the first to add one!</p>
            </div>
        );
    }

    return (
        <ul className="space-y-3" aria-label="Recommendations list">
            {recommendations.map((rec) => (
                <li key={rec._id}>
                    <RecommendationCard
                        recommendation={rec}
                        currentUserId={currentUserId}
                        role={role}
                        onToggleStaffPick={onToggleStaffPick}
                        onDelete={onDelete}
                    />
                </li>
            ))}
        </ul>
    );
}
