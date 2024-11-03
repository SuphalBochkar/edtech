import { prisma } from "@/lib/prisma";
import { Course } from "@/lib/types";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  const tokenData = await getToken({ req });

  console.log("TokenData", tokenData);

  if (!tokenData || !tokenData?.email) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  const options = {
    amount: 100 * 100,
    currency: "INR",
    receipt: "receipt#" + Math.random().toString(36).substring(7),
    notes: {
      paymentFor: "Edu Course",
      userEmail: tokenData.email || "",
      productId: Course.Course2_MyPer || "",
    },
  };

  try {
    const user = await prisma.user.findUnique({
      where: { email: tokenData.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const order = await razorPayInstance.orders.create(options);
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        razorpay_order_id: order.id,
        status: "PENDING",
      },
    });

    await prisma.user.update({
      where: { email: tokenData.email },
      data: {
        payments: {
          connect: {
            id: payment.id,
          },
        },
      },
    });

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Error while creating order", error);
    return NextResponse.json(
      { error: "Error while creating order" },
      { status: 500 }
    );
  }
}
