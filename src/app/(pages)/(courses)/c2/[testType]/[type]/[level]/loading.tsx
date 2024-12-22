// src/app/(pages)/(courses)/c1/level/[level]/[type]/[testNumber]/loading.tsx

"use client";

import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      {/* Question Cards */}
      <div className="w-full max-w-4xl space-y-6">
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group rounded-xl backdrop-blur-xl border border-violet-500/20 overflow-hidden p-6 space-y-4"
          >
            {/* Shine Effect */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
            </div>

            {/* Question Number */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-32 rounded-lg bg-violet-500/10 animate-pulse" />
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <div className="h-4 w-3/4 rounded-md bg-violet-500/10 animate-pulse" />
              <div className="h-4 w-5/6 rounded-md bg-violet-500/10 animate-pulse" />
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {[1, 2, 3, 4].map((option) => (
                <div key={option} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-md bg-violet-500/10 animate-pulse" />
                  <div className="h-4 w-2/3 rounded-md bg-violet-500/10 animate-pulse" />
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-center pt-4">
              <div className="h-4 w-24 rounded-md bg-violet-500/10 animate-pulse" />
              <div className="h-8 w-32 rounded-lg bg-violet-500/10 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center gap-4"
      >
        <div className="text-sm text-violet-300/70">Loading questions...</div>
        <div className="w-48 h-1 bg-violet-500/10 rounded-full overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;
