"use client";

import { Id, Doc } from "@/convex/_generated/dataModel";
import { Genre } from "@/lib/types";
import { FilterBar } from "@/components/recommendations/FilterBar";
import { RecommendationList } from "@/components/recommendations/RecommendationList";

interface ShelfSectionProps {
    recommendations: Doc<"recommendations">[];
    activeGenre: Genre | "all";
    onFilterChange: (genre: Genre | "all") => void;
    currentUserId?: string;
    role?: string;
    onToggleStaffPick: (id: Id<"recommendations">) => void;
    onDelete: (id: Id<"recommendations">) => void;
    activeTab: "shelf" | "add";
    isLoading: boolean;
}

export function ShelfSection({
    recommendations,
    activeGenre,
    onFilterChange,
    currentUserId,
    role,
    onToggleStaffPick,
    onDelete,
    activeTab,
    isLoading,
}: ShelfSectionProps) {
    const filtered =
        activeGenre === "all" ? recommendations : recommendations.filter((r) => r.genre === activeGenre);

    return (
        <section
            aria-label="Recommendations shelf"
            className={`order-1 lg:order-2 ${activeTab === "add" ? "hidden lg:block" : ""}`}
        >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-white">
                    The shelf{" "}
                    <span className="ml-1 text-xs font-normal text-slate-500">({filtered.length})</span>
                </h2>
            </div>
            <div className="mb-5">
                <FilterBar activeGenre={activeGenre} onFilterChange={onFilterChange} />
            </div>
            <RecommendationList
                recommendations={filtered as never}
                currentUserId={currentUserId}
                role={role}
                onToggleStaffPick={onToggleStaffPick as never}
                onDelete={onDelete as never}
                isLoading={isLoading}
            />
        </section>
    );
}
