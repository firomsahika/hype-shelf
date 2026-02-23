"use client";

import { Genre, GENRES } from "@/lib/types";
import { capitalize } from "@/lib/utils";

interface FilterBarProps {
    activeGenre: Genre | "all";
    onFilterChange: (genre: Genre | "all") => void;
}

export function FilterBar({ activeGenre, onFilterChange }: FilterBarProps) {
    const filters: (Genre | "all")[] = ["all", ...GENRES];

    return (
        <div
            className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
            role="group"
            aria-label="Filter by genre"
        >
            {filters.map((genre) => {
                const isActive = activeGenre === genre;
                return (
                    <button
                        key={genre}
                        onClick={() => onFilterChange(genre)}
                        aria-pressed={isActive}
                        className={`shrink-0 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all ${isActive
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                : "bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300"
                            }`}
                    >
                        {genre === "all" ? "All" : capitalize(genre)}
                    </button>
                );
            })}
        </div>
    );
}
