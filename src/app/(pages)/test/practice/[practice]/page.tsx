"use client";

import PracticeTestCard from "@/components/Tests/PracticeTestCard";
import { getPracticeTests } from "@/actions/keyData";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CustomBreadcrumb from "@/components/Tests/CustomBreadcrumb";

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const Page = ({
  params,
}: {
  params: {
    practice: string;
  };
}) => {
  const router = useRouter();
  const data = getPracticeTests(params.practice);

  if (!data || data === null) {
    router.push("/test/");
    return;
  }

  return (
    <div className="flex flex-col justify-center items-center py-3 md:py-8">
      <div className="w-[90vw] lg:w-[70vw] py-4 md:py-10 rounded-lg overflow-hidden">
        <div className="p-4 md:justify-start">
          <CustomBreadcrumb />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(data).map(([type], i) => (
            <motion.div key={i} variants={fadeInUp} className="p-4 rounded-lg">
              <PracticeTestCard practice={params.practice} type={type} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
