"use client";

import { getPracticeTests } from "@/actions/keyData";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Crown, BookOpen, Code2 } from "lucide-react";

export default function Page({ params }: { params: { practice: string } }) {
  const router = useRouter();
  const data = getPracticeTests(params.practice);

  if (!data || data === null) {
    router.push("/c1/");
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col items-center px-4 py-8"
    >
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8 space-y-2"
      >
        {/* Practice Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 backdrop-blur-sm"
        >
          <Crown className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium text-violet-300">
            Practice Test {params.practice}
          </span>
        </motion.div>

        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
          AE Practice Tests (2026)
        </h1>
      </motion.div>

      {/* Cards Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(data).map(([type], index) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <PracticeTestCard practice={params.practice} type={type} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

type PracticeTestCardProps = {
  practice: string;
  type: string;
};

function PracticeTestCard({ practice, type }: PracticeTestCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group rounded-xl backdrop-blur-xl border border-violet-500/20 overflow-hidden"
    >
      {/* Shine Effect */}
      {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
      </div> */}

      <Link href={`/c1/practice/${practice}/${type}`}>
        <div className="p-6 space-y-4">
          {/* Card Header */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-500/10">
              {type === "analytical" ? (
                <BookOpen className="w-5 h-5 text-violet-400" />
              ) : (
                <Code2 className="w-5 h-5 text-violet-400" />
              )}
            </div>
            <h3 className="text-lg font-medium text-violet-300">
              AE {type[0].toUpperCase() + type.substring(1).toLowerCase()}
            </h3>
          </div>

          {/* Card Content */}
          <div className="flex items-center justify-between group/item">
            <div className="space-y-1">
              <p className="text-sm text-violet-300/70">
                Practice Test {practice}
              </p>
              <p className="text-xs text-violet-400/50">Year 2026</p>
            </div>
            <motion.div
              whileHover={{ x: 5 }}
              className="p-2 rounded-full bg-violet-500/10 group-hover/item:bg-violet-500/20 transition-all duration-300"
            >
              <ArrowRight className="w-4 h-4 text-violet-400 group-hover/item:text-violet-300 transition-colors duration-300" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
