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
  [Course.Course2Place]: <FaCode className="w-5 h-5 sm:w-6 sm:h-6" />,
  [Course.Course2V5]: <FaTerminal className="w-5 h-5 sm:w-6 sm:h-6" />,
  [Course.Course2N2NCPP]: <SiCplusplus className="w-5 h-5 sm:w-6 sm:h-6" />,
  [Course.Course2N2NJAVA]: <FaJava className="w-5 h-5 sm:w-6 sm:h-6" />,
  [Course.Course2N2NPYTHON]: <FaPython className="w-5 h-5 sm:w-6 sm:h-6" />,
};

export default function AllTests() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:py-8 md:py-10">
      <motion.h1
        className="text-lg md:text-2xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Available Tests
      </motion.h1>
      <div className="space-y-8">
        <div>
          <h2 className="text-lg md:text-2xl font-bold mb-4">Sample Test</h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <SampleTestType
              testName={"Sample Course"}
              onClick={() => router.push(`/c2/sample`)}
            />
          </motion.div>
        </div>
        <div className="">
          <h2 className="text-lg md:text-2xl font-bold mb-4">All Tests</h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1,
                },
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
        </div>
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
  courses: Course[] | undefined;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="border-2 border-gray-500 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>{iconMap[testName]}</div>
          <div className="flex gap-2">
            <StatusBadge courses={courses} testName={testName} />
            <Badge>5 Levels</Badge>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2">{CourseNames[testName]}</h3>
        <p className="text-sm text-gray-300 mb-3">
          Master your skills in {CourseNames[testName]} tests
        </p>
        <div className="flex items-center text-purple-500">
          <span className="text-sm font-medium mr-1">
            {/* Go to {CourseNames[testName]} */}
            Go to Course
          </span>
          <ArrowRight className="w-4 h-4" />
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
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="border border-gray-500 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <FaCode className="w-5 h-5" />
          </div>
          <div className="flex gap-2">
            <Badge className="bg-green-500/20 text-green-300">
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 bg-green-400" />
              {"Free Access"}
            </Badge>
            <Badge>5 Levels</Badge>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2">{testName}</h3>
        <p className="text-sm text-gray-300 mb-3">
          Master your skills in Sample Test
        </p>
        <div className="flex items-center text-purple-500">
          <span className="text-sm font-medium mr-1">Start Now</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

function StatusBadge({
  courses,
  testName,
}: {
  courses: Course[] | undefined;
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
