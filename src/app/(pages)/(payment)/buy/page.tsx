"use client";

import { motion } from "framer-motion";
import NavBar from "@/components/Navbar/NavBar";
import { PayCourseCard } from "@/components/Pricing/PayCourseCard";

export default function BuyPage() {
  const courses = [
    {
      id: 1,
      courseName: "DSA CPP",
      price: 179,
    },
    {
      id: 2,
      courseName: "Web Development",
      price: 299,
    },
    {
      id: 3,
      courseName: "N2N Solutions",
      price: 359,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-background">
      <NavBar />

      <div className="container mx-auto px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-300 to-violet-800 bg-clip-text text-transparent pb-2">
            Choose Your Learning Path
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Select the course that best fits your needs and get instant access
            to comprehensive test answers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 py-8">
          {courses.map((course, index) => (
            <PayCourseCard
              key={course.id}
              {...course}
              index={index}
              isHighlighted={index === 1}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-400">
            Need help choosing? Contact us for personalized assistance
          </p>
        </motion.div>
      </div>
    </div>
  );
}
