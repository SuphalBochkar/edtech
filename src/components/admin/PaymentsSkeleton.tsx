export default function PaymentsSkeleton() {
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
            <div className="flex gap-2">
              <div className="h-9 w-64 bg-gray-200 rounded"></div>
              <div className="h-9 w-32 bg-gray-200 rounded"></div>
              <div className="h-9 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="rounded-md border border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>

            {/* Table Rows */}
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200"
              >
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-3 w-40 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-36 bg-gray-200 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
