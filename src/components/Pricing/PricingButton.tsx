"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function PricingButton() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      className="relative my-8 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push("/buy")}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-violet-400 to-violet-600 rounded-lg blur-lg opacity-75"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      <button className="relative px-8 py-4 bg-gradient-to-r from-violet-500 to-violet-700 text-white font-bold text-lg rounded-lg shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50">
        <span className="flex items-center justify-center">
          <Sparkles className="w-5 h-5 mr-2" />
          View Pricing
        </span>
      </button>
      <motion.div
        className="absolute inset-0 border-2 border-violet-400 rounded-lg"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
