import { SignUp } from "@clerk/nextjs";

/**
 * Dedicated sign-up page.
 * Clerk's [[...sign-up]] catch-all handles all sign-up sub-paths.
 */
export default function SignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
            </div>
            <SignUp />
        </div>
    );
}
