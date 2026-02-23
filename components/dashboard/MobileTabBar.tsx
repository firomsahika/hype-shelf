"use client";

import { LayoutGrid, PlusCircle } from "lucide-react";

interface MobileTabBarProps {
    activeTab: "shelf" | "add";
    onTabChange: (tab: "shelf" | "add") => void;
}

export function MobileTabBar({ activeTab, onTabChange }: MobileTabBarProps) {
    return (
        <div className="mb-6 flex rounded-xl border border-white/5 bg-white/[0.03] p-1 lg:hidden">
            {(["shelf", "add"] as const).map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    aria-pressed={activeTab === tab}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors ${activeTab === tab ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                        }`}
                >
                    {tab === "shelf" ? <LayoutGrid className="h-3.5 w-3.5" /> : <PlusCircle className="h-3.5 w-3.5" />}
                    {tab === "shelf" ? "Shelf" : "Add"}
                </button>
            ))}
        </div>
    );
}
