// import { getLevelTypeData } from "@/actions/keyData";
// import LevelTypeCard from "./LevelTypeCard";
// import { Course, CourseNames } from "@/lib/data";

// const TestTypes = ({ testType, path }: { testType: Course; path: string }) => {
//   const data = getLevelTypeData(testType);

//   return (
//     <div>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:m-5 mb-4 flex justify-center">
//           {CourseNames[testType]}
//         </h1>
//         <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//           {data && (
//             <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8">
//               {data.mcq && (
//                 <LevelTypeCard path={path} type="mcq" tests={data.mcq} />
//               )}
//               {data.code && (
//                 <LevelTypeCard path={path} type="code" tests={data.code} />
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestTypes;

"use client";

import { motion } from "framer-motion";
import { getLevelTypeData } from "@/actions/keyData";
import LevelTypeCard from "./LevelTypeCard";
import { Course, CourseNames } from "@/lib/data";

const TestTypes = ({ testType, path }: { testType: Course; path: string }) => {
  const data = getLevelTypeData(testType);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <motion.h1
        className="text-2xl md:text-4xl font-bold text-center text-purple-800 dark:text-purple-200 mb-8 md:mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {CourseNames[testType]}
      </motion.h1>
      {data && (
        <div
          className={`grid ${
            data.mcq && data.code
              ? "grid-cols-1 md:grid-cols-2 gap-8"
              : "grid-cols-1 justify-items-center"
          } max-w-4xl mx-auto`}
        >
          {data.mcq && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <LevelTypeCard path={path} type="mcq" tests={data.mcq} />
            </motion.div>
          )}
          {data.code && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <LevelTypeCard path={path} type="code" tests={data.code} />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestTypes;
