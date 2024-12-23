"use client";

import { motion } from "framer-motion";

const HomeLoading = () => {
  return (
    <div className="w-full">
      {/* WelcomeMsg Skeleton */}
      <div className="w-full flex flex-col items-center justify-center py-8 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-4xl space-y-6"
        >
          {/* Title Skeleton */}
          <div className="space-y-3 text-center">
            <div className="h-8 w-64 mx-auto rounded-lg bg-violet-500/10 animate-pulse" />
            <div className="h-4 w-96 mx-auto rounded-md bg-violet-500/10 animate-pulse" />
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-xl backdrop-blur-xl border border-violet-500/20 p-6"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
                </div>
                <div className="space-y-3">
                  <div className="h-6 w-24 rounded-md bg-violet-500/10 animate-pulse" />
                  <div className="h-4 w-32 rounded-md bg-violet-500/10 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AllCourses Skeleton */}
      <div className="w-full py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Section Title */}
          <div className="h-8 w-48 rounded-lg bg-violet-500/10 animate-pulse mx-auto" />

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-xl backdrop-blur-xl border border-violet-500/20 p-6"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
                </div>
                <div className="space-y-4">
                  <div className="h-6 w-32 rounded-md bg-violet-500/10 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded-md bg-violet-500/10 animate-pulse" />
                    <div className="h-4 w-3/4 rounded-md bg-violet-500/10 animate-pulse" />
                  </div>
                  <div className="h-10 w-full rounded-lg bg-violet-500/10 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      {/* <div className="w-full py-8 px-4 bg-violet-500/5">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="h-8 w-64 rounded-lg bg-violet-500/10 animate-pulse mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[1, 2].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="h-6 w-48 rounded-md bg-violet-500/10 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded-md bg-violet-500/10 animate-pulse" />
                  <div className="h-4 w-5/6 rounded-md bg-violet-500/10 animate-pulse" />
                  <div className="h-4 w-4/5 rounded-md bg-violet-500/10 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HomeLoading;
