import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeVariant = "default" | "indigo" | "green" | "yellow" | "red" | "gray";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
    default: "bg-gray-100 text-gray-700",
    indigo: "bg-indigo-100 text-indigo-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-50 text-gray-500 border border-gray-200",
};

function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                variantClasses[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}

export { Badge };
