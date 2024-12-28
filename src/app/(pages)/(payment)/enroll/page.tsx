"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import NavBar from "@/components/Navbar/NavBar";
import { Course, CourseNames, CoursePrices } from "@/lib/data";
import { useState } from "react";
import FillSkeleton from "@/components/Pricing/FillSkeleton";
import { saveCourseRegistration } from "@/actions/user.actions";
import { CourseSelection } from "@/components/Enroll/CourseSelection";
import { PaymentSection } from "@/components/Enroll/PaymentSection";
import { OfferSection } from "@/components/Enroll/OfferSection";
import SuccessEnrollment from "@/components/Enroll/SuccessEnrollment";

const paidCourses = [
  Course.Course1Hitbulls,
  Course.Course2N2NCPP,
  Course.Course2N2NJAVA,
  Course.Course2N2NPYTHON,
  Course.Course2Place,
];

const EnrollPage = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (status === "loading") {
    return <FillSkeleton />;
  }

  const totalAmount = selectedCourses.reduce(
    (sum, course) => sum + CoursePrices[course],
    0
  );

  const userCourses = sessionData?.user?.courses || [];

  const handleCourseToggle = (course: Course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const handleSubmit = async () => {
    if (!imageUrl || selectedCourses.length === 0) {
      setError("Please select courses and upload payment proof");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!sessionData?.user?.id) {
        setError("User session not found");
        return;
      }

      const result = await saveCourseRegistration(
        sessionData.user.id,
        selectedCourses,
        imageUrl,
        totalAmount
      );

      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message || "Failed to submit registration");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const courseGroups = {
    "Course-1": paidCourses
      .filter((course) => course.startsWith("C1"))
      .map((course) => ({
        id: course,
        name: CourseNames[course],
      })),
    "Course-2": paidCourses
      .filter((course) => course.startsWith("C2"))
      .map((course) => ({
        id: course,
        name: CourseNames[course],
      })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <NavBar />
      <main className="flex-1 w-full overflow-y-auto">
        {isSuccess ? (
          <SuccessEnrollment
            courses={selectedCourses}
            totalAmount={totalAmount}
          />
        ) : (
          <div className="container mx-auto px-4 py-8 pb-20">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 mb-4">
                <Crown className="w-5 h-5 text-violet-400" />
                <span className="text-violet-300">Premium Access</span>
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent mb-2">
                Choose Your Learning Path
              </h1>
              <p className="text-violet-300/70">
                Select the courses you want to access
              </p>
            </motion.div>

            <OfferSection />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
              <CourseSelection
                courseGroups={courseGroups}
                selectedCourses={selectedCourses}
                userCourses={userCourses as Course[]}
                onCourseToggle={handleCourseToggle}
                totalAmount={totalAmount}
              />

              <PaymentSection
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                totalAmount={totalAmount}
                error={error}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                selectedCoursesCount={selectedCourses.length}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EnrollPage;
