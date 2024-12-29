export default function DashboardSkeleton() {
  return (
    <div className="container max-w-6xl mx-auto p-4 animate-pulse">
      {/* Header Card Skeleton */}
      <div className="mb-8 rounded-xl border border-violet-500/20 bg-black/50 backdrop-blur-xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-violet-500/10"></div>
            <div className="space-y-2">
              <div className="h-7 bg-violet-500/10 rounded-lg w-48"></div>
              <div className="h-4 bg-violet-500/10 rounded-lg w-64"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Buttons Skeleton */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-11 w-32 bg-violet-500/10 rounded-lg border border-violet-500/20"
          ></div>
        ))}
      </div>

      {/* Content Card Skeleton */}
      <div className="rounded-xl border border-violet-500/20 bg-black/50 backdrop-blur-xl overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Search Bar Skeleton */}
          <div className="flex items-center gap-4 max-w-3xl">
            <div className="flex-grow h-10 bg-violet-500/10 rounded-lg border border-violet-500/20"></div>
            <div className="h-10 w-24 bg-violet-500/10 rounded-lg border border-violet-500/20"></div>
          </div>

          {/* Table Skeleton */}
          <div className="rounded-xl border border-violet-500/20 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-4 border-b border-violet-500/20">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 bg-violet-500/10 rounded-lg"></div>
              ))}
            </div>

            {/* Table Rows */}
            {[...Array(5)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-4 gap-4 p-4 border-b border-violet-500/20"
              >
                {[...Array(4)].map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className="h-6 bg-violet-500/10 rounded-lg"
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
