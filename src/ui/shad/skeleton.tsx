import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-purple-200/30 dark:bg-purple-800/20 rounded-md backdrop-blur-sm ${className}`}
      {...props}
      role="status"
      aria-label="Loading..."
    />
  );
}
