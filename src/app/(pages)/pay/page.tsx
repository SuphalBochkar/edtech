"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getRazorPayOptions } from "@/lib/razorPay";
import Script from "next/script";
import NavBar from "@/components/NavBar";
import Razorpay from "razorpay";

declare global {
  interface Window {
    Razorpay: Razorpay;
  }
}

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

  useEffect(() => {
    if (status === "loading") return;
  }, [status, router]);

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!sessionData) return;

    setIsProcessing(true);

    try {
      const options = await getRazorPayOptions(amount, sessionData, update);

      // @ts-expect-error Razorpay is not defined
      const rzp = new window.Razorpay(options);
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
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        }
      );
      rzp.open();
      e.preventDefault();
    } catch (error) {
      console.error("Payment Failed", error);
    } finally {
      setIsProcessing(false);
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

// export function Pages() {
//   const amount = 100;
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     try {
//       // create order
//       const data = await axios.post("/api/razorpay/createOrder");
//       const { orderId } = data.data;

//       //   Initialize Razorpay
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: amount * 100,
//         currency: "INR",
//         name: "Finish66",
//         description: "Test Transaction",
//         // image: "/logo.svg",
//         order_id: orderId,
//         handler: function (response: {
//           razorpay_payment_id: string;
//           razorpay_order_id: string;
//           razorpay_signature: string;
//         }) {
//           console.log("Payment is successful", response);
//           // Handle successful payment here and update ui and send to server
//           alert(response.razorpay_payment_id);
//         },
//         prefill: {
//           name: "Example",
//           email: "Example@gmail.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//       const data = await axios.post("/api/razorpay/createOrder");
//       const { orderId } = data.data;
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: amount * 100,
//         currency: "INR",
//         name: "Finish66",
//         description: "Test Transaction",
//         order_id: orderId,
//         handler: function (response: {
//           razorpay_payment_id: string;
//           razorpay_order_id: string;
//           razorpay_signature: string;
//         }) {
//           console.log("Payment is successful", response);
//           alert(response.razorpay_payment_id);
//         },
//         prefill: {
//           name: "Example",
//           email: "Example@gmail.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };
//     } catch (error) {
//       console.error("Error Payment Failed", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600 text-background">
//       <Script src="https://checkout.razorpay.com/v1/checkout.js" />
//       <div className="p-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
//         <p className="mb-4">Amount to pay: {amount}</p>
//         <button
//           onClick={handlePayment}
//           disabled={isProcessing}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// }
