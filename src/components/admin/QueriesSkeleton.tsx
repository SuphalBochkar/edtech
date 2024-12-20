export default function QueriesSkeleton() {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      <div className="overflow-hidden border border-gray-200 rounded-md">
        <div className="grid grid-cols-5 bg-gray-100 py-3 px-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
        <div className="divide-y divide-gray-200">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-5 py-3 px-4 items-center"
            >
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-6 bg-gray-300 rounded-full w-20"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-10 bg-gray-300 rounded w-28"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
