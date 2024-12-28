export default function DashboardSkeleton() {
  return (
    <div className="container max-w-6xl mx-auto p-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="mx-auto border border-gray-200 rounded-md overflow-hidden mb-6">
        <div className="bg-gray-100 py-6 px-8">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>{" "}
          {/* Dashboard Title */}
          <div className="h-4 bg-gray-300 rounded w-1/2"></div> {/* Subtitle */}
        </div>
      </div>

      {/* Tab Buttons Skeleton */}
      <div className="flex gap-4 mb-6">
        <div className="h-10 bg-gray-300 rounded w-32"></div>
        <div className="h-10 bg-gray-300 rounded w-32"></div>
      </div>

      {/* Tab Content Skeleton */}
      <div className="mx-auto border border-gray-200 rounded-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="py-4 px-6 grid grid-cols-2 gap-4">
              <div className="h-6 bg-gray-300 rounded w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
