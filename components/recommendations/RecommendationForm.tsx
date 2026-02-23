"use client";

import { useState, FormEvent } from "react";
import { AddRecommendationInput, Genre, GENRES } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { PlusCircle, ChevronDown } from "lucide-react";

interface RecommendationFormProps {
    onSubmit: (data: AddRecommendationInput) => Promise<void>;
    isSubmitting?: boolean;
}

const EMPTY_FORM: AddRecommendationInput = {
    title: "",
    genre: "action",
    link: "",
    blurb: "",
};

const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white " +
    "placeholder:text-slate-600 transition-colors " +
    "focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/[0.07]";

const labelClass = "block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5";

export function RecommendationForm({
    onSubmit,
    isSubmitting = false,
}: RecommendationFormProps) {
    const [form, setForm] = useState<AddRecommendationInput>(EMPTY_FORM);
    const [errors, setErrors] = useState<Partial<Record<keyof AddRecommendationInput, string>>>({});

    function validate(): boolean {
        const newErrors: typeof errors = {};
        if (!form.title.trim()) newErrors.title = "Title is required.";
        if (!form.blurb.trim()) newErrors.blurb = "A short blurb is required.";
        if (form.link && !/^https?:\/\/.+/.test(form.link)) {
            newErrors.link = "Link must start with http:// or https://";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        await onSubmit(form);
        setForm(EMPTY_FORM);
        setErrors({});
    }

    return (
        <form onSubmit={handleSubmit} aria-label="Add a recommendation" className="space-y-4" noValidate>
            {/* Title */}
            <div>
                <label htmlFor="rec-title" className={labelClass}>Title</label>
                <input
                    id="rec-title"
                    className={inputClass}
                    placeholder="e.g. Interstellar"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    required
                    autoComplete="off"
                />
                {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
            </div>

            {/* Genre */}
            <div>
                <label htmlFor="rec-genre" className={labelClass}>Genre</label>
                <div className="relative">
                    <select
                        id="rec-genre"
                        className={`${inputClass} appearance-none pr-10`}
                        value={form.genre}
                        onChange={(e) => setForm((f) => ({ ...f, genre: e.target.value as Genre }))}
                    >
                        {GENRES.map((g) => (
                            <option key={g} value={g} className="bg-slate-800">
                                {capitalize(g)}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
                </div>
            </div>

            {/* Link */}
            <div>
                <label htmlFor="rec-link" className={labelClass}>Link <span className="normal-case font-normal text-slate-600">(optional)</span></label>
                <input
                    id="rec-link"
                    type="url"
                    className={inputClass}
                    placeholder="https://..."
                    value={form.link}
                    onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                    autoComplete="off"
                />
                {errors.link && <p className="mt-1 text-xs text-red-400">{errors.link}</p>}
            </div>

            {/* Blurb */}
            <div>
                <label htmlFor="rec-blurb" className={labelClass}>Blurb</label>
                <textarea
                    id="rec-blurb"
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="Why do you love it?"
                    value={form.blurb}
                    onChange={(e) => setForm((f) => ({ ...f, blurb: e.target.value }))}
                    required
                />
                {errors.blurb && <p className="mt-1 text-xs text-red-400">{errors.blurb}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
            >
                <PlusCircle className="h-4 w-4" aria-hidden="true" />
                {isSubmitting ? "Adding…" : "Add Recommendation"}
            </button>
        </form>
    );
}
