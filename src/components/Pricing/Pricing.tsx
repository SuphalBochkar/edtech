import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Course, CourseNames, CoursePrices } from "@/lib/data";

const Pricing = ({ courseId, id }: { courseId: Course; id: string }) => {
  const router = useRouter();

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        damping: 10,
        delay: 0.3,
      }}
      initial={{ y: -20, opacity: 0 }}
      className="relative flex flex-col items-center isolate text-background px-4 sm:px-6 lg:px-8 py-6 sm:py-12 justify-center w-full"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-md mx-auto backdrop-blur-lg border border-violet-500/20 shadow-2xl rounded-3xl p-6 sm:p-8 ring-1 ring-violet-500/50"
      >
        <div className="text-center">
          <h3 className="text-violet-400 text-lg sm:text-xl font-semibold leading-7 flex items-center justify-center">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Full Access to {CourseNames[courseId]} Answers
          </h3>
          <div className="mt-4 sm:mt-6 flex items-baseline justify-center gap-x-2">
            <span className="text-4xl sm:text-6xl font-bold tracking-tight text-violet-100">
              ₹{CoursePrices[courseId]}
            </span>
            <span className="text-xl sm:text-2xl text-gray-400 line-through">
              ₹89
            </span>
          </div>
        </div>

        <p className="text-gray-300 mt-4 sm:mt-6 text-base sm:text-lg text-center font-medium">
          All Test Answers, Right at Your Fingertips
        </p>

        <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-gray-300 text-xs sm:text-sm leading-5 sm:leading-6 text-left">
          {[
            `Access answers for every level test of ${CourseNames[courseId]}`,
            "Quickly search and locate specific questions and images support",
            "No more searching in PDF's",
            "A secure, reliable alternative to misleading sources",
            "Free access to all upcoming tests once registered",
          ].map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Check className="h-4 w-4 sm:h-6 sm:w-6 flex-shrink-0 text-violet-500 mr-2 sm:mr-3" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-violet-500 text-white shadow-lg hover:bg-violet-600 focus-visible:outline-violet-500 mt-6 sm:mt-8 block rounded-full py-2 sm:py-3 text-center text-base sm:text-lg font-semibold transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
          onClick={() => router.push(`/pay/${id}`)}
        >
          Get Access Now
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default Pricing;
