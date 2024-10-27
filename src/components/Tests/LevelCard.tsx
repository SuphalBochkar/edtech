import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";

type LevelCardProps = {
  level: string;
  type: string;
  tests: Record<string, string>;
};

export default function LevelCard({ level, type, tests }: LevelCardProps) {
  return (
    <motion.div className="bg-purple-800/10 rounded-lg p-6 shadow-sm transition-shadow cursor-pointer">
      <div className="text-xl font-semibold mb-2">
        Level {level} - {type}
      </div>
      <div>
        <ul className="space-y-2">
          {Object.entries(tests).map(([testNumber, testId]) => (
            <motion.li
              key={testId}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center space-x-2"
            >
              <ChevronRight size={16} />
              <Link
                href={`/test/level/${level}/${type.toLowerCase()}/${testNumber}`}
                className="flex gap-1 items-center dark:text-purple-300 hover:underline font-medium text-purple-950"
              >
                Test {testNumber}
                <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
