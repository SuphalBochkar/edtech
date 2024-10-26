import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

type PracticeTestCardProps = {
  practice: string;
  type: string;
};

export default function PracticeTestCard({
  practice,
  type,
}: PracticeTestCardProps) {
  return (
    <>
      <div className="hover:shadow-lg transition-shadow">
        <div>
          <motion.li
            key={practice}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center space-x-2"
          >
            <ChevronRight size={16} />
            <Link
              href={`/test/practice/${practice}/${type}`}
              className="dark:text-purple-300 hover:underline font-medium text-purple-950"
            >
              AE {type} Practice Test {practice} (2026)
            </Link>
          </motion.li>
        </div>
      </div>
    </>
  );
}
