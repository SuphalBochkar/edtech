"use client";

import { motion } from "framer-motion";

export default function LevelComponent({ level }: { level?: number }) {
  return (
    <motion.div
      className="relative w-[300px] h-[200px] overflow-hidden rounded-xl bg-purple-100 shadow-lg"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30" />

      <motion.div
        className="absolute -top-20 -left-20 w-[200px] h-[200px] bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-[200px] h-[200px] bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6">
        <h2 className="text-5xl font-bold text-purple-800 mb-2">
          Level {level}
        </h2>
        <p className="text-xl font-medium text-purple-700 mb-1">
          Aptitude & Programming
        </p>
        <p className="text-lg text-purple-600">Set A/B/C/D/E</p>
      </div>
    </motion.div>
  );
}
