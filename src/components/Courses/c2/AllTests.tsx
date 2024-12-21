"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { testTypes } from "@/lib/data-c2";
import { Course, CourseNames } from "@/lib/data";
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
    <div className="w-full max-w-6xl mx-auto px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent mb-2">
          Available Tests
        </h1>
      </motion.div>

      <div className="space-y-8">
        <section>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-4"
          >
            <h2 className="text-lg font-semibold text-violet-300">
              Sample Test
            </h2>
            <div className="h-px flex-1 bg-violet-500/20" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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

        <section>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mb-4"
          >
            <h2 className="text-lg font-semibold text-violet-300">All Tests</h2>
            <div className="h-px flex-1 bg-violet-500/20" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
      className="group cursor-pointer relative overflow-hidden"
    >
      <div className="relative p-5 rounded-xl bg-gradient-to-b from-violet-500/10 to-violet-500/5 border border-violet-500/20 backdrop-blur-sm hover:border-violet-500/30 transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
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
        <p className="text-sm text-gray-400 mb-4">
          Access the {CourseNames[testName]} tests
        </p>

        {/* Footer */}
        <div className="flex items-center text-violet-400 group-hover:text-violet-300 transition-colors duration-200">
          <span className="text-sm font-medium mr-2">Start Course</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
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
      className="group cursor-pointer relative overflow-hidden"
    >
      <div className="relative p-5 rounded-xl bg-gradient-to-b from-violet-500/10 to-violet-500/5 border border-violet-500/20 backdrop-blur-sm hover:border-violet-500/30 transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-violet-500/20 text-violet-300">
            <FaCode className="w-5 h-5" />
          </div>
          <div className="flex gap-2">
            <Badge className="bg-green-500/20 text-green-300">
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 bg-green-400" />
              Free Access
            </Badge>
            <Badge>5 Levels</Badge>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-gray-200 mb-2">{testName}</h3>
        <p className="text-sm text-gray-400 mb-4">
          Try this free sample test to get a preview and an idea of our course
          content.
        </p>

        {/* Footer */}
        <div className="flex items-center text-violet-400 group-hover:text-violet-300 transition-colors duration-200">
          <span className="text-sm font-medium mr-2">Start Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
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
  if (!courses) {
    return <Badge className="text-gray-300">Loading...</Badge>;
  }

  const isPaid = courses.includes(testName);
  return (
    <Badge
      className={
        isPaid ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
      }
    >
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${isPaid ? "bg-green-400" : "bg-red-400"}`}
      />
      {isPaid ? "Enrolled" : "Enroll Now"}
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
      className={`text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${className}`}
    >
      {children}
    </span>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
}
