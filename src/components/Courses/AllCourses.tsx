import React from "react";
import { motion } from "framer-motion";
import { Target, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function AllCourses() {
  const router = useRouter();

  const courses = [
    {
      id: 1,
      title: "Course - 1",
      subtitle: "Bullseye",
      icon: Target,
      path: "/c1",
    },
    {
      id: 2,
      title: "Course - 2",
      subtitle: "Perfectice",
      icon: Zap,
      path: "/c2",
    },
  ];

  return (
    <motion.div
      className="w-[80vw] lg:w-[60vw] py-2 md:py-8 overflow-hidden"
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            variants={fadeInUp}
            className="group cursor-pointer"
            onClick={() => router.push(course.path)}
          >
            <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-violet-500/50 transition-all duration-300 h-full">
              <div className="flex flex-col items-center text-center space-y-4">
                <course.icon className="w-12 h-12 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                    {course.title}
                  </h2>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mt-1">
                    ({course.subtitle})
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
