import React from "react";
import { motion } from "framer-motion";
import { Target, Zap, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const AllCourses = () => {
  const router = useRouter();

  const courses = [
    {
      id: 1,
      title: "Course - 1",
      subtitle: "Bullseye",
      icon: Target,
      path: "/c1",
      isNewlyUpdated: true,
    },
    {
      id: 2,
      title: "Course - 2",
      subtitle: "Perfectice",
      icon: Zap,
      path: "/c2",
      isNewlyUpdated: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-[80vw] md:w-[85vw] lg:w-[50vw] py-2 md:py-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-4"
      >
        <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
          Available Courses
        </h2>
      </motion.div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="group relative cursor-pointer"
            onClick={() => router.push(course.path)}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

            {/* Card Content */}
            <div className="relative p-4 md:p-5 rounded-xl backdrop-blur-xl border border-violet-500/20 hover:border-violet-500/50 transition-all duration-300 overflow-hidden">
              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
              </div>

              {/* New Badge */}
              {course.isNewlyUpdated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -8, 0],
                  }}
                  transition={{
                    delay: 0.5,
                    y: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="absolute top-3 right-3 flex items-center gap-2 bg-gradient-to-r from-violet-500 via-purple-600 to-violet-500 px-3 py-1 rounded-full shadow-lg border border-violet-400/30"
                >
                  <Sparkles className="w-3 h-3 text-white animate-pulse" />
                  <span className="text-[10px] font-medium text-white">
                    <span className="hidden md:inline">Newly </span>
                    Updated
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
                </motion.div>
              )}

              <div className="flex flex-col items-center text-center space-y-2">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-lg rounded-full" />
                  <course.icon className="relative w-10 h-10 p-2 rounded-lg bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
                </motion.div>

                {/* Title & Subtitle */}
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
                    {course.title}
                  </h3>
                  <p className="text-base md:text-lg font-medium bg-gradient-to-r from-violet-200 via-violet-300 to-violet-400 bg-clip-text text-transparent animate-pulse">
                    {course.subtitle}
                  </p>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-1 flex items-center gap-1 px-2 py-1 rounded-full bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/30 transition-all duration-300 text-violet-300/80 text-[10px]"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AllCourses;
