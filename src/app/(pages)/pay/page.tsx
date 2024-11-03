"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { getRazorPayOptions } from "@/lib/razorPay";
import Script from "next/script";
import NavBar from "@/components/NavBar";
import Razorpay from "razorpay";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/ui/shad/alert";
import { Course } from "@/lib/types";

declare global {
  interface Window {
    Razorpay: Razorpay;
  }
}

// export default function Page() {
//   const router = useRouter();
//   const {
//     data: sessionData,
//     status,
//     update,
//   } = useSession({
//     required: true,
//     onUnauthenticated() {
//       router.push("/");
//     },
//   });

//   const amount = 100;
//   const [isProcessing, setIsProcessing] = useState(false);

//   useEffect(() => {
//     if (status === "loading") return;
//   }, [status, router]);

//   const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     if (!sessionData) return;

//     setIsProcessing(true);

//     try {
//       const options = await getRazorPayOptions(amount, sessionData, update);

//       // @ts-expect-error Razorpay is not defined
//       const rzp = new window.Razorpay(options);
//       rzp.on(
//         "payment.failed",
//         function (response: {
//           error: {
//             code: string;
//             description: string;
//             source: string;
//             step: string;
//             reason: string;
//             metadata: { order_id: string; payment_id: string };
//           };
//         }) {
//           alert(response.error.code);
//           alert(response.error.description);
//           alert(response.error.source);
//           alert(response.error.step);
//           alert(response.error.reason);
//           alert(response.error.metadata.order_id);
//           alert(response.error.metadata.payment_id);
//         }
//       );
//       rzp.open();
//       e.preventDefault();
//     } catch (error) {
//       console.error("Payment Failed", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     sessionData?.user && (
//       <div>
//         <NavBar />
//         <div className="flex flex-col items-center justify-center h-full text-background">
//           <Script src="https://checkout.razorpay.com/v1/checkout.js" />
//           <div className="p-6 bg-purple-400/30 dark:bg-purple-950/20 rounded-lg text-foreground">
//             <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
//             <p className="mb-4">Amount to pay: {amount}</p>
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
// }

export function forceSignOut() {
  setTimeout(() => {
    signOut();
  }, 2000);
  return null;
}

export type FlowTypes =
  | "idle"
  | "processing"
  | "verifying"
  | "success"
  | "error";

const renderFlowStatus = (paymentFlow: FlowTypes) => {
  switch (paymentFlow) {
    case "processing":
      return (
        <Alert className="mb-4">
          <Loader2 className="h-4 w-4 animate-spin" />
          <AlertDescription>
            Initializing payment Please Wait...
          </AlertDescription>
        </Alert>
      );
    case "verifying":
      return (
        <Alert className="mb-4">
          <Loader2 className="h-4 w-4 animate-spin" />
          <AlertDescription>
            Verifying... Please do not close or refresh this page.
          </AlertDescription>
        </Alert>
      );
    case "success":
      return (
        <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
          <AlertDescription>
            Payment successful! Redirecting to test page...
            {/* {forceSignOut()} */}
          </AlertDescription>
        </Alert>
      );
    case "error":
      return (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Error Payment Failed</AlertDescription>
        </Alert>
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

  const amount = 100;
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentFlow, setPaymentFlow] = useState<FlowTypes>("idle");

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
        setIsProcessing
      );

      // @ts-expect-error Razorpay is not defined
      const rzp = new window.Razorpay({
        ...options,
        modal: {
          ondismiss: function () {
            if (confirm("Are you sure, you want to close the form?")) {
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

  return (
    sessionData?.user && (
      <div>
        <NavBar />
        <div className="flex flex-col items-center justify-center h-full text-background">
          <Script src="https://checkout.razorpay.com/v1/checkout.js" />
          <div className="p-6 bg-purple-400/30 dark:bg-purple-950/20 rounded-lg text-foreground">
            <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
            <p className="mb-4">Amount to pay: {amount}</p>
            {renderFlowStatus(paymentFlow)}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
