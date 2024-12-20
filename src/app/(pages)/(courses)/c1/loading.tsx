import { Skeleton } from "@/ui/shad/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <Skeleton className="h-8 sm:h-10 w-48 sm:w-64 mx-auto mb-4 sm:mb-8" />
      <div className="space-y-8 sm:space-y-12">
        <section>
          <Skeleton className="h-6 sm:h-8 w-32 sm:w-40 mb-3 sm:mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[...Array(3)].map((_, index) => (
              <SkeletonPracticeCard key={index} />
            ))}
          </div>
        </section>
        <section>
          <Skeleton className="h-6 sm:h-8 w-32 sm:w-40 mb-3 sm:mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(8)].map((_, index) => (
              <SkeletonLevelCard key={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SkeletonPracticeCard() {
  return (
    <div className="p-2 sm:p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-2">
          <Skeleton className="h-5 sm:h-6 w-3/4 mb-2" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-3 sm:h-4 w-16 sm:w-20 mb-1 sm:mb-0" />
            <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
          </div>
        </div>
        <Skeleton className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
    </div>
  );
}

function SkeletonLevelCard() {
  return (
    <div className="p-2 sm:p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <Skeleton className="h-5 sm:h-6 w-16 sm:w-20 mb-1" />
          <Skeleton className="h-3 sm:h-4 w-24 sm:w-28" />
        </div>
        <Skeleton className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
        {[...Array(5)].map((_, index) => (
          <Skeleton
            key={index}
            className="h-4 w-6 sm:h-5 sm:w-7 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
