import { query } from "./_generated/server";
import { ConvexError } from "convex/values";

/**
 * Returns the current user's role from the Clerk JWT publicMetadata.
 * This is the secure way to expose role data to the client:
 * the JWT is verified by Convex — the client cannot spoof it.
 *
 * Usage in components:
 *   const role = useQuery(api.users.getMyRole);
 */
export const getMyRole = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new ConvexError("Unauthenticated");

        const meta = identity as {
            publicMetadata?: { role?: string };
        };

        return (meta.publicMetadata?.role as string | undefined) ?? "user";
    },
});
