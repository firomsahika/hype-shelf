import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> { }

function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-gray-100 bg-white p-5 shadow-sm",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> { }

function CardHeader({ className, children, ...props }: CardHeaderProps) {
    return (
        <div className={cn("mb-4 flex items-start justify-between gap-4", className)} {...props}>
            {children}
        </div>
    );
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> { }

function CardBody({ className, children, ...props }: CardBodyProps) {
    return (
        <div className={cn("text-sm text-gray-600", className)} {...props}>
            {children}
        </div>
    );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> { }

function CardFooter({ className, children, ...props }: CardFooterProps) {
    return (
        <div
            className={cn("mt-4 flex items-center gap-2 border-t border-gray-50 pt-4", className)}
            {...props}
        >
            {children}
        </div>
    );
}

export { Card, CardHeader, CardBody, CardFooter };
