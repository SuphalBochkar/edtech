"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Home, Sparkles } from "lucide-react";

export default function CustomBreadcrumb() {
  const pathname = usePathname();

  const pathArray = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1));

  const renderPath = (path: string) => {
    if (path === "C1") return "C1";
    if (path === "Practice") return "AE Practice";
    return path;
  };

  const getPath = (index: number) => {
    if (pathArray[index] === "Practice" || pathArray[index] === "Level")
      return "/c1";
    if (pathArray[index] === "Aptitude" || pathArray[index] === "Programming")
      return `/c1/level/${pathArray[2]}`;
    return `/${pathArray
      .slice(0, index + 1)
      .join("/")
      .toLowerCase()}`;
  };

  return (
    <nav aria-label="Breadcrumb" className="relative">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-violet-500/5 rounded-lg backdrop-blur-sm" />

      <ol className="relative flex flex-wrap items-center py-1 px-2 rounded-lg">
        <motion.li
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/home"
            className="group relative flex items-center text-violet-400 hover:text-violet-300 transition-colors duration-200"
          >
            <div className="absolute inset-0 rounded-lg bg-violet-500/10 scale-0 group-hover:scale-100 transition-transform duration-200" />
            <Home className="relative w-4 h-4" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                repeatDelay: 5,
              }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-2 h-2 text-violet-400" />
            </motion.div>
          </Link>
        </motion.li>

        {pathArray.map((path, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center"
          >
            <ChevronRight className="w-4 h-4 mx-2 text-violet-500/50" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link
                href={getPath(index)}
                className="relative flex items-center"
              >
                {/* Hover effect for non-active items */}
                {index !== pathArray.length - 1 && (
                  <div className="absolute inset-0 rounded-md bg-violet-500/10 scale-0 group-hover:scale-100 transition-transform duration-200" />
                )}

                {/* Text content with proper spacing for sparkle */}
                <span
                  className={`
                    relative px-1.5 py-0.5 text-sm font-medium
                    ${
                      index === pathArray.length - 1
                        ? "pr-4 bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent font-semibold"
                        : "text-violet-400 hover:text-violet-300"
                    }
                  `}
                >
                  {renderPath(path)}
                </span>

                {/* Sparkle effect for active item */}
                {index === pathArray.length - 1 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      repeatDelay: 5,
                    }}
                    className="absolute -top-1 right-0"
                  >
                    <Sparkles className="w-2 h-2 text-violet-400" />
                  </motion.div>
                )}
              </Link>
            </motion.div>
          </motion.li>
        ))}
      </ol>

      {/* Subtle gradient line underneath */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
    </nav>
  );
}
