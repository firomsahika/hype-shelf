"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";

const convex = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL ?? ""
);

/**
 * Wraps the app with both the Convex client and Clerk auth integration.
 * ConvexProviderWithClerk automatically passes the Clerk JWT to every
 * Convex request, enabling ctx.auth.getUserIdentity() in server functions.
 */
export function ConvexClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ConvexProvider client={convex}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ConvexProvider>
    );
}
