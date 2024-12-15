// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// type LevelTypeCardProps = {
//   path: string;
//   tests: Record<string, string>;
//   type: "mcq" | "code";
// };

// export default function LevelTypeCard({
//   tests,
//   type,
//   path,
// }: LevelTypeCardProps) {
//   return (
//     <div className="rounded-lg shadow-sm overflow-hidden">
//       <div className="border p-6 m-2 rounded-lg">
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">
//           {type === "mcq" ? "Multiple Choice (MCQ)" : "Coding"}
//         </h2>
//         <ul className="space-y-3">
//           {Object.entries(tests).map(
//             ([testNumber, testId]: [string, string]) => (
//               <motion.li
//                 key={testId}
//                 whileHover={{ scale: 1.03, x: 2 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <Link
//                   href={`/c2/${path}/${type}/${testNumber}`}
//                   className="flex items-center justify-between p-1 md:p-2 rounded-md transition duration-150 ease-in-out"
//                 >
//                   <span className="text-gray-900 dark:text-white font-medium">
//                     Level {testNumber}
//                   </span>
//                   <ArrowRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//                 </Link>
//               </motion.li>
//             )
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, FileQuestion } from "lucide-react";

type LevelTypeCardProps = {
  path: string;
  tests: Record<string, string>;
  type: "mcq" | "code";
};

export default function LevelTypeCard({
  tests,
  type,
  path,
}: LevelTypeCardProps) {
  return (
    <motion.div
      className="w-full rounded-2xl overflow-hidden backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 shadow-xl"
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4 border-purple-800 border-b-2 pb-2">
          {type === "mcq" ? (
            <FileQuestion className="w-8 h-8 text-purple-500 mr-3" />
          ) : (
            <Code className="w-8 h-8 text-purple-500 mr-3" />
          )}
          <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300">
            {type === "mcq" ? "Multiple Choice (MCQ)" : "Coding"}
          </h2>
        </div>
        <ul className="space-y-3">
          {Object.entries(tests).map(
            ([testNumber, testId]: [string, string]) => (
              <motion.li
                key={testId}
                whileHover={{ scale: 1.03, x: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={`/c2/${path}/${type}/${testNumber}`}
                  className="flex items-center justify-between p-1 md:p-2 rounded-md transition duration-150 ease-in-out"
                >
                  <span className="text-gray-900 dark:text-white font-medium">
                    Level {testNumber}
                  </span>
                  <ArrowRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </Link>
              </motion.li>
            )
          )}
        </ul>
      </div>
    </motion.div>
  );
}

// export default function LevelTypeCard({
//   tests,
//   type,
//   path,
// }: LevelTypeCardProps) {
//   return (
//     <div className="w-full border rounded-lg p-4">
//       <div className="flex items-center mb-4 border-b pb-2">
//         {type === "mcq" ? (
//           <FileQuestion className="w-5 h-5 text-gray-600 mr-2" />
//         ) : (
//           <Code className="w-5 h-5 text-gray-600 mr-2" />
//         )}
//         <h2 className="text-xl font-semibold">
//           {type === "mcq" ? "Multiple Choice (MCQ)" : "Coding"}
//         </h2>
//       </div>
//       <ul className="space-y-2">
//         {Object.entries(tests).map(([testNumber, testId]: [string, string]) => (
//           <li key={testId}>
//             <Link
//               href={`/c2/${path}/${type}/${testNumber}`}
//               className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 hover:text-background transition-colors duration-150 ease-in-out"
//             >
//               <span className="font-medium">Level {testNumber}</span>
//               <ArrowRight className="h-4 w-4 text-gray-600" />
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
