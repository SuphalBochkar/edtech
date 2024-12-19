"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getRazorPayOptions } from "@/lib/razorPay";
import Script from "next/script";
import NavBar from "@/components/Navbar/NavBar";
import Razorpay from "razorpay";
import {
  AlertCircle,
  Check,
  CheckCircle,
  CreditCard,
  Loader2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Course, CourseNames, CoursePrices } from "@/lib/data";
import { LoadingSpinner } from "@/components/Pricing/LoadingSpinner";
import { decodeData } from "@/lib/utils";
import { FlowTypes } from "@/lib/types";
import ContactUsButton from "@/components/Contact/ContactUsButton";

declare global {
  interface Window {
    Razorpay: Razorpay;
  }
}

const renderFlowStatus = (paymentFlow: FlowTypes) => {
  const baseClasses =
    "mb-4 p-3 rounded-lg flex items-center text-xs sm:text-sm font-medium";
  switch (paymentFlow) {
    case "processing":
      return (
        <div className={`${baseClasses} bg-blue-50 text-blue-700`}>
          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2 sm:mr-3" />
          <span>Initializing payment. Please wait...</span>
        </div>
      );
    case "verifying":
      return (
        <div className={`${baseClasses} bg-yellow-50 text-yellow-700`}>
          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2 sm:mr-3" />
          <span>Verifying... Please do not close or refresh this page.</span>
        </div>
      );
    case "success":
      return (
        <div className={`${baseClasses} bg-green-50 text-green-700`}>
          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
          <span>
            Payment successful! Please check your email for confirmation.
            Redirecting to the test page...
          </span>
        </div>
      );
    case "error":
      return (
        <div className={`${baseClasses} bg-red-50 text-red-700`}>
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
          <span>Error: Payment Cancelled or Failed</span>
        </div>
      );
    default:
      return null;
  }
};

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const router = useRouter();
  const {
    data: sessionData,
    status,
    update,
  } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentFlow, setPaymentFlow] = useState<FlowTypes>("idle");
  const [myError, setMyError] = useState<string>("No error");
  const [courseId, setCourseId] = useState<Course | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated" && sessionData?.user) {
      try {
        const idObj = decodeData(params.id);
        setCourseId(idObj.courseType);
        if (!Object.values(Course).includes(idObj.courseType)) {
          router.push("/home");
        }
        if (
          sessionData.user.courses &&
          sessionData.user.courses.includes(idObj.courseType)
        ) {
          router.push("/home");
        }
      } catch (err) {
        console.error("Error parsing course ID:", err);
        router.push("/home");
      }
    }
  }, [status, router, sessionData, params.id]);

  const amount = courseId ? CoursePrices[courseId] : 0;

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!sessionData || !courseId) return;
    setPaymentFlow("processing");
    setIsProcessing(true);
    setMyError("No error");

    try {
      const options = await getRazorPayOptions(
        amount,
        sessionData,
        params.id,
        update,
        setPaymentFlow,
        setIsProcessing,
        setMyError
      );

      // @ts-expect-error Razorpay is not defined
      const rzp = new window.Razorpay({
        ...options,
        modal: {
          ondismiss: function () {
            if (confirm("Do you want to cancel the payment?")) {
              setIsProcessing(false);
              setPaymentFlow("error");
              setMyError("Payment Cancelled by the user");
              console.log("Checkout form closed by the user");
            } else {
              console.log("Complete the Payment");
            }
          },
        },
      });
      rzp.on(
        "payment.failed",
        function (response: {
          error: {
            code: string;
            description: string;
            source: string;
            step: string;
            reason: string;
            metadata: { order_id: string; payment_id: string };
          };
        }) {
          if (response) {
            console.log("Payment failed");
          }
          setPaymentFlow("error");
          setIsProcessing(false);
          setMyError(
            "Error in the razor payment on failed: " +
              response.error.description
          );
        }
      );
      rzp.open();
      e.preventDefault();
    } catch (error) {
      console.error("Payment Failed", error);
    }
  };

  if (status === "loading" || !courseId) {
    return <LoadingSpinner />;
  }

  if (myError) {
  }

  return (
    sessionData &&
    sessionData?.user &&
    courseId && (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-background">
        <NavBar />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-12 sm:py-16"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl font-extrabold text-center mb-4 md:mb-8 bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent"
            >
              Complete Your Purchase
            </motion.h1>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              {/* Course Details Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="backdrop-blur-lg border border-violet-500/20 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden"
              >
                <div className="p-4 sm:p-6 md:p-8 bg-violet-900/20">
                  <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
                    <h2 className="text-lg md:text-xl font-bold text-violet-300">
                      Course Details
                    </h2>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div className="flex flex-col gap-1 md:gap-2">
                      <span className="text-xs md:text-sm text-gray-400">
                        Selected Course
                      </span>
                      <span className="text-lg md:text-xl font-bold text-violet-200">
                        {CourseNames[courseId]}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 md:gap-2">
                      <span className="text-xs md:text-sm text-gray-400">
                        Access Level
                      </span>
                      <span className="text-base md:text-lg font-semibold text-violet-200">
                        Complete Access (All Levels 1-5)
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 md:gap-2">
                      <span className="text-xs md:text-sm text-gray-400">
                        Features Included
                      </span>
                      <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-violet-200">
                        <li className="flex items-center gap-1.5 md:gap-2">
                          <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-400" />
                          Instant Access to Current Level Tests
                        </li>
                        <li className="flex items-center gap-1.5 md:gap-2">
                          <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-400" />
                          Full Access & Regular Updates
                        </li>
                        <li className="flex items-center gap-1.5 md:gap-2">
                          <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-400" />
                          24/7 Support Access
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="backdrop-blur-lg border border-violet-500/20 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden"
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
                    <h2 className="text-lg md:text-xl font-bold text-violet-300">
                      Secure Payment
                    </h2>
                  </div>

                  <div className="text-center text-xs md:text-sm text-gray-400 mb-4 md:mb-6">
                    <p>Secured by Razorpay 🔒</p>
                    <p>Supports UPI, Cards & Net Banking</p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-between p-3 md:p-4 bg-violet-900/20 rounded-xl md:rounded-2xl mb-3 md:mb-4">
                      <span className="text-sm md:text-base text-gray-300">
                        Total Amount:
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl md:text-2xl font-bold text-violet-300">
                          ₹{amount}
                        </span>
                        <span className="text-xs md:text-sm text-gray-400 line-through">
                          ₹59
                        </span>
                      </div>
                    </div>

                    {renderFlowStatus(paymentFlow)}

                    <motion.button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex justify-center items-center py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl text-sm md:text-base font-semibold text-white
                        ${
                          isProcessing
                            ? "bg-violet-700/50 cursor-not-allowed"
                            : "bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-600"
                        }
                        shadow-lg transition-all duration-200 ease-out`}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5" />
                          Complete Payment
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <ContactUsButton />
      </div>
    )
  );
}
