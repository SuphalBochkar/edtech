// /src/app/(pages)/(courses)/c1/level/[level]/page.tsx

"use client";

import { getLevelData } from "@/actions/keyData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function Page({ params }: { params: { level: string } }) {
  const router = useRouter();
  const data = getLevelData(params.level);

  useEffect(() => {
    if (!data) {
      router.push("/c1/");
    }
  }, [data, router]);

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col items-center px-4 py-8"
    >
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8 space-y-2"
      >
        {/* Level Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 backdrop-blur-sm"
        >
          <Crown className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium text-violet-300">
            Level {params.level}
          </span>
        </motion.div>

        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
          Available Tests
        </h1>
      </motion.div>

      {/* Cards Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <LevelTestCard
            level={params.level}
            type="Aptitude"
            tests={data.aptitude}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <LevelTestCard
            level={params.level}
            type="Programming"
            tests={data.programming}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

type LevelTestCardProps = {
  level: string;
  type: string;
  tests: Record<string, string>;
};

function LevelTestCard({ level, type, tests }: LevelTestCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group rounded-xl backdrop-blur-xl border border-violet-500/20 overflow-hidden"
    >
      {/* Shine Effect */}
      {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
      </div> */}

      <div className="p-6 space-y-4">
        {/* Card Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10">
            {type === "Aptitude" ? (
              <BookOpen className="w-5 h-5 text-violet-400" />
            ) : (
              <Code2 className="w-5 h-5 text-violet-400" />
            )}
          </div>
          <h3 className="text-lg font-medium text-violet-300">{type} Tests</h3>
        </div>

        {/* Tests List */}
        <div className="space-y-2">
          {Object.entries(tests).map(([testNumber, testId]) => (
            <Link
              key={testId}
              href={`/c1/level/${level}/${type.toLowerCase()}/${testNumber}`}
              className="block group/item"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between p-3 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-violet-400" />
                  <span className="text-sm font-medium text-violet-300 group-hover/item:text-violet-200">
                    Test {testNumber}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-violet-400 group-hover/item:text-violet-300 transform group-hover/item:translate-x-1 transition-all duration-300" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
