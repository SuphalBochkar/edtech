"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { testTypes } from "@/lib/data-c2";
import { Course, CourseNames, DisablePayment } from "@/lib/data";
import { useSession } from "next-auth/react";
import { FaCode, FaTerminal, FaPython, FaJava } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const iconMap: Partial<Record<Course, JSX.Element>> = {
  [Course.Course2Place]: <FaCode className="w-5 h-5" />,
  [Course.Course2V5]: <FaTerminal className="w-5 h-5" />,
  [Course.Course2N2NCPP]: <SiCplusplus className="w-5 h-5" />,
  [Course.Course2N2NJAVA]: <FaJava className="w-5 h-5" />,
  [Course.Course2N2NPYTHON]: <FaPython className="w-5 h-5" />,
};

export default function AllTests() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-2">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
          Available Tests
        </h1>
      </motion.div>

      <div className="space-y-6">
        {/* Sample Test Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-3"
          >
            <h2 className="text-lg font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
              Sample Test
            </h2>
            <div className="h-px flex-1 bg-violet-500/20" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <SampleTestType
              testName="Sample Course"
              onClick={() => router.push(`/c2/sample`)}
            />
          </motion.div>
        </section>

        {/* All Tests Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mb-3"
          >
            <h2 className="text-lg font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
              All Tests
            </h2>
            <div className="h-px flex-1 bg-violet-500/20" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {testTypes.map((type) => (
              <TestTypeComponent
                key={type.name}
                testName={type.name}
                onClick={() => router.push(`/c2${type.path}`)}
                courses={session?.user.courses}
              />
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}

function TestTypeComponent({
  testName,
  onClick,
  courses,
}: {
  testName: Course;
  onClick: () => void;
  courses: string[] | undefined;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

      <div className="relative p-4 rounded-xl backdrop-blur-xl border border-violet-500/20 hover:border-violet-500/50 transition-all duration-300">
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-lg bg-violet-500/20 text-violet-300">
            {iconMap[testName]}
          </div>
          <div className="flex gap-2">
            <StatusBadge courses={courses} testName={testName} />
            <Badge>5 Levels</Badge>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-gray-200 mb-2">
          {CourseNames[testName]}
        </h3>
        <p className="text-sm text-violet-400/80 mb-3">
          Access the {CourseNames[testName]} tests
        </p>

        {/* Footer */}
        <div className="flex items-center text-violet-400 group-hover:text-violet-300 transition-colors duration-200">
          <span className="text-sm font-medium mr-2">Start Course</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </motion.div>
  );
}

function SampleTestType({
  testName,
  onClick,
}: {
  testName: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

      <div className="relative p-4 rounded-xl backdrop-blur-xl border border-violet-500/20 hover:border-violet-500/50 transition-all duration-300">
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-lg bg-violet-500/20 text-violet-300">
            <FaCode className="w-5 h-5" />
          </div>
          <div className="flex gap-2">
            {!DisablePayment && (
              <Badge className="bg-green-500/10 text-green-300">
                <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 bg-green-400" />
                Free Access
              </Badge>
            )}
            <Badge>5 Levels</Badge>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-gray-200 mb-2">{testName}</h3>
        <p className="text-sm text-violet-400/80 mb-3">
          Try this free sample test to get started
        </p>

        {/* Footer */}
        <div className="flex items-center text-violet-400 group-hover:text-violet-300 transition-colors duration-200">
          <span className="text-sm font-medium mr-2">Start Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </motion.div>
  );
}

function StatusBadge({
  courses,
  testName,
}: {
  courses: string[] | undefined;
  testName: Course;
}) {
  if (DisablePayment) {
    return <></>;
  }

  if (!courses) {
    return <Badge className="text-gray-300">Loading...</Badge>;
  }

  const isPaid = courses.includes(testName);
  return (
    <Badge
      className={
        isPaid ? "bg-green-500/10 text-green-300" : "bg-red-500/10 text-red-300"
      }
    >
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${isPaid ? "bg-green-400" : "bg-red-400"}`}
      />
      {isPaid ? "Enrolled" : "Not Enrolled"}
    </Badge>
  );
}

function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${className}`}
    >
      {children}
    </span>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="relative">
        <div className="absolute inset-0 rounded-full border-2 border-violet-500/20 animate-ping" />
        <div className="w-12 h-12 rounded-full border-2 border-violet-500/40 border-t-violet-500 animate-spin" />
      </div>
    </div>
  );
}
