import { useState, useEffect } from "react";
import { Id, Doc } from "@/convex/_generated/dataModel";
import { Genre } from "@/lib/types";
import { FilterBar } from "@/components/recommendations/FilterBar";
import { RecommendationList } from "@/components/recommendations/RecommendationList";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 3;

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
    const [currentPage, setCurrentPage] = useState(1);


    const filtered =
        activeGenre === "all" ? recommendations : recommendations.filter((r) => r.genre === activeGenre);

    // Reset to first page when genre changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeGenre]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
    const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

    return (
        <section
            aria-label="Recommendations shelf"
            className={`order-1 lg:order-2 ${activeTab === "add" ? "hidden lg:block" : ""}`}
            suppressHydrationWarning
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
                recommendations={paginatedItems as never}
                currentUserId={currentUserId}
                role={role}
                onToggleStaffPick={onToggleStaffPick as never}
                onDelete={onDelete as never}
                isLoading={isLoading}
            />

            {/* Pagination Controls */}
            {!isLoading && filtered.length > ITEMS_PER_PAGE && (
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                    <p className="text-xs text-slate-500">
                        Showing <span className="font-medium text-slate-300">{startIndex + 1}</span> to{" "}
                        <span className="font-medium text-slate-300">
                            {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}
                        </span>{" "}
                        of <span className="font-medium text-slate-300">{filtered.length}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="flex h-9 items-center gap-2 rounded-xl bg-white/5 px-4 text-xs font-medium text-slate-400 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-slate-400"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span>Back</span>
                        </button>
                        <div className="flex h-9 min-w-[36px] items-center justify-center rounded-xl bg-white/5 px-3 text-xs font-medium text-slate-300">
                            {currentPage} / {totalPages}
                        </div>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="flex h-9 items-center gap-2 rounded-xl bg-white/5 px-4 text-xs font-medium text-slate-400 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-slate-400"
                            aria-label="Next page"
                        >
                            <span>Next</span>
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
