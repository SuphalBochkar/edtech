"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon, Sparkles } from "lucide-react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-violet-500/20 animate-pulse">
        <div className="w-full h-full rounded-lg bg-violet-500/20" />
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={`
        relative group flex items-center justify-center w-9 h-9 rounded-lg
        bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/20
        hover:border-violet-500/50 transition-colors duration-300
      `}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine rounded-lg" />
      </div>

      {/* Icon container */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {resolvedTheme === "dark" ? (
            <div className="relative">
              <Sun className="w-5 h-5 text-yellow-400" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  repeatDelay: 3,
                }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-3 h-3 text-yellow-400" />
              </motion.div>
            </div>
          ) : (
            <div className="relative">
              <Moon className="w-5 h-5 text-violet-400" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  repeatDelay: 3,
                }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-3 h-3 text-violet-400" />
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
    </motion.button>
  );
}
