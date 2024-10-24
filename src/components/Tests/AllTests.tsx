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

"use client";

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          variants={fadeInUp}
          className="bg-transparent p-6 rounded-lg shadow-md backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Level Tests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {levelTests.map((level) => (
              <LevelComponent
                key={level}
                level={level}
                onClick={() => router.push("/test/level/" + level)}
              />
            ))}
          </div>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="bg-transparent p-6 rounded-lg shadow-md backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            AE Tests
          </h2>
          <div className="space-y-4">
            {aeTests.map((test) => (
              <PracticeComponent
                key={test.id}
                {...test}
                onClick={() => router.push("/test/practice/" + test.id)}
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
      className="bg-gradient-to-br from-gray-100 to-purple-50 dark:from-gray-900 dark:to-purple-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="p-4 relative">
        <div className="flex items-baseline mb-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mr-2">
            Level {level}
          </h3>
          <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
            Aptitude & Programming
          </p>
        </div>
        <div className="flex space-x-1">
          {["A", "B", "C", "D", "E"].map((set) => (
            <motion.span
              key={set}
              className="text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded"
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
      className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-purple-100 dark:border-purple-800"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100 leading-tight">
              {name}
            </h3>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                <BookOpen className="w-3 h-3 mr-1" />
                {type}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
            </div>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-1 ml-2">
            <CalendarIcon className="w-3 h-3 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
