export default function DetailsSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Search Bar Skeleton */}
      <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-violet-500/20" />
          <div className="w-full h-12 rounded-xl bg-violet-500/10 border border-violet-500/20" />
        </div>
        <div className="w-full sm:w-32 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20" />
      </div>

      {/* User Info Card Skeleton */}
      <div className="max-w-3xl mx-auto rounded-2xl border border-violet-500/20 backdrop-blur-xl overflow-hidden">
        <div className="p-6 space-y-6">
          {/* User Header */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-violet-500/20" />
            <div className="space-y-3">
              <div className="h-6 w-48 rounded-lg bg-violet-500/20" />
              <div className="h-4 w-32 rounded-lg bg-violet-500/20" />
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-500/20" />
                <div className="h-4 flex-grow rounded-lg bg-violet-500/20" />
              </div>
            ))}
          </div>

          {/* Additional Info Sections */}
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 w-48 rounded-lg bg-violet-500/20" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <div
                      key={j}
                      className="h-12 rounded-xl bg-violet-500/10 border border-violet-500/20"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
