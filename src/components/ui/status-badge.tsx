import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const statusBadgeVariants = cva(
  "status-indicator transition-all duration-200 hover:scale-105",
  {
    variants: {
      status: {
        success: "text-success bg-success/10 border-success/20 hover:bg-success/20",
        warning: "text-warning bg-warning/10 border-warning/20 hover:bg-warning/20", 
        error: "text-destructive bg-destructive/10 border-destructive/20 hover:bg-destructive/20",
        info: "text-primary bg-primary/10 border-primary/20 hover:bg-primary/20",
        pending: "text-muted-foreground bg-muted/50 border-muted animate-pulse",
        running: "text-success bg-success/10 border-success/20 animate-pulse-glow",
      },
    },
    defaultVariants: {
      status: "info",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, children, ...props }, ref) => {
    return (
      <Badge
        variant="outline"
        className={cn(statusBadgeVariants({ status }), className)}
        {...props}
      >
        {children}
      </Badge>
    );
  }
);
StatusBadge.displayName = "StatusBadge";

export { StatusBadge, statusBadgeVariants };