"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getRazorPayOptions } from "@/lib/razorPay";
import Script from "next/script";
import NavBar from "@/components/NavBar";
import Razorpay from "razorpay";
import { AlertCircle, CheckCircle, CreditCard, Loader2 } from "lucide-react";
import { Course } from "@/lib/types";
import { Course1_Hit_Amount } from "@/lib/data";
import { motion } from "framer-motion";

declare global {
  interface Window {
    Razorpay: Razorpay;
  }
}

export type FlowTypes =
  | "idle"
  | "processing"
  | "verifying"
  | "success"
  | "error";

// const renderFlowStatus = (paymentFlow: FlowTypes) => {
//   switch (paymentFlow) {
//     case "processing":
//       return (
//         <Alert className="mb-4">
//           <Loader2 className="h-4 w-4 animate-spin" />
//           <AlertDescription>
//             Initializing payment Please Wait...
//           </AlertDescription>
//         </Alert>
//       );
//     case "verifying":
//       return (
//         <Alert className="mb-4">
//           <Loader2 className="h-4 w-4 animate-spin" />
//           <AlertDescription>
//             Verifying... Please do not close or refresh this page.
//           </AlertDescription>
//         </Alert>
//       );
//     case "success":
//       return (
//         <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
//           <AlertDescription>
//             Payment successful! Redirecting to test page...
//             {/* {forceSignOut()} */}
//           </AlertDescription>
//         </Alert>
//       );
//     case "error":
//       return (
//         <Alert variant="destructive" className="mb-4">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>Error Payment Failed</AlertDescription>
//         </Alert>
//       );
//     default:
//       return null;
//   }
// };

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

export default function Page() {
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

  const amount = Course1_Hit_Amount;
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentFlow, setPaymentFlow] = useState<FlowTypes>("idle");
  const [myError, setMyError] = useState<string>("No error");

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated" && sessionData?.user) {
      if (
        sessionData.user.courses &&
        sessionData.user.courses.includes(Course.Course1_Hit)
      ) {
        router.push("/test");
        return;
      }
    }
  }, [status, router, sessionData]);

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!sessionData) return;

    setPaymentFlow("processing");
    setIsProcessing(true);

    try {
      const options = await getRazorPayOptions(
        amount,
        sessionData,
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
            // if (confirm("Do you want to cancel the payment?")) {
            setIsProcessing(false);
            setPaymentFlow("error");
            setMyError("Payment Cancelled by the user");
            //   console.log("Checkout form closed by the user");
            // } else {
            //   console.log("Complete the Payment");
            // }
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
          //   alert(response.error.code);
          //   alert(response.error.description);
          //   alert(response.error.source);
          //   alert(response.error.step);
          //   alert(response.error.reason);
          //   alert(response.error.metadata.order_id);
          //   alert(response.error.metadata.payment_id);
        }
      );
      rzp.open();
      e.preventDefault();
    } catch (error) {
      console.error("Payment Failed", error);
    }
  };

  //   return (
  //     sessionData?.user && (
  //       <div>
  //         <NavBar />
  //         <div className="flex flex-col items-center justify-center h-full text-background">
  //           <Script src="https://checkout.razorpay.com/v1/checkout.js" />
  //           <div className="p-6 bg-purple-400/30 dark:bg-purple-950/20 rounded-lg text-foreground">
  //             <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
  //             <p className="mb-4">Amount to pay: {amount}</p>
  //             {renderFlowStatus(paymentFlow)}
  //             <button
  //               onClick={handlePayment}
  //               disabled={isProcessing}
  //               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
  //             >
  //               {isProcessing ? "Processing..." : "Pay Now"}
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   );

  //   return (
  //     sessionData?.user && (
  //       <div>
  //         <NavBar />
  //         <Script src="https://checkout.razorpay.com/v1/checkout.js" />
  //         <div className="container mx-auto px-4 py-8 sm:py-16">
  //           <div className="max-w-sm sm:max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
  //             <div className="p-6 sm:p-8">
  //               <div className="uppercase tracking-wide text-xs sm:text-sm text-indigo-500 font-semibold">
  //                 Secure Payment
  //               </div>
  //               <h1 className="mt-2 text-2xl sm:text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white">
  //                 Complete Your Payment
  //               </h1>
  //               <p className="mt-2 sm:mt-4 max-w-2xl text-base sm:text-xl text-gray-500 dark:text-gray-300">
  //                 Powered by Razorpay
  //               </p>
  //             </div>
  //             <div className="border-t border-gray-200 dark:border-gray-700 px-6 sm:px-8 py-6 sm:py-8">
  //               <div className="flex items-center justify-between mb-4 sm:mb-6">
  //                 <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
  //                   Amount to pay:
  //                 </span>
  //                 <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
  //                   ₹{amount}
  //                 </span>
  //               </div>
  //               {renderFlowStatus(paymentFlow)}
  //               <button
  //                 onClick={handlePayment}
  //                 disabled={isProcessing}
  //                 className={`w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
  //                   isProcessing ? "opacity-75 cursor-not-allowed" : ""
  //                 }`}
  //               >
  //                 {isProcessing ? (
  //                   <>
  //                     <Loader2 className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
  //                     Processing...
  //                   </>
  //                 ) : (
  //                   <>
  //                     <CreditCard className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
  //                     Pay Now
  //                   </>
  //                 )}
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   );
  return (
    sessionData?.user && (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-background">
        <NavBar />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-12 sm:py-16"
        >
          <div className="text-foreground">My Error: {myError}</div>
          <div className="max-w-md mx-auto backdrop-blur-lg border border-violet-500/20 shadow-2xl rounded-3xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <h3 className="text-violet-400 text-lg sm:text-xl font-semibold leading-7 flex items-center justify-center">
                Secure Payment
              </h3>
              <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-center text-white">
                Complete Your Payment
              </h1>
              <p className="mt-2 sm:mt-4 text-base sm:text-lg text-center text-gray-300">
                Powered by Razorpay
              </p>
            </div>
            <div className="border-t border-violet-500/20 px-6 sm:px-8 py-6 sm:py-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span className="text-sm sm:text-base font-medium text-gray-300">
                  Amount to pay:
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-violet-300">
                  ₹{amount}
                </span>
              </div>
              {renderFlowStatus(paymentFlow)}
              <motion.button
                onClick={handlePayment}
                disabled={isProcessing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm sm:text-base font-semibold text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors duration-200 ${
                  isProcessing ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                    Pay Now
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  );
}
