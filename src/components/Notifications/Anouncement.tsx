"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, ChevronRight } from "lucide-react";

interface AnnouncementItem {
  id: number;
  message: string;
  link?: string;
}

const Announcement = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Sample announcements - you can replace these with your actual data
  const announcements: AnnouncementItem[] = [
    {
      id: 1,
      message: "New practice questions added for Physics module",
      link: "/physics",
    },
    {
      id: 2,
      message: "Important updates for Chemistry test series",
      link: "/chemistry",
    },
    {
      id: 3,
      message: "Mathematics live class scheduled for tomorrow",
      link: "/math",
    },
    {
      id: 4,
      message: "Complete your pending assignments before deadline",
      link: "/assignments",
    },
  ];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setIsVisible(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-xl bg-gradient-to-b from-gray-900/95 to-gray-800/95 rounded-xl border border-gray-700/50 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10">
                <AlertCircle className="w-5 h-5 text-indigo-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Important Announcement
              </h2>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Announcements List */}
          <div className="p-4 space-y-3">
            {announcements.map((announcement) => (
              <motion.div
                key={announcement.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: announcement.id * 0.1 }}
                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/30 transition-all duration-200 cursor-pointer"
                onClick={() =>
                  announcement.link && window.location.assign(announcement.link)
                }
              >
                <ChevronRight className="w-5 h-5 text-indigo-400" />
                <span className="text-gray-200 group-hover:text-white transition-colors">
                  {announcement.message}
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent"
                />
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700/50 text-center">
            <p className="text-sm text-gray-400">
              Click on any announcement to learn more
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Announcement;
