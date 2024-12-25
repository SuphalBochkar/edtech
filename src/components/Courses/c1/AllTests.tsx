"use client";

import React from "react";
import { CalendarIcon, BookOpen, Sparkles, LucideIcon } from "lucide-react";
import { aeTests, levelTests } from "@/lib/data-c1";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Course, DisablePayment } from "@/lib/data";
import { motion } from "framer-motion";

export default function AllTests() {
  const router = useRouter();
  const { data: session } = useSession();
  const isEnrolled = session?.user?.courses?.includes(Course.Course1Hitbulls);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
          Available Tests
        </h1>
        <EnrollmentBadge isEnrolled={isEnrolled ?? false} />
      </motion.div>

      <div className="space-y-8">
        <section>
          <SectionHeader title="AE Tests" icon={BookOpen} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {aeTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PracticeCard
                  {...test}
                  onClick={() => router.push("/c1/practice/" + test.id)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Level Tests" icon={Sparkles} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {levelTests.map((obj, index) => (
              <motion.div
                key={obj.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LevelCard
                  level={obj.level}
                  isNew={obj.isNew}
                  onClick={() => router.push("/c1/level/" + obj.level)}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function EnrollmentBadge({ isEnrolled }: { isEnrolled: boolean }) {
  if (DisablePayment) {
    return <></>;
  }

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        ${
          isEnrolled
            ? "bg-green-500/10 text-green-400 ring-1 ring-green-500/20"
            : "bg-red-500/10 text-red-400 ring-1 ring-red-500/20"
        }
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-2 ${
          isEnrolled ? "bg-green-400" : "bg-red-400"
        }`}
      />
      {isEnrolled ? "Paid" : "Not Paid"}
    </span>
  );
}

function SectionHeader({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-5 h-5 text-violet-400" />
      <h2 className="text-lg font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
        {title}
      </h2>
    </div>
  );
}

function PracticeCard({
  name,
  type,
  date,
  onClick,
}: {
  name: string;
  type: string;
  date: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

      <div className="relative p-4 rounded-xl backdrop-blur-xl border border-violet-500/20 hover:border-violet-500/50 transition-all duration-300">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
        </div>

        <h3 className="text-sm font-semibold text-gray-200 mb-2 line-clamp-2">
          {name}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center text-violet-400/80 text-xs">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            {type}
          </div>
          <div className="flex items-center text-violet-400/80 text-xs">
            <CalendarIcon className="w-3.5 h-3.5 mr-1.5" />
            {date}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LevelCard({
  level,
  isNew,
  onClick,
}: {
  level: number;
  isNew: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

      <div className="relative p-4 rounded-xl backdrop-blur-xl border border-violet-500/20 hover:border-violet-500/50 transition-all duration-300">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
        </div>

        {isNew && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-violet-600 to-violet-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
            NEW
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
              Level {level}
            </h3>
            <p className="text-xs text-violet-400/80 mt-0.5">
              Aptitude & Programming
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {["A", "B", "C", "D", "E"].map((set) => (
            <span
              key={set}
              className="px-1.5 py-0.5 text-xs font-medium rounded-sm bg-violet-500/10 text-violet-300 border-b border-violet-500/20"
            >
              {set}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
