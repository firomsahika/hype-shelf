import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    placeholder?: string;
    error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, options, placeholder, error, id, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label htmlFor={id} className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={id}
                        className={cn(
                            "w-full appearance-none rounded-lg border border-gray-200 bg-white",
                            "px-3 py-2 pr-10 text-sm text-gray-900 transition-colors",
                            "focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
                            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
                            error && "border-red-400 focus:border-red-500 focus:ring-red-500/20",
                            className
                        )}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                    />
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);
Select.displayName = "Select";

export { Select };
export type { SelectOption };
