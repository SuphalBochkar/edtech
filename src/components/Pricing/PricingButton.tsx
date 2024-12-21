"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function PricingButton() {
  const router = useRouter();

  return (
    <motion.div
      className="relative group cursor-pointer my-4"
      onClick={() => router.push("/buy")}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient Background Effect */}
      <motion.div
        className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 opacity-75 blur-sm group-hover:opacity-100 transition duration-200"
        variants={{
          hover: {
            scale: 1.05,
          },
        }}
      />

      {/* Button Content */}
      <motion.button
        className="relative flex items-center justify-center px-6 py-2.5 rounded-lg bg-black border border-violet-500/20 backdrop-blur-sm"
        variants={{
          hover: {
            scale: 1.02,
          },
        }}
      >
        <Sparkles className="w-4 h-4 mr-2 text-violet-400" />
        <span className="text-sm font-medium bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
          View Pricing
        </span>
      </motion.button>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-violet-500/20 to-transparent opacity-0 group-hover:opacity-100"
        variants={{
          hover: {
            x: ["-100%", "100%"],
            transition: {
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            },
          },
        }}
      />
    </motion.div>
  );
}
