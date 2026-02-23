import { Film, Users, Zap, Shield, LucideIcon } from "lucide-react";

const FEATURES: { icon: LucideIcon; title: string; desc: string; color: string; bg: string }[] = [
    { icon: Film, title: "Curated picks", desc: "Only the movies your friends genuinely love — no algorithms, no ads.", color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { icon: Users, title: "For your circle", desc: "A shared shelf visible to everyone, updated in real-time by your crew.", color: "text-violet-400", bg: "bg-violet-500/10" },
    { icon: Zap, title: "Instant updates", desc: "Powered by Convex — new recs appear the moment they're added.", color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { icon: Shield, title: "Role-based access", desc: "Admins pick Staff Picks. Users manage only their own recommendations.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

export function FeaturesGrid() {
    return (
        <section className="py-20" aria-labelledby="features-heading">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 id="features-heading" className="mb-3 text-3xl font-bold text-white">
                        Built for real recommendations
                    </h2>
                    <p className="text-slate-400">Everything you need. Nothing you don&apos;t.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
                        <div key={title} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all hover:border-white/10 hover:bg-white/[0.06]">
                            <div className={`mb-4 inline-flex rounded-xl ${bg} p-3`}>
                                <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
                            </div>
                            <h3 className="mb-2 font-semibold text-white">{title}</h3>
                            <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
