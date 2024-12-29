export default function QueriesSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="rounded-2xl border border-violet-500/20 backdrop-blur-xl overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-violet-500/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title Area */}
            <div className="space-y-2">
              <div className="h-7 w-48 rounded-lg bg-violet-500/20" />
              <div className="h-4 w-64 rounded-lg bg-violet-500/20" />
            </div>

            {/* Controls Area */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-violet-500/20" />
                <div className="w-full sm:w-64 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20" />
              </div>
              <div className="flex gap-2">
                <div className="w-32 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20" />
                <div className="w-24 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6">
          <div className="rounded-xl border border-violet-500/20 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-violet-500/5 p-4 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 rounded-lg bg-violet-500/20" />
              ))}
            </div>

            {/* Table Body */}
            <div className="divide-y divide-violet-500/20">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-5 p-4 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded-lg bg-violet-500/20" />
                    <div className="h-3 w-24 rounded-lg bg-violet-500/20" />
                  </div>
                  <div className="h-4 rounded-lg bg-violet-500/20" />
                  <div className="w-20 h-6 rounded-full bg-violet-500/20" />
                  <div className="h-4 rounded-lg bg-violet-500/20" />
                  <div className="w-28 h-8 rounded-lg bg-violet-500/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
