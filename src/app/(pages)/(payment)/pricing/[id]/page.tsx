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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-background">
      <NavBar />
      {data && (
        <div className="container mx-auto px-4 py-2 md:py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 md:gap-4 lg:gap-12">
            <div className="w-full lg:w-1/2 flex flex-col gap-2 md:gap-4 lg:gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-300 to-violet-800 bg-clip-text text-transparent pb-2">
                  Unlock Your Learning Potential
                </h2>
                <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-300">
                  Get all the answers in one place to study better and complete
                  all modules with confidence
                </p>
              </motion.div>
              <Pricing courseId={courseId} id={params?.id || ""} />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-2 md:gap-4 lg:gap-8 text-center">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-violet-300 to-violet-800 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Why Are We Charging?
              </motion.h2>
              <WhyPricing />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";

// import NavBar from "@/components/NavBar";
// import { LoadingSpinner } from "@/components/Pricing/LoadingSpinner";
// import Pricing from "@/components/Pricing/Pricing";
// import WhyPricing from "@/components/Pricing/WhyPricing";
// import { Course } from "@/lib/data";
// import { decodeData } from "@/lib/utils";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function Page({
//   params,
// }: {
//   params: {
//     id: string;
//   };
// }) {
//   const router = useRouter();
//   const { data, status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       router.push("/");
//     },
//   });

//   const [courseId, setCourseId] = useState<Course | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (status === "loading") return;

//     if (status === "authenticated") {
//       try {
//         const idObj = decodeData(params.id);
//         setCourseId(idObj.courseType);
//         if (!Object.values(Course).includes(idObj.courseType)) {
//           router.push("/home");
//         }
//       } catch (err) {
//         console.log("Error parsing course ID:", err);
//         setError("Invalid course data. Please try again.");
//         router.push("/home");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   }, [status, params.id, router]);

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
//         <div className="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-8 shadow-xl">
//           <p className="text-lg font-semibold text-red-300">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!courseId) {
//     return null;
//   }

//   return (
//     <div>
//       <div className="text-background flex flex-col w-full h-full align-middle justify-center items-center content-center">
//         <NavBar />
//         {data && (
//           <div className="sm:grid sm:grid-cols-2 flex flex-col align-middle sm:pt-8">
//             <div className="col-span-1">
//               <Pricing courseId={courseId} id={params?.id || ""} />
//             </div>
//             <div className="col-span-1 h-full">
//               <WhyPricing />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
