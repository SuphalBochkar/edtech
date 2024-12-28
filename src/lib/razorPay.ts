import axios from "axios";
import { Session } from "next-auth";
import { SetStateAction } from "react";
// import { Course } from "./data";
import { FlowTypes } from "./types";

type UpdateSession = (data: Partial<Session>) => void;

export async function getRazorPayOptions(
  amount: number,
  sessionData: Session,
  buyId: string,
  update: UpdateSession,
  setPaymentFlow: (value: SetStateAction<FlowTypes>) => void,
  setIsProcessing: (value: SetStateAction<boolean>) => void,
  setMyError: (value: SetStateAction<string>) => void
) {
  let orderId: string;
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL!}/api/razorpay/createOrder`,
      {
        userId: sessionData.user.id,
        buyId: buyId,
      }
    );

    if (response.status === 200) {
      const data = response.data;
      orderId = data.orderId;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      setPaymentFlow("error");
      setMyError(
        "Error in creating the order: " + JSON.stringify(response.data)
      );
      setIsProcessing(false);
      return;
    }
  } catch (error) {
    setPaymentFlow("error");
    setMyError("Error in creating the order-2 catch block error: " + error);
    setIsProcessing(false);
    console.error("Failed to create Razorpay order", error);
    throw new Error("Order creation failed. Please try again.");
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    amount: amount * 100,
    currency: "INR",
    name: sessionData.user.name,
    description: "Payment for Learning Course",
    order_id: orderId,
    handler: async (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => {
      try {
        setPaymentFlow("verifying");
        const serverResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL!}/api/razorpay/verifyOrder`,
          {
            userId: sessionData.user.id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }
        );
        if (serverResponse.status === 200) {
          console.log("Payment is successful");
          //   sessionData.user.paid = true;
          //   sessionData.user.courses = [
          //     ...(sessionData.user.courses || []),
          //     Course.Course1Level,
          //   ];
          setPaymentFlow("success");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          update(sessionData);
        }
      } catch (error) {
        console.log("Error updating sessionData data after payment", error);
        setPaymentFlow("error");
        setMyError("Error updating sessionData data after payment" + error);
        setIsProcessing(false);
      }
    },
    prefill: {
      name: sessionData.user.name || "",
      email: sessionData.user.email || "",
      contact: "9876543210",
    },
    theme: {
      color: "#6d28d9",
    },
    options: {
      checkout: {
        method: {
          upi: 1,
          netbanking: 1,
          card: 1,
          wallet: 0,
        },
      },
    },
  };

  return options;
}

// type UpdateSession = (data: Partial<Session>) => void;

// export async function getRazorPayOptions(
//   amount: number,
//   sessionData: Session,
//   update: UpdateSession
// ) {
//   console.log("sessionData", sessionData);

//   let orderId: string;
//   try {
//     const data = await axios.post(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay/createOrder`
//     );
//     orderId = data.data.orderId;
//   } catch (error) {
//     console.error("Failed to create Razorpay order", error);
//     throw new Error("Order creation failed. Please try again.");
//   }
//   const options = {
//     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//     amount: amount * 100,
//     currency: "INR",
//     name: sessionData.user.name,
//     description: "Test Transaction",
//     order_id: orderId,
//     handler: async (response: {
//       razorpay_payment_id: string;
//       razorpay_order_id: string;
//       razorpay_signature: string;
//     }) => {
//       try {
//         const serverResponse = await axios.post(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay/verifyOrder`,
//           {
//             userId: sessionData.user.id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           }
//         );
//         if (serverResponse.status === 200) {
//           console.log("Payment is successful", response);
//           sessionData.user.paid = true;
//           sessionData.user.courses = [
//             ...(sessionData.user.courses || []),
//             Course.Course1_Hit,
//           ];
//           update(sessionData);
//         }
//       } catch (error) {
//         console.log("Error updating sessionData data after payment", error);
//       }
//     },
//     prefill: {
//       name: sessionData.user.name || "",
//       email: sessionData.user.email || "",
//       contact: "9876543210",
//     },
//     theme: {
//       color: "#3399cc",
//     },
//   };

//   return options;
// }
