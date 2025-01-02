// "use client";

// import React, { Suspense } from "react";
// import RazorPay from "razorpay";
// import Buy from "./Buy";
// import { useRouter } from "next/navigation";

// declare global {
//   interface Window {
//     RazorPay: typeof RazorPay;
//   }
// }

// interface PaymentOptions {
//   key: string;
//   name: string;
//   currency: string;
//   amount: number;
//   order_id: string;
//   description: string;
//   handler: (response: {
//     razorpay_payment_id: string;
//     razorpay_order_id: string;
//     razorpay_signature: string;
//   }) => void;
//   prefill: {
//     name: string;
//     email: string;
//     contact: string;
//   };
// }

// const BuyProduct: React.FC = () => {
//   const router = useRouter();

//   const makePayment = async ({
//     productId = null,
//   }: {
//     productId?: string | null;
//   }) => {
//     const key = process.env.RAZORPAY_API_KEY;

//     try {
//       const response = await fetch("http://localhost:3005/api/razorpay");
//       const { order } = await response.json();

//       const options: PaymentOptions = {
//         key: key || "",
//         name: "mmantratech",
//         currency: order.currency,
//         amount: order.amount,
//         order_id: order.id,
//         description: "Understanding RazorPay Integration",
//         handler: async (paymentResponse) => {
//           try {
//             const verificationResponse = await fetch(
//               "http://localhost:3005/api/paymentverify",
//               {
//                 method: "POST",
//                 body: JSON.stringify({
//                   razorpay_payment_id: paymentResponse.razorpay_payment_id,
//                   razorpay_order_id: paymentResponse.razorpay_order_id,
//                   razorpay_signature: paymentResponse.razorpay_signature,
//                 }),
//               }
//             );

//             const verificationData = await verificationResponse.json();

//             if (verificationData?.message === "success") {
//               router.push(
//                 `/paymentsuccess?paymentid=${paymentResponse.razorpay_payment_id}`
//               );
//             }
//           } catch (error) {
//             console.error("Payment verification error:", error);
//           }
//         },
//         prefill: {
//           name: "suphal",
//           email: "suphal@gmail.com",
//           contact: "9876543210",
//         },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//       paymentObject.on("payment.failed", () => {
//         alert(
//           "Payment failed. Please try again or contact support for assistance."
//         );
//       });
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//     }
//   };

//   return (
//     <Suspense fallback={<Loading />}>
//       <Buy makePayment={makePayment} />
//     </Suspense>
//   );
// };

// export default BuyProduct;

// function Loading() {
//   return (
//     <div className="flex flex-col items-center justify-center mt-[100px]">
//       <h1 className="text-2xl">Razor Pay Integration with NextJs 13</h1>
//       <button
//         className={`bg-blue-500 text-white font-semibold mt-20 py-2 px-4 rounded`}
//       >
//         Loading...
//       </button>
//     </div>
//   );
// }
