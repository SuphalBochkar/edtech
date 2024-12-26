"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Crown,
  Check,
  Upload,
  Trash2,
  Calculator,
  QrCode,
  Sparkles,
  Timer,
  Gift,
} from "lucide-react";
import NavBar from "@/components/Navbar/NavBar";
import { Course, CourseNames, CoursePrices } from "@/lib/data";
import { useState, useEffect } from "react";
import Image from "next/image";
import QRImage from "@/assets/qr-code.png";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import FillSkeleton from "@/components/Pricing/FillSkeleton";
// import { saveCourseRegistration } from "@/actions/user.actions";

const paidCourses = [
  Course.Course1Hitbulls,
  Course.Course2N2NCPP,
  Course.Course2N2NJAVA,
  Course.Course2N2NPYTHON,
  Course.Course2Place,
  //   Course.Course2V5,
];

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

const OFFER_END_DATE = "2024-04-30";
const SPECIAL_BUNDLE_COURSE = Course.Course1Hitbulls;
const FREE_COURSE = Course.Course2V5;

const FillPage = () => {
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

  if (status === "loading") {
    return <FillSkeleton />;
  }

  const totalAmount = selectedCourses.reduce(
    (sum, course) => sum + CoursePrices[course],
    0
  );

  const userCourses = sessionData?.user?.courses || [];

  const isCourseAlreadyPurchased = (courseId: Course) => {
    return userCourses.includes(courseId);
  };

  const handleCourseToggle = (course: Course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      //   const result = await saveCourseRegistration(
      //     sessionData.user.id,
      //     selectedCourses,
      //     imageUrl
      //   );

      const result = {
        success: true,
        message: "Registration Not successful",
      };

      if (result.success) {
        router.push("/success");
      } else {
        setError(result.message || "Failed to submit registration");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Group courses by type
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

  const CourseCard = ({
    courseId,
    name,
  }: {
    courseId: Course;
    name: string;
  }) => {
    const isPurchased = isCourseAlreadyPurchased(courseId);

    return (
      <motion.div
        key={courseId}
        whileHover={{
          scale: isPurchased ? 1 : 1.02,
          boxShadow: isPurchased ? "none" : "0 0 20px rgba(139, 92, 246, 0.1)",
        }}
        whileTap={{ scale: isPurchased ? 1 : 0.98 }}
        className={`relative aspect-square rounded-xl border-2 ${
          isPurchased
            ? "border-green-500/20 bg-green-500/5 cursor-not-allowed"
            : selectedCourses.includes(courseId)
              ? "border-violet-500 bg-violet-500/20"
              : "border-violet-500/20 hover:border-violet-500/40 bg-black/50"
        } backdrop-blur-xl p-3 transition-all duration-300 flex flex-col group`}
        onClick={() => !isPurchased && handleCourseToggle(courseId)}
      >
        {/* Gradient Overlay */}
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
                  selectedCourses.includes(courseId)
                    ? "border-violet-500 bg-violet-500"
                    : "border-violet-500/50 group-hover:border-violet-500/70"
                } flex items-center justify-center transition-all duration-300`}
              >
                {selectedCourses.includes(courseId) && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
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
          {/* Course Selection Section */}
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
                    <CourseCard key={id} courseId={id} name={name} />
                  ))}
                </div>
              </div>
            ))}

            {/* Total Amount */}
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

          {/* Payment Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* QR Code */}
            <motion.div className="rounded-lg border border-violet-500/20 bg-black/50 backdrop-blur-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-violet-400" />
                  <h3 className="text-violet-200 text-sm font-medium">
                    Payment QR Code
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative aspect-square max-w-[200px] mx-auto">
                  <Image
                    src={QRImage}
                    alt="Payment QR Code"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-violet-500/10">
                    <span className="text-violet-300 text-sm">
                      Total Amount
                    </span>
                    <span className="text-violet-200 font-bold">
                      ₹{totalAmount}
                    </span>
                  </div>
                  <p className="text-center text-xs text-violet-300/70">
                    Scan QR code to complete payment
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Payment Proof Upload */}
            <motion.div className="rounded-lg border border-violet-500/20 bg-black/50 backdrop-blur-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-4 h-4 text-violet-400" />
                <h3 className="text-violet-200 text-sm font-medium">
                  Upload Payment Screenshot
                </h3>
              </div>

              <div className="space-y-4">
                {imageUrl ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <CldImage
                      width="600"
                      height="400"
                      src={imageUrl}
                      alt="Payment proof"
                      className="w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl("");
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500/90 text-white hover:bg-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <CldUploadWidget
                    uploadPreset="pvknlh5s"
                    onSuccess={(result) => {
                      if (
                        typeof result.info !== "string" &&
                        result?.info?.secure_url
                      ) {
                        setImageUrl(result.info.secure_url);
                      }
                    }}
                  >
                    {({ open }) => (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => open()}
                        className="w-full py-8 rounded-lg border-2 border-dashed border-violet-500/30 hover:border-violet-500/50 transition-colors"
                      >
                        <Upload className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                        <p className="text-xs text-violet-300">
                          Click to upload screenshot
                        </p>
                      </motion.button>
                    )}
                  </CldUploadWidget>
                )}
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-red-400 text-xs"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={
                isSubmitting || selectedCourses.length === 0 || !imageUrl
              }
              className="w-full py-3 rounded-lg bg-violet-500 hover:bg-violet-600 disabled:bg-violet-500/50 text-white text-sm font-medium transition-all duration-300"
            >
              {isSubmitting ? "Processing..." : "Complete Registration"}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FillPage;

const OfferSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 14,
    minutes: 45,
    seconds: 23,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(OFFER_END_DATE) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex justify-center"
    >
      <div className="max-w-7xl rounded-xl border border-violet-500/20 bg-black/50 backdrop-blur-xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Gift className="w-5 h-5 text-violet-400 animate-bounce" />
              <span className="text-violet-300 font-medium">
                Special Bundle Offer!
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white">
              Get{" "}
              <span className="text-violet-400">
                {CourseNames[FREE_COURSE]}
              </span>{" "}
              for FREE
            </h2>
            <p className="text-violet-300/70 text-sm">
              When you purchase {CourseNames[SPECIAL_BUNDLE_COURSE]}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-violet-500/10 rounded-lg px-4 py-2">
            <Timer className="w-4 h-4 text-violet-400" />
            <div className="text-sm text-violet-300">
              Ends in:
              <span className="ml-2 font-mono font-bold">
                {`${timeLeft.hours.toString().padStart(2, "0")}:${timeLeft.minutes.toString().padStart(2, "0")}:${timeLeft.seconds.toString().padStart(2, "0")}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
