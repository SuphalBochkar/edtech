// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Dot, ExternalLink } from "lucide-react";

// type LevelTypeCardProps = {
//   level: string;
//   type: string;
//   tests: Record<string, string>;
// };

// export default function LevelTypeCard({
//   level,
//   type,
//   tests,
// }: LevelTypeCardProps) {
//   return (
//     <motion.div className="rounded-xl p-6 transition-shadow cursor-pointer bg-transparent border-[1.75px] border-gray-400 dark:border-gray-400">
//       <div className="text-xl font-semibold mb-2">
//         Level {level} - {type}
//       </div>
//       <div>
//         <ul className="space-y-2">
//           {Object.entries(tests).map(([testNumber, testId]) => (
//             <motion.li
//               key={testId}
//               whileHover={{ scale: 1.03, x: 5 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="flex items-center space-x-2"
//             >
//               <Dot />
//               <Link
//                 href={`/c1/level/${level}/${type.toLowerCase()}/${testNumber}`}
//                 className="flex gap-1 items-center dark:text-purple-300 hover:underline font-medium text-purple-950"
//               >
//                 Test {testNumber} (Click Here)
//                 <ExternalLink className="ml-1 h-4 w-4" />
//               </Link>
//             </motion.li>
//           ))}
//         </ul>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type LevelTypeCardProps = {
  path: string;
  tests: Record<string, string>;
};

export default function LevelTypeCard({ tests, path }: LevelTypeCardProps) {
  return (
    <div className="rounded-lg shadow-sm overflow-hidden">
      <div className="border p-6 m-2 rounded-lg">
        <ul className="space-y-3">
          {Object.entries(tests).map(
            ([testNumber, testId]: [string, string]) => (
              <motion.li
                key={testId}
                whileHover={{ scale: 1.03, x: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={`/c2/${path}/${testNumber}`}
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
    </div>
  );
}
