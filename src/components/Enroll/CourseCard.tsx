import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Course, CoursePrices } from "@/lib/data";

interface CourseCardProps {
  courseId: Course;
  name: string;
  isPurchased: boolean;
  isSelected: boolean;
  onToggle: (course: Course) => void;
}

export const CourseCard = ({
  courseId,
  name,
  isPurchased,
  isSelected,
  onToggle,
}: CourseCardProps) => {
  return (
    <motion.div
      whileHover={{
        scale: isPurchased ? 1 : 1.02,
        boxShadow: isPurchased ? "none" : "0 0 20px rgba(139, 92, 246, 0.1)",
      }}
      whileTap={{ scale: isPurchased ? 1 : 0.98 }}
      className={`relative aspect-square rounded-xl border-2 ${
        isPurchased
          ? "border-green-500/20 bg-green-500/5 cursor-not-allowed"
          : isSelected
            ? "border-violet-500 bg-violet-500/20"
            : "border-violet-500/20 hover:border-violet-500/40 bg-black/50"
      } backdrop-blur-xl p-3 transition-all duration-300 flex flex-col group`}
      onClick={() => !isPurchased && onToggle(courseId)}
    >
      {!isPurchased && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <div className="flex-1 flex flex-col relative">
        <h3 className="text-violet-200 text-sm font-medium leading-tight mb-2">
          {name}
        </h3>
        <div className="mt-auto flex items-end justify-between">
          <div className="space-y-0.5">
            {isPurchased ? (
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
                <p className="text-green-400 text-xs font-medium">
                  Already Purchased
                </p>
              </div>
            ) : (
              <>
                <p className="text-[10px] text-violet-400/70 font-medium uppercase tracking-wider">
                  Price
                </p>
                <p className="text-violet-300 text-lg font-bold">
                  ₹{CoursePrices[courseId]}
                </p>
              </>
            )}
          </div>
          {!isPurchased && (
            <div
              className={`w-6 h-6 rounded-full border-2 ${
                isSelected
                  ? "border-violet-500 bg-violet-500"
                  : "border-violet-500/50 group-hover:border-violet-500/70"
              } flex items-center justify-center transition-all duration-300`}
            >
              {isSelected && <Check className="w-4 h-4 text-white" />}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
