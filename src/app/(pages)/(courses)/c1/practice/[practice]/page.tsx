"use client";

import { getPracticeTests } from "@/actions/keyData";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PracticeTestCard from "@/components/Courses/c1/PracticeTestCard";

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function Page({ params }: { params: { practice: string } }) {
  const router = useRouter();
  const data = getPracticeTests(params.practice);

  if (!data || data === null) {
    router.push("/c1/");
    return null;
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Updated AE Analytical Test
          </h2>
          <p className="text-base mb-2">
            Updating the verbal answers. It will be updated soon, as it{"'"}s
            getting difficult to gather answers for practice tests. We{"'"}re
            trying our best to get the answers for the practice tests. Thank you
            for your patience!
          </p>
          <p className="text-sm text-gray-700">
            Note: The answers provided may not be 100% accurate at this time.
          </p>
        </div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.entries(data).map(([type], i) => (
            <motion.div key={i} variants={fadeInUp}>
              <PracticeTestCard practice={params.practice} type={type} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
