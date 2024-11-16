import { Skeleton } from "@/ui/shad/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col relative overflow-hidden">
      <div className="flex-grow flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-[80vw] lg:max-w-[60vw]">
          <Skeleton className="h-12 w-3/4 max-w-md mb-8 mx-auto" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            {[1, 2].map((course) => (
              <div
                key={course}
                className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
