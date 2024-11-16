"use client";

import { getPracticeTests } from "@/actions/keyData";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PracticeTestCard from "@/components/Courses/c1/PracticeTestCard";
import CustomBreadcrumb from "@/components/Courses/CustomBreadcrumb";

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
        <div className="mb-8">
          <CustomBreadcrumb />
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
