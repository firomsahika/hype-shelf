import { SignIn } from "@clerk/nextjs";

/**
 * Dedicated sign-in page.
 * Clerk's [[...sign-in]] catch-all route handles all sign-in sub-paths
 * (e.g. /sign-in/sso-callback, /sign-in/factor-one, etc.).
 *
 * NEXT_PUBLIC_CLERK_SIGN_IN_URL and NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
 * must be set in .env.local.
 */
export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950">
            {/* Subtle glow behind the sign-in card */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
            </div>
            <SignIn />
        </div>
    );
}
