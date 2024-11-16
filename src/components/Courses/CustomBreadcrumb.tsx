"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

export default function CustomBreadcrumb({
  size = "sm",
}: {
  size?: "sm" | "md" | "lg";
}) {
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

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <nav aria-label="Breadcrumb" className={`${sizeClasses[size]} font-medium`}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/home"
            className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {pathArray.map((path, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={getPath(index)}
                className={`text-gray-800 dark:text-gray-200 hover:text-primary transition-colors duration-200 ${
                  index === pathArray.length - 1
                    ? "text-primary font-semibold"
                    : ""
                }`}
              >
                {renderPath(path)}
              </Link>
            </motion.div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
