/**
 * Shared type definitions.
 * Since we use Convex that generates its own types from the schema,
 * we export only utility types and constants here.
 * The canonical Recommendation type is Doc<"recommendations"> from Convex.
 */

export type UserRole = "admin" | "user";

export type Genre =
  | "horror"
  | "action"
  | "comedy"
  | "drama"
  | "sci-fi"
  | "thriller"
  | "romance"
  | "documentary"
  | "animation"
  | "other";

export const GENRES: Genre[] = [
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
];

export interface AddRecommendationInput {
  title: string;
  genre: Genre;
  link?: string;
  blurb: string;
}

/**
 * Minimal recommendation shape used for public-facing display
 * (landing page mock data before Convex data is available).
 * In authenticated views, use Doc<"recommendations"> directly.
 */
export interface RecommendationDisplay {
  _id: string;
  title: string;
  genre: Genre;
  link?: string;
  blurb: string;
  userId: string;
  userName: string;
  isStaffPick: boolean;
  _creationTime: number;
}
