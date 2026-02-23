import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const GENRE_VALUES = [
    "horror",
    "action",
    "comedy",
    "drama",
    "sci-fi",
    "thriller",
    "romance",
    "documentary",
    "animation",
    "other",
] as const;

export default defineSchema({
    recommendations: defineTable({
        // Written server-side from JWT identity — never trusted from client input
        userId: v.string(),
        userName: v.string(),
        title: v.string(),
        genre: v.union(...GENRE_VALUES.map((g) => v.literal(g))),
        link: v.optional(v.string()),
        blurb: v.string(),
        isStaffPick: v.boolean(),
    }).index("by_user", ["userId"])
});
