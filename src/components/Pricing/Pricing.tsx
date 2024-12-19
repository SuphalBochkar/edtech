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
      className="relative flex flex-col items-center isolate px-3 sm:px-4 lg:px-6 py-4 sm:py-6 justify-center w-full text-left"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-md mx-auto backdrop-blur-lg border border-violet-500/20 shadow-2xl rounded-3xl p-6 sm:p-8 ring-1 ring-violet-500"
      >
        <div className="text-center">
          <h3 className="text-violet-400 text-base text-center sm:text-lg font-semibold leading-7 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 flex-shrink-0" />
            <span className="text-center">
              Get Instant Access to
              <br />
              {CourseNames[courseId]}
            </span>
          </h3>
          <div className="mt-3 sm:mt-4 flex items-baseline justify-center gap-x-2">
            <span className="text-3xl sm:text-5xl font-bold tracking-tight text-violet-100">
              ₹{CoursePrices[courseId]}
            </span>
            <span className="text-lg sm:text-xl text-gray-400 line-through">
              ₹59
            </span>
          </div>
        </div>

        <p className="text-gray-300 mt-3 sm:mt-4 text-sm sm:text-base text-center font-medium">
          Quick Access to Any test • Instant Payment • Full Access
        </p>
        <div className="mt-4 text-center">
          <h4 className="text-lg font-bold tracking-tight bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
            <span className="text-violet-300 text-sm">🌟</span>
            Unlock These Amazing Features
          </h4>
        </div>

        <ul className="mt-4 sm:mt-6 space-y-3 text-gray-300 text-xs sm:text-sm leading-5 sm:leading-6 text-left">
          {[
            {
              feature: `✨ Instant access to complete ${CourseNames[courseId]} solutions`,
              highlight: true,
            },
            {
              feature:
                "🚀 Start any test instantly with direct links provided - No waiting time!",
              highlight: true,
            },
            {
              feature:
                "💳 Pay easily with UPI, QR code, or payment apps (PhonePe, GooglePay, PayTM)",
              highlight: true,
            },
            {
              feature: "🔍 Quick search with image support",
              highlight: true,
            },
            {
              feature: "🔒 100% verified answers you can trust",
              highlight: true,
            },
            {
              feature: "♾️ Full access with free updates & all upcoming tests",
              highlight: true,
            },
          ].map((item, index) => (
            <motion.li
              key={index}
              className={`flex items-start ${item.highlight ? "text-violet-300 font-medium" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Check
                className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${item.highlight ? "text-violet-400" : "text-violet-500"} mr-2 sm:mr-3`}
              />
              <span className="flex-1">{item.feature}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-400">
          Supports PhonePe, Google Pay, Paytm & all UPI apps
        </div>

        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-violet-500 text-white shadow-lg hover:bg-violet-600 focus-visible:outline-violet-500 mt-3 block rounded-full py-2.5 sm:py-3 text-center text-sm sm:text-base font-semibold transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
          onClick={() => router.push(`/pay/${id}`)}
        >
          Pay & Get Access Now
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default Pricing;
