import Link from "next/link";
import { motion } from "framer-motion";
import { Dot, ExternalLink } from "lucide-react";

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
      <div className="">
        <div>
          <motion.li
            key={practice}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center space-x-2"
          >
            {/* <ChevronRight size={16} /> */}
            <Dot />
            <Link
              href={`/test/practice/${practice}/${type}`}
              className="flex gap-1 items-center dark:text-purple-300 hover:underline font-medium text-purple-950"
            >
              AE {type[0].toUpperCase() + type.substring(1).toLowerCase()}{" "}
              Practice Test {practice} (2026)
              <ExternalLink className="ml-1 h-4 w-4" />
            </Link>
          </motion.li>
        </div>
      </div>
    </>
  );
}
