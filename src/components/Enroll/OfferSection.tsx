"use client";

import { motion } from "framer-motion";
import { Gift, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { Course, CourseNames } from "@/lib/data";

const OFFER_END_DATE = "2024-04-30";
const SPECIAL_BUNDLE_COURSE = Course.Course1Hitbulls;
const FREE_COURSE = Course.Course2V5;

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

export const OfferSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 14,
    minutes: 45,
    seconds: 23,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(OFFER_END_DATE) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex justify-center"
    >
      <div className="max-w-7xl rounded-xl border border-violet-500/20 bg-black/50 backdrop-blur-xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Gift className="w-5 h-5 text-violet-400 animate-bounce" />
              <span className="text-violet-300 font-medium">
                Special Bundle Offer!
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white">
              Get{" "}
              <span className="text-violet-400">
                {CourseNames[FREE_COURSE]}
              </span>{" "}
              for FREE
            </h2>
            <p className="text-violet-300/70 text-sm">
              When you purchase {CourseNames[SPECIAL_BUNDLE_COURSE]}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-violet-500/10 rounded-lg px-4 py-2">
            <Timer className="w-4 h-4 text-violet-400" />
            <div className="text-sm text-violet-300">
              Ends in:
              <span className="ml-2 font-mono font-bold">
                {`${timeLeft.hours.toString().padStart(2, "0")}:${timeLeft.minutes
                  .toString()
                  .padStart(2, "0")}:${timeLeft.seconds
                  .toString()
                  .padStart(2, "0")}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
