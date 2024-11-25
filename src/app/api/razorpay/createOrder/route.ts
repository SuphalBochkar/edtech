import { CourseNames, CoursePrices } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { decodeData } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
// import { getServerSession } from "next-auth";

const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  //   if (!session || !session.user?.email)
  //     return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  //   const userEmail = session.user?.email;

  try {
    const data = await req.json();
    const { userId, buyId } = data;

    if (!userId || !buyId) {
      return NextResponse.json(
        { error: "Invalid request. Missing required fields." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, courses: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please log in." },
        { status: 404 }
      );
    }

    const courseId = decodeData(buyId).courseType;

    if (!courseId || !CourseNames[courseId]) {
      return NextResponse.json(
        { error: "Invalid course selection." },
        { status: 400 }
      );
    }

    if (user.courses.includes(courseId)) {
      return NextResponse.json(
        { error: "You are already enrolled in this course." },
        { status: 400 }
      );
    }

    const userEmail = user.email;

    const options = {
      amount: CoursePrices[courseId] * 100,
      currency: "INR",
      receipt: "receipt#" + Math.random().toString(36).substring(7),
      notes: {
        "Payment Purpose": "Payment for Learning Course",
        "User Email": userEmail || "",
        "Product Id": courseId || "",
        "Course Name": CourseNames[courseId] || "",
      },
    };

    // const user = await prisma.user.findUnique({
    //   where: { email: userEmail },
    //   select: { id: true },
    // });
    // if (!user) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    const order = await razorPayInstance.orders.create(options);
    const payment = await prisma.payment.create({
      data: {
        userId: data.userId,
        course: courseId,
        razorpay_order_id: order.id,
        status: "PENDING",
      },
    });

    await prisma.user.update({
      where: { email: userEmail },
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
