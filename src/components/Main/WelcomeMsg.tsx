"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Crown, Rocket } from "lucide-react";

const WelcomeMsg = ({ name, isPaid }: { name: string; isPaid: boolean }) => {
  const firstName = name.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative py-4 px-6 rounded-2xl text-center"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main Content */}
      <div className="relative space-y-3">
        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-sm text-violet-400/80">Welcome back</span>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
              {firstName}
            </span>
          </h1>
        </motion.div>

        {/* User Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative group flex items-center gap-2 px-4 py-2 rounded-full
              backdrop-blur-sm border transition-all duration-300
              ${
                isPaid
                  ? "bg-violet-500/10 border-violet-500/30 hover:border-violet-500/50"
                  : "bg-gray-500/10 border-gray-500/30 hover:border-gray-500/50"
              }
            `}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
            </div>

            {/* Icon */}
            <motion.div
              animate={
                isPaid
                  ? {
                      rotate: [0, -10, 10, 0],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative"
            >
              {isPaid ? (
                <Crown className="w-4 h-4 text-violet-400" />
              ) : (
                <Rocket className="w-4 h-4 text-gray-400" />
              )}
              <Sparkles className="absolute -top-1 -right-1 w-2 h-2 text-yellow-400" />
            </motion.div>

            {/* Status Text */}
            {/* <span
              className={`text-xs font-medium ${
                isPaid ? "text-violet-300" : "text-gray-300"
              }`}
            >
              {isPaid ? "Premium Member" : "Standard Member"}
            </span> */}

            {/* Additional Icons for Premium */}
            {isPaid && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-1 -right-1"
              >
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeMsg;
