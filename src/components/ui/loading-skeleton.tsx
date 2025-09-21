import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
  showButton?: boolean;
}

export function LoadingSkeleton({ 
  className, 
  lines = 3, 
  showAvatar = false, 
  showButton = false 
}: LoadingSkeletonProps) {
  return (
    <div className={cn("animate-pulse space-y-4", className)}>
      {showAvatar && (
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-muted h-12 w-12"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-3 bg-muted rounded w-1/6"></div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4 bg-muted rounded",
              i === 0 && "w-3/4",
              i === 1 && "w-1/2", 
              i === 2 && "w-5/6",
              i > 2 && "w-2/3"
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      {showButton && (
        <div className="flex space-x-2 pt-2">
          <div className="h-10 bg-muted rounded w-24"></div>
          <div className="h-10 bg-muted rounded w-20"></div>
        </div>
      )}
    </div>
  );
}

export function LoadingCard({ className }: { className?: string }) {
  return (
    <div className={cn("border rounded-lg p-6 card-shadow", className)}>
      <LoadingSkeleton lines={4} showButton />
    </div>
  );
}

export function LoadingGrid({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}