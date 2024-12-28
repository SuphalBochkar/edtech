export default function DetailsSkeleton() {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      <div className="max-w-4xl mx-auto border border-gray-200 rounded-md overflow-hidden">
        <div className="bg-gray-100 py-4 px-6 flex flex-col gap-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div> {/* Name */}
          <div className="h-4 bg-gray-300 rounded w-2/3"></div> {/* Email */}
          <div className="h-4 bg-gray-300 rounded w-1/2"></div> {/* Phone */}
        </div>
        <div className="divide-y divide-gray-200">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="py-4 px-6 grid grid-cols-2 gap-4">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
