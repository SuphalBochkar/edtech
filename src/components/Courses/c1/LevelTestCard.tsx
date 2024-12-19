import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type LevelTestCardProps = {
  level: string;
  type: string;
  tests: Record<string, string>;
};

export default function LevelTestCard({
  level,
  type,
  tests,
}: LevelTestCardProps) {
  return (
    <div className="rounded-lg overflow-hidden group">
      <div className="border-2 p-6 m-2 rounded-lg transition-all duration-300">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b relative">
          {type} Tests
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-purple-600 dark:bg-purple-400"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8 }}
          />
        </h2>
        <ul className="space-y-3">
          {Object.entries(tests).map(([testNumber, testId]) => (
            <motion.li
              key={testId}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                href={`/c1/level/${level}/${type.toLowerCase()}/${testNumber}`}
                className="flex items-center justify-between p-2.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition duration-200 group"
              >
                <span className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400" />
                  Test {testNumber}
                </span>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="h-5 w-5 text-purple-600 dark:text-purple-400 transform group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
