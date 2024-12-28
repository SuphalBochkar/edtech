import { Course, CourseNames } from "@/lib/data";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  PartyPopper,
  ChevronRight,
  Clock,
  Mail,
} from "lucide-react";
import Link from "next/link";

interface SuccessEnrollmentProps {
  courses: Course[];
  totalAmount: number;
}

export default function SuccessEnrollment({
  courses,
  totalAmount,
}: SuccessEnrollmentProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>

        {/* Header */}
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2"
          >
            <PartyPopper className="w-5 h-5 text-violet-400" />
            <h1 className="text-3xl font-bold text-white">
              Enrollment Successful!
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-violet-300"
          >
            Thank you for enrolling in our courses
          </motion.p>
        </div>

        {/* Course Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black/40 backdrop-blur-xl rounded-xl border border-violet-500/20 p-6 space-y-4"
        >
          <div className="space-y-3">
            <h3 className="text-violet-200 font-medium">Enrolled Courses:</h3>
            <ul className="space-y-2">
              {courses.map((course, index) => (
                <motion.li
                  key={course}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-2 text-violet-300"
                >
                  <ChevronRight className="w-4 h-4 text-violet-400" />
                  <span>{CourseNames[course]}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="border-t border-violet-500/20 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-violet-300">Total Amount:</span>
              <span className="text-xl font-bold text-white">
                ₹{totalAmount}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-violet-300">
            <Clock className="w-4 h-4" />
            <p className="text-sm">
              Your enrollment is being reviewed. We{"'"}ll notify you once
              approved.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-violet-300">
            <Mail className="w-4 h-4" />
            <p className="text-sm">
              Check your email for further instructions.
            </p>
          </div>

          <Link
            href="/home"
            className="inline-block mt-4 px-6 py-3 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors duration-300"
          >
            Go to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
