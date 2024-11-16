import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type PracticeTestCardProps = {
  practice: string;
  type: string;
};

export default function PracticeTestCard({
  practice,
  type,
}: PracticeTestCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="rounded-lg shadow-md overflow-hidden border border-white/30"
    >
      <Link
        href={`/c1/practice/${practice}/${type}`}
        className="block p-6 transition duration-150 ease-in-out"
      >
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            AE {type[0].toUpperCase() + type.substring(1).toLowerCase()}{" "}
            Practice Test {practice} (2026)
          </div>
          <ArrowRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
      </Link>
    </motion.div>
  );
}
