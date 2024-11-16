/* "use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarIcon, BookOpen } from "lucide-react";
import { aeTests, levelTests } from "@/lib/data";
import { useRouter } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function AllTests() {
  const router = useRouter();

  return (
    <motion.div
      className="w-[80vw] lg:w-[60vw] py-2 md:py-8 overflow-hidden"
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <motion.div variants={fadeInUp} className="p-3 md:p-6 rounded-lg">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            AE Tests
          </h2>
          <div className="space-y-4">
            {aeTests.map((test) => (
              <PracticeComponent
                key={test.id}
                {...test}
                onClick={() => router.push("/c1/practice/" + test.id)}
              />
            ))}
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="p-3 md:p-6 rounded-lg">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Level Tests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {levelTests.map((level) => (
              <LevelComponent
                key={level}
                level={level}
                onClick={() => router.push("/c1/level/" + level)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function LevelComponent({
  level,
  onClick,
}: {
  level: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg border-[1.75px] border-gray-400 dark:border-gray-400 cursor-pointer backdrop-blur-md bg-purple-800/10 dark:bg-purple-800/20"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="p-4 relative">
        <div className="flex items-baseline mb-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mr-2">
            Level {level}
          </h3>
          <p className="text-[12px] md:text-xs text-gray-600 dark:text-gray-400">
            Aptitude & Programming
          </p>
        </div>
        <div className="flex space-x-1">
          {["A", "B", "C", "D", "E"].map((set) => (
            <motion.span
              key={set}
              className="text-xs font-semibold px-1.5 py-0.5 rounded border border-gray-400 dark:border-gray-600 cursor-pointer backdrop-blur-md bg-purple-800/10 dark:bg-purple-800/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {set}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PracticeComponent({
  name,
  type,
  date,
  onClick,
}: {
  name: string;
  type: string;
  date: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg border-[1.75px] border-gray-400 dark:border-gray-400 cursor-pointer backdrop-blur-md bg-purple-800/10 dark:bg-purple-800/20"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="relative z-10 p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight mb-2">
              {name}
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                <BookOpen className="w-3 h-3 mr-1" />
                {type}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">{date}</p>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1.5 ml-2">
            <CalendarIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 opacity-30"
        style={{ filter: "blur(20px)" }}
      />
    </motion.div>
  );
} */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarIcon, BookOpen, ChevronRight } from "lucide-react";
import { aeTests, levelTests } from "@/lib/data-c1";
import { useRouter } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function AllTests() {
  const router = useRouter();

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={fadeInUp}>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">
              AE Tests
            </h2>
            <div className="space-y-4">
              {aeTests.map((test) => (
                <PracticeComponent
                  key={test.id}
                  {...test}
                  onClick={() => router.push("/c1/practice/" + test.id)}
                />
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">
              Level Tests
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {levelTests.map((level) => (
                <LevelComponent
                  key={level}
                  level={level}
                  onClick={() => router.push("/c1/level/" + level)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function LevelComponent({
  level,
  onClick,
}: {
  level: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="bg-white/5 dark:bg-purple-800/10 backdrop-blur-lg border border-white/50 rounded-lg transition-colors duration-200 group-hover:bg-purple-800/40">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-200 mb-1">
                Level {level}
              </h3>
              <p className="text-sm text-gray-400">Aptitude & Programming</p>
            </div>
            <ChevronRight className="text-gray-400 group-hover:text-violet-400 transition-colors duration-200" />
          </div>
          <div className="flex space-x-2 mt-3">
            {["A", "B", "C", "D", "E"].map((set) => (
              <span
                key={set}
                className="px-2 py-1 text-xs font-semibold rounded-full bg-white/5 text-gray-300 border border-white/40 hover:bg-white/10 transition-colors duration-200"
              >
                {set}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PracticeComponent({
  name,
  type,
  date,
  onClick,
}: {
  name: string;
  type: string;
  date: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="bg-white/5 dark:bg-purple-800/10 backdrop-blur-lg border border-white/50 rounded-lg transition-colors duration-200 group-hover:bg-purple-800/40">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                {name}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {type}
                </p>
                <p className="text-sm text-gray-400 flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {date}
                </p>
              </div>
            </div>
            <ChevronRight className="text-gray-400 group-hover:text-violet-400 transition-colors duration-200" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// import React from "react";
// import LevelComponent from "@/ui/Aceternity/LevelComponent";

// export default function AllTests() {
//   return (
//     <div className="min-h-screen py-12">
//       <div className="mb-16">
//         <h2 className="text-3xl font-bold text-white mb-8 border-b pb-4">
//           AE Tests
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {[1, 2].map((level) => (
//             <div
//               key={level}
//               className="rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
//             >
//               <LevelComponent level={level} />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h2 className="text-3xl font-bold text-white mb-8 border-b pb-4">
//           Level Tests
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {[1, 2].map((level) => (
//             <div
//               key={level}
//               className="rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
//             >
//               <LevelComponent level={level} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
