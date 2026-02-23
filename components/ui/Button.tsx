import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
        "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500",
    secondary:
        "bg-gray-100 text-gray-800 hover:bg-gray-200 focus-visible:ring-gray-400",
    ghost:
        "bg-transparent text-gray-600 hover:bg-gray-100 focus-visible:ring-gray-400",
    danger:
        "bg-red-50 text-red-600 hover:bg-red-100 focus-visible:ring-red-400",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant = "primary", size = "md", disabled, children, ...props },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled}
                className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
                    "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-50",
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
