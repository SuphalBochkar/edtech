"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, Star } from "lucide-react";

const WelcomeMsg = ({ name, isPaid }: { name: string; isPaid: boolean }) => {
  const firstName = name.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="p-3 rounded-md text-center"
    >
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
        Welcome,{" "}
        <span className="font-bold bg-gradient-to-b from-violet-300 to-violet-800 bg-clip-text text-transparent">
          {firstName}
        </span>
      </h1>
      <div>
        Join
        <a
          href="https://t.me/+sYgr_ndeZQIzZTll"
          target="_blank"
          className="text-violet-500 px-1 hover:text-violet-600 transition-colors duration-200 inline-flex items-center"
        >
          Telegram
          <ExternalLink className="ml-1 h-4 w-4" />
        </a>{" "}
        group
      </div>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium ${
          isPaid
            ? "bg-gradient-to-r from-purple-500 to-purple-600"
            : "bg-gradient-to-r from-gray-600 to-gray-700"
        }`}
      >
        {isPaid ? (
          <Sparkles className="w-3 h-3" />
        ) : (
          <Star className="w-3 h-3" />
        )}
        <span>{isPaid ? "Premium User" : "Free User"}</span>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeMsg;
