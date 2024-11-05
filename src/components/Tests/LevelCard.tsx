import Link from "next/link";
import { motion } from "framer-motion";
import { Dot, ExternalLink } from "lucide-react";

type LevelCardProps = {
  level: string;
  type: string;
  tests: Record<string, string>;
};

export default function LevelCard({ level, type, tests }: LevelCardProps) {
  return (
    <motion.div className="rounded-xl p-6 transition-shadow cursor-pointer bg-transparent border-[1.75px] border-gray-400 dark:border-gray-400">
      <div className="text-xl font-semibold mb-2">
        Level {level} - {type}
      </div>
      <div>
        <ul className="space-y-2">
          {Object.entries(tests).map(([testNumber, testId]) => (
            <motion.li
              key={testId}
              whileHover={{ scale: 1.03, x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center space-x-2"
            >
              <Dot />
              <Link
                href={`/test/level/${level}/${type.toLowerCase()}/${testNumber}`}
                className="flex gap-1 items-center dark:text-purple-300 hover:underline font-medium text-purple-950"
              >
                Test {testNumber} (Click Here)
                <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
