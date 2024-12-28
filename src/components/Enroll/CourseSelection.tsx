import { motion } from "framer-motion";
import { Sparkles, Calculator } from "lucide-react";
import { Course } from "@/lib/data";
import { CourseCard } from "./CourseCard";

interface CourseSelectionProps {
  courseGroups: {
    [key: string]: { id: Course; name: string }[];
  };
  selectedCourses: Course[];
  userCourses: Course[];
  onCourseToggle: (course: Course) => void;
  totalAmount: number;
}

export const CourseSelection = ({
  courseGroups,
  selectedCourses,
  userCourses,
  onCourseToggle,
  totalAmount,
}: CourseSelectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {Object.entries(courseGroups).map(([groupName, courses]) => (
        <div key={groupName} className="space-y-3">
          <h2 className="text-lg font-semibold text-violet-200 flex items-center gap-2 px-1">
            <Sparkles className="w-4 h-4 text-violet-400" />
            {groupName}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {courses.map(({ id, name }) => (
              <CourseCard
                key={id}
                courseId={id}
                name={name}
                isPurchased={userCourses.includes(id)}
                isSelected={selectedCourses.includes(id)}
                onToggle={onCourseToggle}
              />
            ))}
          </div>
        </div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-lg border border-violet-500/20 bg-black/50 backdrop-blur-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-violet-400" />
            <span className="text-violet-200 text-sm font-medium">
              Total Amount
            </span>
          </div>
          <span className="text-xl font-bold text-violet-300">
            ₹{totalAmount}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
