import { query } from "./_generated/server";

export const getMyRole = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        // Change: Return null instead of throwing an error.
        // This allows the frontend to stay calm while loading.
        if (!identity) {
            return null;
        }

        const meta = identity as {
            publicMetadata?: { role?: string };
        };

        return (meta.publicMetadata?.role as string | undefined) ?? "user";
    },
});