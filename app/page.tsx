"use client";

import { useUser } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { LatestPicks } from "@/components/home/LatestPicks";
import { JoinBanner } from "@/components/home/JoinBanner";
import { BookMarked } from "lucide-react";

export default function PublicPage() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <LatestPicks />
      {!isSignedIn && <JoinBanner />}
      <footer className="border-t border-white/5 py-10" suppressHydrationWarning>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600">
              <BookMarked className="h-3.5 w-3.5 text-white" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold text-white">HypeShelf</span>
          </div>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} HypeShelf · Built with Next.js + Clerk + Convex
          </p>
        </div>
      </footer>
    </div>
  );
}
