import axios from "axios";
import { Session } from "next-auth";
import { Course } from "./types";

type UpdateSession = (data: Partial<Session>) => void;

export async function getRazorPayOptions(
  amount: number,
  sessionData: Session,
  update: UpdateSession
) {
  console.log("sessionData", sessionData);

  let orderId: string;
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay/createOrder`
    );
    orderId = data.data.orderId;
  } catch (error) {
    console.error("Failed to create Razorpay order", error);
    throw new Error("Order creation failed. Please try again.");
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    amount: amount * 100,
    currency: "INR",
    name: sessionData.user.name,
    description: "Test Transaction",
    order_id: orderId,
    handler: async (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => {
      try {
        const serverResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay/verifyOrder`,
          {
            userId: sessionData.user.id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }
        );
        if (serverResponse.status === 200) {
          console.log("Payment is successful", response);
          sessionData.user.paid = true;
          sessionData.user.courses = [
            ...(sessionData.user.courses || []),
            Course.Course1_Hit,
          ];
          update(sessionData);
        }
      } catch (error) {
        console.log("Error updating sessionData data after payment", error);
      }
    },
    prefill: {
      name: sessionData.user.name || "",
      email: sessionData.user.email || "",
      contact: "9876543210",
    },
    theme: {
      color: "#3399cc",
    },
  };

  return options;
}
