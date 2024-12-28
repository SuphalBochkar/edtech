"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 animate-pulse">
        <div className="w-full h-full rounded-xl backdrop-blur-xl" />
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative group flex items-center justify-center w-10 h-10 rounded-xl"
    >
      {/* Animated background */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 group-hover:from-violet-500/20 group-hover:to-purple-500/20 transition-all duration-300" />

      {/* Border gradient */}
      <div className="absolute inset-0 rounded-xl border border-violet-500/20 group-hover:border-violet-500/40 transition-colors duration-300" />

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 opacity-0 group-hover:opacity-70 blur-lg transition-opacity duration-500" />

      {/* Icon with animations */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
        className="relative z-10"
      >
        {resolvedTheme === "dark" ? (
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 180],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sun className="w-5 h-5 text-yellow-400" />
            </motion.div>
          </div>
        ) : (
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Moon className="w-5 h-5 text-violet-400" />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine rounded-xl" />
      </div>
    </motion.button>
  );
}
