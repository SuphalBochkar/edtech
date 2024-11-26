import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface CourseCardProps {
  id: number;
  courseName: string;
  price: number;
  index: number;
  isHighlighted?: boolean;
}

export function PayCourseCard({
  courseName,
  price,
  index,
  isHighlighted = false,
}: CourseCardProps) {
  const features = [
    "Complete test answers",
    "Quick search functionality",
    "Image support included",
    "Free updates",
    "24/7 access",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative w-full max-w-sm mx-auto ${
        isHighlighted ? "scale-105 z-10" : "scale-100 z-0"
      }`}
    >
      {isHighlighted && (
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-violet-400 rounded-3xl blur opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 0.5 }}
        />
      )}

      <div
        className={`relative h-full backdrop-blur-lg border ${
          isHighlighted
            ? "border-violet-500/50 bg-black/80"
            : "border-violet-500/20 bg-black/50"
        } shadow-2xl rounded-3xl p-6 sm:p-8`}
      >
        <div className="text-center">
          <h3 className="inline-flex items-center justify-center text-xl font-semibold text-violet-400 mb-2">
            <Sparkles className="w-5 h-5 mr-2" />
            {courseName}
          </h3>

          <div className="mt-4 flex items-baseline justify-center gap-x-2">
            <span className="text-5xl font-bold text-violet-100">₹{price}</span>
            <span className="text-xl text-gray-400 line-through">₹500</span>
          </div>

          <p className="mt-6 text-sm text-gray-300">
            Complete access to all test answers
          </p>
        </div>

        <ul className="mt-8 space-y-4">
          {features.map((feature, i) => (
            <motion.li
              key={i}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <Check className="h-5 w-5 flex-shrink-0 text-violet-500 mr-2" />
              <span className="text-sm text-gray-300">{feature}</span>
            </motion.li>
          ))}
        </ul>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`mt-8 w-full rounded-full py-3 px-4 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
            isHighlighted
              ? "bg-violet-600 text-white hover:bg-violet-500 focus-visible:outline-violet-600"
              : "bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 focus-visible:outline-violet-500"
          }`}
        >
          Get Started (Do not Pay)
        </motion.button>
      </div>
    </motion.div>
  );
}
