import { Skeleton } from "@/ui/shad/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col relative overflow-hidden min-h-screen">
      <div className="flex flex-col align-middle justify-center items-center content-center py-8">
        <div className="w-[90vw] lg:w-[70vw] max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="p-4 md:p-6 rounded-lg backdrop-blur-md">
              <Skeleton className="h-8 w-[150px] mb-6" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            </div>
            <div className="p-4 md:p-6 rounded-lg backdrop-blur-md">
              <Skeleton className="h-8 w-[150px] mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
