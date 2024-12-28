// "use client";

// import { motion } from "framer-motion";

// const MainLoading = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="w-full h-screen flex flex-col items-center justify-center"
//     >
//       {/* Container */}
//       <motion.div
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         className="relative"
//       >
//         {/* Animated rings */}
//         <div className="absolute inset-0 -z-10">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//             className="w-24 h-24 rounded-full border-2 border-violet-500/20"
//           />
//         </div>
//         <div className="absolute inset-0 -z-10">
//           <motion.div
//             animate={{ rotate: -360 }}
//             transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
//             className="w-24 h-24 rounded-full border-2 border-violet-400/30"
//           />
//         </div>

//         {/* Main loader */}
//         <motion.div
//           animate={{
//             scale: [1, 1.1, 1],
//             opacity: [0.5, 1, 0.5],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="relative w-24 h-24 flex items-center justify-center"
//         >
//           {/* Gradient background */}
//           <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 rounded-full blur-xl" />

//           {/* Shine effect */}
//           <div className="absolute inset-0">
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
//           </div>

//           {/* Logo or text */}
//           <motion.div
//             animate={{
//               opacity: [0.5, 1, 0.5],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent"
//           >
//             F66
//           </motion.div>
//         </motion.div>
//       </motion.div>

//       {/* Loading text */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="mt-8 space-y-3"
//       >
//         <div className="text-center">
//           <motion.p
//             animate={{
//               opacity: [0.5, 1, 0.5],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             className="text-sm text-violet-300/80"
//           >
//             Loading content...
//           </motion.p>
//         </div>

//         {/* Loading bar */}
//         <div className="w-48 h-1 bg-violet-500/10 rounded-full overflow-hidden">
//           <motion.div
//             animate={{
//               x: ["-100%", "100%"],
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             className="w-full h-full bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500"
//           />
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default MainLoading;

"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const MainLoading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1300;
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
      }
      setProgress(Math.min(Math.round(currentProgress), 100));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-screen flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="relative"
      >
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border-2 border-violet-500/20"
          />
        </div>
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border-2 border-violet-400/30"
          />
        </div>

        <motion.div
          style={{
            background: `conic-gradient(from 0deg, rgba(139, 92, 246, 0.2) ${progress}%, transparent ${progress}%)`,
          }}
          className="w-32 h-32 rounded-full"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-violet-600/10 rounded-full blur-xl" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent animate-shine" />
          </div>

          <div className="flex flex-col items-center space-y-2 z-10">
            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-3xl font-bold bg-gradient-to-r from-violet-100 to-violet-300 bg-clip-text text-transparent"
            >
              F66
            </motion.div>
            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-lg font-medium text-violet-200"
            >
              {progress}%
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 space-y-3"
      >
        <div className="text-center">
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-sm text-violet-300/80"
          >
            Loading content...
          </motion.p>
        </div>

        <div className="w-48 h-1 bg-violet-500/10 rounded-full overflow-hidden">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MainLoading;
