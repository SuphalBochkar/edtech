"use client";

import NavBar from "@/components/Navbar/NavBar";
import { LoadingSpinner } from "@/components/Pricing/LoadingSpinner";
import Pricing from "@/components/Pricing/Pricing";
import WhyPricing from "@/components/Pricing/WhyPricing";
import { Course } from "@/lib/data";
import { decodeData } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ContactUsButton from "@/components/Contact/ContactUsButton";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const router = useRouter();
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [courseId, setCourseId] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated") {
      try {
        const idObj = decodeData(params.id);
        setCourseId(idObj.courseType);
        if (!Object.values(Course).includes(idObj.courseType)) {
          router.push("/home");
        }
      } catch (err) {
        console.log("Error parsing course ID:", err);
        setError("Invalid course data. Please try again.");
        router.push("/home");
      } finally {
        setIsLoading(false);
      }
    }
  }, [status, params.id, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-8 shadow-xl">
          <p className="text-lg font-semibold text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!courseId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <NavBar />
      {data && (
        <div className="container mx-auto px-4 py-4 md:py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center md:mb-10"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-300 to-violet-800 bg-clip-text text-transparent">
              Unlock Your Learning Potential
            </h1>
            <p className="hidden md:block text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Get instant access to comprehensive solutions and study materials
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 lg:gap-16 items-start max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:sticky lg:top-24"
            >
              <Pricing courseId={courseId} id={params?.id || ""} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <WhyPricing />
            </motion.div>
          </div>
        </div>
      )}
      <ContactUsButton />
    </div>
  );
}
