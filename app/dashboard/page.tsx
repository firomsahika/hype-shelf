"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ShelfSection } from "@/components/dashboard/ShelfSection";
import { MobileTabBar } from "@/components/dashboard/MobileTabBar";
import { AddRecommendationInput, Genre } from "@/lib/types";

export default function DashboardPage() {
    const { user, isLoaded, isSignedIn } = useUser();
    const { isAuthenticated, isLoading: convexLoading } = useConvexAuth();
    const [activeGenre, setActiveGenre] = useState<Genre | "all">("all");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState<"shelf" | "add">("shelf");

    // Skip Convex queries until its auth token is ready.
    // proxy.ts already handles redirecting unauthenticated users server-side,
    // so we never need a client-side redirect here — that caused the infinite loop.
    const skipQuery = convexLoading || !isAuthenticated;
    const role = useQuery(api.users.getMyRole, skipQuery ? "skip" : {});
    const recommendations = useQuery(api.recommendations.getAll, skipQuery ? "skip" : {}) ?? [];
    const addMutation = useMutation(api.recommendations.add);
    const deleteMutation = useMutation(api.recommendations.remove);
    const togglePickMutation = useMutation(api.recommendations.toggleStaffPick);

    // Show nothing while Clerk or Convex auth is still initialising
    if (!isLoaded || convexLoading) return null;

    console.log("Loaded:", isLoaded);
    console.log("Signed in:", isSignedIn);

    const staffPicks = recommendations.filter((r) => r.isStaffPick);
    const isLoading = recommendations === undefined;

    async function handleAdd(data: AddRecommendationInput) {
        setIsSubmitting(true);
        try { await addMutation(data); }
        finally {
            setIsSubmitting(false);
            setActiveTab("shelf");
        }
    }

    return (
        <div className="min-h-screen bg-slate-950" suppressHydrationWarning>
            <Navbar />
            <main className="pt-16">
                <DashboardHeader totalCount={recommendations.length} staffPickCount={staffPicks.length} />
                <Container className="py-8">
                    <MobileTabBar activeTab={activeTab} onTabChange={setActiveTab} />
                    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
                        <DashboardSidebar onAdd={handleAdd} isSubmitting={isSubmitting} staffPicks={staffPicks} activeTab={activeTab} role={role ?? undefined} />
                        <ShelfSection
                            recommendations={recommendations}
                            activeGenre={activeGenre}
                            onFilterChange={setActiveGenre}
                            currentUserId={user?.id}
                            role={role ?? undefined}
                            onToggleStaffPick={(id: Id<"recommendations">) => togglePickMutation({ id })}
                            onDelete={(id: Id<"recommendations">) => deleteMutation({ id })}
                            activeTab={activeTab}
                            isLoading={isLoading}
                        />
                    </div>
                </Container>
            </main>
        </div>
    );
}
