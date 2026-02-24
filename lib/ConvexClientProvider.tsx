"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";

const convex = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL ?? ""
);

/**
 * Wraps the app with Convex + Clerk auth integration.
 * ConvexProviderWithClerk already includes ConvexProvider internally —
 * do NOT also wrap with ConvexProvider or you get two separate contexts.
 * This automatically passes the Clerk JWT to every Convex request,
 * enabling ctx.auth.getUserIdentity() in server functions.
 */
export function ConvexClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithClerk>
    );
}
