import { Skeleton } from "@/ui/shad/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Skeleton className="h-8 w-64 mx-auto mb-8" />
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonCard />
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-lg p-4 min-w-[300px]">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-5 w-5" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-3" />
      <div className="flex items-center">
        <Skeleton className="h-4 w-24 mr-1" />
        <Skeleton className="h-4 w-4" />
      </div>
    </div>
  );
}
