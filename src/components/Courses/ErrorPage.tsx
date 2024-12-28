"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Status } from "@/lib/types";

interface ErrorPageProps {
  status?: Status | null;
  text?: string;
  imageUrl?: string;
}

export default function ErrorPage({
  status = null,
  text,
  imageUrl = "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif",
}: ErrorPageProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[70vh] flex items-center justify-center p-4"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="relative p-8 rounded-lg border border-violet-500/20 bg-violet-500/5 backdrop-blur-xl"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 rounded-lg opacity-60 blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent animate-shine" />
          </div>

          <div className="flex flex-col items-center text-center space-y-6">
            {/* Image Section */}
            <motion.div whileHover={{ scale: 1.05 }} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg opacity-25 group-hover:opacity-40 blur transition duration-300" />
              <div className="relative">
                <Image
                  src={imageUrl}
                  alt={text || "Error"}
                  width={200}
                  height={200}
                  className="rounded-lg bg-violet-500/10 p-4"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-2 -right-2"
                >
                  <AlertCircle className="w-8 h-8 text-violet-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
                {text || "Something went wrong"}
              </h1>
              <p className="text-violet-300/80 text-sm md:text-base max-w-md mx-auto">
                {status === Status.Updating
                  ? "We're making things better. Please check back soon!"
                  : "Don't worry, we're here to help. Try refreshing the page."}
              </p>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="group relative px-6 py-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 opacity-0 group-hover:opacity-70 blur transition-opacity duration-300" />
              <div className="relative flex items-center gap-2 text-violet-200">
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-sm font-medium">
                  {status === null ? "Try Again" : "Refresh"}
                </span>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
