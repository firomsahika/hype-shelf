import Link from "next/link";
import { BookMarked } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 text-center">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
                <BookMarked className="h-8 w-8 text-indigo-400" aria-hidden="true" />
            </div>

            <div>
                <p className="mb-2 text-6xl font-extrabold text-white">404</p>
                <p className="text-lg font-medium text-slate-400">Page not found</p>
                <p className="mt-1 text-sm text-slate-600">
                    This shelf doesn&apos;t exist — yet.
                </p>
            </div>

            <Link
                href="/"
                className="mt-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500"
            >
                ← Back to HypeShelf
            </Link>
        </div>
    );
}
