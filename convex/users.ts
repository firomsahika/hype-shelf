import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Retrieves the current user's role.
 * 
 * Logic:
 * 1. Checks Clerk JWT public metadata for immediate access.
 * 2. Falls back to a database lookup if metadata is missing.
 * 
 * @returns The user's role string ("admin" | "user") or null if unauthenticated.
 */
export const getMyRole = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const roleFromToken = (identity.publicMetadata as { role?: string })?.role;
        if (roleFromToken) return roleFromToken;

        // 2. Fallback to database record
        const user = await ctx.db
            .query("users")
            .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        return user?.role ?? "user";
    },
});

/**
 * Ensures a user record exists in Convex and stays in sync with Clerk metadata.
 * 
 * Security:
 * - Uses verified identity from 'ctx.auth'.
 * - Synchronizes roles from Clerk to ensure RBAC consistency.
 * - Automatically assigns 'admin' status to the first user in the system.
 */
export const storeUser = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const roleFromClerk = (identity.publicMetadata as { role?: string })?.role ?? "user";

        // Check if user already exists
        const user = await ctx.db
            .query("users")
            .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (user !== null) {
            // If the role in DB is different from Clerk, update it (Clerk is source of truth for existing)
            if (user.role !== roleFromClerk && roleFromClerk !== "user") {
                await ctx.db.patch(user._id, { role: roleFromClerk });
            }
            return user._id;
        }

        // If user is new, check if they are the first user to make them admin
        const firstUser = await ctx.db.query("users").first();
        const role = firstUser === null ? "admin" : roleFromClerk;

        // If user is new, create them!
        return await ctx.db.insert("users", {
            tokenIdentifier: identity.tokenIdentifier,
            name: identity.name ?? "Anonymous",
            email: (identity.email as string | undefined) ?? "",
            role: role,
        });
    },
});