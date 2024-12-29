"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BellRing, ExternalLink } from "lucide-react";

interface AnnouncementItem {
  id: number;
  title: string;
  message: string;
  type: "update" | "important" | "info";
  link?: string;
}

const ANNOUNCEMENT_LAST_SHOWN_KEY = "announcement_last_shown_time";
const SHOW_INTERVAL = 60 * 60 * 1000;

const Announcement = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const lastShownTime = localStorage.getItem(ANNOUNCEMENT_LAST_SHOWN_KEY);
    const currentTime = new Date().getTime();

    if (!lastShownTime) {
      setIsVisible(true);
      localStorage.setItem(ANNOUNCEMENT_LAST_SHOWN_KEY, currentTime.toString());
    } else {
      const timeDiff = currentTime - parseInt(lastShownTime);
      if (timeDiff > SHOW_INTERVAL) {
        setIsVisible(true);
        localStorage.setItem(
          ANNOUNCEMENT_LAST_SHOWN_KEY,
          currentTime.toString()
        );
      }
    }
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const announcements: AnnouncementItem[] = [
    {
      id: 1,
      title: "Deadline for both Course-1 & Course-2",
      message:
        "Please complete all pending assessments for Level 1 and Level 2 by December 31st, 2024",
      type: "important",
    },
    {
      id: 2,
      title:
        "Warning: Protect Your Account - Avoid Using Tools or Sharing Info",
      message:
        "Please do not use any extensions or tools to complete the tests, as flags are being generated and you might be detected. Do not share your account credentials or pay others to complete your tests, as they may use automation tools, putting your account at risk.",
      type: "important",
    },
    {
      id: 2,
      title: "Course-2 (Perfectice) Notice",
      message:
        "For those who the Level 2 is not yet unlocked, you can still access the tests by clicking on the 'Start Test' or 'Test' button next to each test name. Check out the sample test for more details. Click link on your right to check it out.",
      type: "important",
      link: "/c2/sample",
    },
    {
      id: 3,
      title: "Course-1 (Bullseye) Update",
      message: "Level 2 & 3 tests have been updated with new content",
      type: "update",
      link: "/c1",
    },
    {
      id: 4,
      title: "Course-2 (Perfectice) Update",
      message:
        "New tests have been added for Course-2 (Perfectice) Level 1 and Level 2",
      type: "update",
      link: "/c2",
    },
  ];

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-2xl relative overflow-hidden group"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Enhanced Background Effects */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-violet-500/10 to-violet-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" /> */}

          {/* Main Content */}
          <div className="relative rounded-2xl border border-violet-500/20 bg-black/80 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Enhanced Header */}
            <div className="p-6 border-b border-violet-500/20 bg-violet-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute -inset-1 rounded-full bg-violet-500/20 blur-sm animate-pulse" />
                    <div className="relative p-2.5 rounded-full bg-violet-500/10 border border-violet-500/20">
                      <BellRing className="w-6 h-6 text-violet-400" />
                    </div>
                  </motion.div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
                      Important Announcements
                    </h2>
                    <p className="text-xs md:text-sm text-violet-400/70 mt-0.5">
                      Please read these announcements carefully{" "}
                      <span className="px-2 py-0.5 rounded-full font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        Do not ignore
                      </span>
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-violet-500/10 text-violet-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Enhanced Announcements List */}
            <div className="p-4 md:p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group/item relative rounded-xl border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 transition-all duration-300"
                >
                  <div className="p-4 md:p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm md:text-base font-semibold text-violet-200">
                            {announcement.title}
                          </h3>
                          {announcement.type === "important" && (
                            <span className="px-2 py-0.5 rounded-full text-[8px] md:text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                              Important
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-xs md:text-sm leading-relaxed text-violet-300/70">
                          {announcement.message}
                        </p>
                      </div>
                      {announcement.link && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            window.location.assign(announcement.link || "/home")
                          }
                          className="p-2 md:p-2.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 transition-colors group border border-violet-500/20"
                        >
                          <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-violet-400 group-hover:text-violet-300" />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Shine Effect */}
                  {/* <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine rounded-xl" />
                  </div> */}
                </motion.div>
              ))}
            </div>

            {/* Enhanced Footer */}
            <div className="p-3 md:p-4 border-t border-violet-500/20 bg-violet-500/5">
              <p className="text-[10px] md:text-xs text-center text-violet-400/70">
                Press ESC or click outside to close
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Announcement;
