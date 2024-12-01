"use client";

import { getPracticeTests } from "@/actions/keyData";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PracticeTestCard from "@/components/Courses/c1/PracticeTestCard";
// import { AlertTriangle } from "lucide-react";

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
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-4xl mx-auto mb-8 backdrop-blur-lg border border-violet-500/20 shadow-2xl rounded-3xl p-6 sm:p-8 ring-1 ring-violet-500/50"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-violet-300 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
            Updated AE Analytical and Verbal Test
          </h2>
          <div className="space-y-4 text-gray-300 text-sm sm:text-base">
            <p>
              We apologize for the delay. It{"'"}s getting difficult to gather
              answers for practice tests. We{"'"}re trying our best to get the
              answers for the practice tests. Thank you for your patience!
            </p>
            <p className="font-semibold text-red-400">
              Important Note: The answers provided may not be 100% accurate at
              this time.
            </p>
          </div>
        </motion.div> */}

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
