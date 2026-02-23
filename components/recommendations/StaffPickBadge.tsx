import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StaffPickBadgeProps {
    className?: string;
}

/**
 * Visual indicator shown on recommendations marked as Staff Picks by an admin.
 * Only rendered when recommendation.isStaffPick === true.
 */
export function StaffPickBadge({ className }: StaffPickBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5",
                "text-xs font-medium text-amber-700 ring-1 ring-amber-200",
                className
            )}
            aria-label="Staff Pick"
        >
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
            Staff Pick
        </span>
    );
}
