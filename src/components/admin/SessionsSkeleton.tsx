export default function SessionsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="rounded-lg border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
            <div className="h-9 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="rounded-md border border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>

            {/* Table Rows */}
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200"
              >
                {/* User Cell */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Session Started Cell */}
                <div className="h-4 w-36 bg-gray-200 rounded"></div>

                {/* Expires In Cell */}
                <div className="h-4 w-20 bg-gray-200 rounded"></div>

                {/* Last Updated Cell */}
                <div className="h-4 w-36 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
