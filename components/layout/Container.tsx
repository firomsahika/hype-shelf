import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const maxWidthClasses: Record<NonNullable<ContainerProps["maxWidth"]>, string> = {
    sm: "max-w-sm",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    "2xl": "max-w-7xl",
};

function Container({
    className,
    maxWidth = "xl",
    children,
    ...props
}: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full overflow-hidden px-4 sm:px-6 lg:px-8",
                maxWidthClasses[maxWidth],
                className
            )}
            {...props}
            suppressHydrationWarning
        >
            {children}
        </div>
    );
}

export { Container };
