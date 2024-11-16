import { Skeleton } from "@/ui/shad/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col items-center mb-12">
        <Skeleton className="h-10 w-[300px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="group">
      <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 dark:bg-purple-800/10 group-hover:bg-purple-800/40 group-hover:shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-5 w-[80px] rounded-full" />
          </div>
          <Skeleton className="h-6 w-[200px] mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <div className="flex items-center">
            <Skeleton className="h-4 w-[100px] mr-2" />
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
