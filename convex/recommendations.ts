import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { GENRE_VALUES } from "./schema";
import { ConvexError } from "convex/values";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Asserts the request is authenticated and returns the Clerk identity.
 * Throws a ConvexError (mapped to HTTP 401) if not signed in.
 */
async function requireAuth(ctx: { auth: { getUserIdentity: () => Promise<unknown> } }) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    return identity as {
        subject: string;         // Clerk userId
        name?: string;
        nickname?: string;
        given_name?: string;
        publicMetadata?: { role?: string };
    };
}

/**
 * Returns the role from the Clerk JWT public metadata.
 * Defaults to "user" if unset — admins must be explicitly granted.
 */
function getRole(identity: { publicMetadata?: { role?: string } }): string {
    return (identity.publicMetadata?.role as string | undefined) ?? "user";
}

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * PUBLIC — no auth required.
 * Returns the 5 most recent recommendations for the landing page.
 * Intentionally limited to avoid exposing the full dataset without auth.
 */
export const getLatest = query({
    args: {},
    handler: async (ctx) => {
        return ctx.db
            .query("recommendations")
            // .withIndex("by_created")
            .order("desc")  
            .take(5);
    },
});

/**
 * AUTHENTICATED — requires a valid Clerk session.
 * Returns all recommendations, ordered newest first.
 */
export const getAll = query({
    args: {},
    handler: async (ctx) => {
        await requireAuth(ctx);
        return ctx.db.query("recommendations").order("desc").collect();
    },
});

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * AUTHENTICATED — add a new recommendation.
 * Security: userId and userName are taken from the JWT, never from client input.
 * This prevents users from impersonating others.
 */
export const add = mutation({
    args: {
        title: v.string(),
        genre: v.union(...GENRE_VALUES.map((g) => v.literal(g))),
        link: v.optional(v.string()),
        blurb: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await requireAuth(ctx);

        // Sanitize input lengths server-side  
        if (args.title.trim().length === 0) throw new ConvexError("Title is required");
        if (args.title.length > 120) throw new ConvexError("Title too long (max 120 chars)");
        if (args.blurb.trim().length === 0) throw new ConvexError("Blurb is required");
        if (args.blurb.length > 500) throw new ConvexError("Blurb too long (max 500 chars)");
        if (args.link && args.link.length > 500) throw new ConvexError("Link too long");

        const displayName =
            identity.given_name ??
            identity.nickname ??
            identity.name ??
            "Anonymous";

        return ctx.db.insert("recommendations", {
            userId: identity.subject,   // from JWT — cannot be forged
            userName: displayName,
            title: args.title.trim(),
            genre: args.genre,
            link: args.link?.trim() || undefined,
            blurb: args.blurb.trim(),
            isStaffPick: false,          // always false on creation
        });
    },
});

/**
 * AUTHENTICATED with ownership check — delete a recommendation.
 * Security: admins can delete any; regular users only delete their own.
 * The check happens server-side — client role claims are not trusted.
 */
export const remove = mutation({
    args: { id: v.id("recommendations") },
    handler: async (ctx, { id }) => {
        const identity = await requireAuth(ctx);
        const role = getRole(identity);

        const rec = await ctx.db.get(id);
        if (!rec) throw new ConvexError("Recommendation not found");

        const isOwner = rec.userId === identity.subject;
        const isAdmin = role === "admin";

        if (!isOwner && !isAdmin) {
            throw new ConvexError("Forbidden: you can only delete your own recommendations");
        }

        await ctx.db.delete(id);
    },
});

/**
 * ADMIN ONLY — toggle Staff Pick status.
 * Security: role is read from the verified JWT, not from any client-sent value.
 */
export const toggleStaffPick = mutation({
    args: { id: v.id("recommendations") },
    handler: async (ctx, { id }) => {
        const identity = await requireAuth(ctx);
        const role = getRole(identity);

        if (role !== "admin") {
            throw new ConvexError("Forbidden: only admins can set Staff Picks");
        }

        const rec = await ctx.db.get(id);
        if (!rec) throw new ConvexError("Recommendation not found");

        await ctx.db.patch(id, { isStaffPick: !rec.isStaffPick });
    },
});
