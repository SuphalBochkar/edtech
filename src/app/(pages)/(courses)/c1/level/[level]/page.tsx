// /src/app/(pages)/(courses)/c1/level/[level]/page.tsx

"use client";

import { getLevelData } from "@/actions/keyData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LevelTestCard from "@/components/Courses/c1/LevelTestCard";
import { motion } from "framer-motion";

export default function Page({ params }: { params: { level: string } }) {
  const router = useRouter();
  const data = getLevelData(params.level);

  useEffect(() => {
    if (!data) {
      router.push("/c1/");
    }
  }, [data, router]);

  if (!data) {
    return null;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white m-3 md:m-5 relative">
          Level {params.level} Tests
          <span className="absolute bottom-0 left-0 w-20 h-1 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LevelTestCard
              level={params.level}
              type="Programming"
              tests={data.programming}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
