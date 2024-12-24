"use client";

import { motion } from "framer-motion";
import { getLevelTypeData } from "@/actions/keyData";
import Link from "next/link";
import { ArrowRight, Code2, FileText } from "lucide-react";
import { Course, CourseNames } from "@/lib/data";

const TestTypes = ({ testType, path }: { testType: Course; path: string }) => {
  const data = getLevelTypeData(testType);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col items-center justify-center px-4 py-8"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
          {CourseNames[testType]}
        </h2>
      </motion.div>

      {/* Cards Container */}
      {data && (
        <div
          className={`w-full max-w-4xl grid grid-cols-1 ${data.mcq && data.code ? "md:grid-cols-2 gap-6" : "place-items-center"}`}
        >
          {data.mcq && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-xl"
            >
              <LevelTypeCard path={path} type="mcq" tests={data.mcq} />
            </motion.div>
          )}
          {data.code && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-xl"
            >
              <LevelTypeCard path={path} type="code" tests={data.code} />
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

type LevelTypeCardProps = {
  path: string;
  tests: Record<string, string>;
  type: "mcq" | "code";
};

function LevelTypeCard({ tests, type, path }: LevelTypeCardProps) {
  return (
    <motion.div className="relative group rounded-xl backdrop-blur-xl border border-violet-500/20 overflow-hidden">
      {/* Shine Effect */}
      {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
      </div> */}

      <div className="p-6 space-y-4">
        {/* Card Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10">
            {type === "mcq" ? (
              <FileText className="w-5 h-5 text-violet-400" />
            ) : (
              <Code2 className="w-5 h-5 text-violet-400" />
            )}
          </div>
          <h3 className="text-lg font-medium text-violet-300">
            {type === "mcq" ? "Multiple Choice ( MCQ )" : "Coding Challenge"}
          </h3>
        </div>

        {/* Levels List */}
        <div className="flex flex-col gap-2 md:gap-3">
          {Object.entries(tests).map(([testNumber, testId]) => (
            <Link key={testId} href={`/c2/${path}/${type}/${testNumber}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between p-3 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-violet-300 hover:text-violet-200">
                    Level {testNumber}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-violet-400 hover:text-violet-300 transform hover:translate-x-1 transition-all duration-300" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default TestTypes;
