const FillSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-8 animate-pulse">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 mb-4">
            <div className="w-5 h-5 rounded-full bg-violet-400/20" />
            <div className="w-24 h-4 rounded-full bg-violet-400/20" />
          </div>
          <div className="h-10 w-64 mx-auto bg-violet-400/20 rounded-lg mb-2" />
          <div className="h-4 w-48 mx-auto bg-violet-400/20 rounded-lg" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Course Selection Skeleton */}
          <div className="space-y-6">
            {[1, 2].map((group) => (
              <div key={group} className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-4 h-4 rounded-full bg-violet-400/20" />
                  <div className="h-6 w-24 bg-violet-400/20 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="aspect-square rounded-xl border-2 border-violet-500/20 bg-black/50 p-3"
                    >
                      <div className="h-full flex flex-col justify-between">
                        <div className="h-4 w-3/4 bg-violet-400/20 rounded" />
                        <div className="space-y-2">
                          <div className="h-3 w-12 bg-violet-400/20 rounded" />
                          <div className="h-6 w-16 bg-violet-400/20 rounded" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Total Amount Skeleton */}
            <div className="rounded-lg border border-violet-500/20 bg-black/50 backdrop-blur-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-violet-400/20" />
                  <div className="w-24 h-4 rounded bg-violet-400/20" />
                </div>
                <div className="w-16 h-6 rounded bg-violet-400/20" />
              </div>
            </div>
          </div>

          {/* Payment Section Skeleton */}
          <div className="space-y-4">
            {/* QR Code Skeleton */}
            <div className="rounded-lg border border-violet-500/20 bg-black/50 backdrop-blur-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-violet-400/20" />
                  <div className="w-32 h-4 rounded bg-violet-400/20" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="aspect-square max-w-[200px] mx-auto bg-violet-400/20 rounded-lg" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-violet-500/10">
                    <div className="w-24 h-4 rounded bg-violet-400/20" />
                    <div className="w-16 h-4 rounded bg-violet-400/20" />
                  </div>
                  <div className="w-48 h-3 mx-auto rounded bg-violet-400/20" />
                </div>
              </div>
            </div>

            {/* Upload Section Skeleton */}
            <div className="rounded-lg border border-violet-500/20 bg-black/50 backdrop-blur-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded bg-violet-400/20" />
                <div className="w-40 h-4 rounded bg-violet-400/20" />
              </div>
              <div className="w-full h-32 rounded-lg border-2 border-dashed border-violet-500/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-6 h-6 rounded bg-violet-400/20 mx-auto mb-2" />
                  <div className="w-32 h-3 rounded bg-violet-400/20 mx-auto" />
                </div>
              </div>
            </div>

            {/* Button Skeleton */}
            <div className="w-full h-10 rounded-lg bg-violet-400/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FillSkeleton;
