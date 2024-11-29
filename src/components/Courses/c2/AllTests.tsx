"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Code, Database } from "lucide-react";
import { useRouter } from "next/navigation";
import { testTypes } from "@/lib/data-c2";
import { Course, CourseNames } from "@/lib/data";
import { useSession } from "next-auth/react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const iconMap: Partial<Record<Course, JSX.Element>> = {
  [Course.Course2Place]: <Zap className="w-6 h-6" />,
  [Course.Course2V5]: <Code className="w-6 h-6" />,
  [Course.Course2N2NCPP]: <Database className="w-6 h-6" />,
  [Course.Course2N2NJAVA]: <Database className="w-6 h-6" />,
};

export default function AllTests() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Available Tests
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {testTypes.map((type) => (
          <TestTypeComponent
            key={type.name}
            testName={type.name}
            onClick={() => router.push(`/c2${type.path}`)}
            courses={session?.user.courses}
          />
        ))}
      </motion.div>
    </div>
  );
}

type TestTypeComponentProps = {
  testName: Course;
  onClick: () => void;
  courses: Course[] | undefined;
};

function TestTypeComponent({
  testName,
  onClick,
  courses,
}: TestTypeComponentProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 dark:bg-purple-800/10 group-hover:bg-purple-800/40 group-hover:shadow-lg h-full">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/20 rounded-full">
              {iconMap[testName]}
            </div>
            <div className="flex gap-2">
              <StatusBadge courses={courses} testName={testName} />
              <Badge>5 Levels</Badge>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">{CourseNames[testName]}</h3>
          <p className="text-sm text-gray-300 mb-4 flex-grow">
            Master your skills in {CourseNames[testName]} tests
          </p>
          <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors duration-200">
            <span className="text-sm font-medium mr-2">Start Now</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatusBadge({
  courses,
  testName,
}: {
  courses: Course[] | undefined;
  testName: Course;
}) {
  if (!courses) {
    return <Badge className="bg-gray-500/20 text-gray-300">Loading...</Badge>;
  }

  const isPaid = courses.includes(testName);
  return (
    <Badge
      className={
        isPaid ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
      }
    >
      <span
        className={`inline-block w-2 h-2 rounded-full mr-1 ${isPaid ? "bg-green-400" : "bg-red-400"}`}
      />
      {isPaid ? "Subscribed" : "Not Subscribed"}
    </Badge>
  );
}

function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-full ${className}`}
    >
      {children}
    </span>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
}

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
