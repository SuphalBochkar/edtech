import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET as string;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(req: NextRequest) {
  //   const session = await getServerSession();
  //   if (!session || !session.user?.email) {
  //     return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  //   }

  const { userId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json();

  if (
    !userId ||
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature
  ) {
    return NextResponse.json(
      { error: "Invalid request. Missing required fields." },
      { status: 400 }
    );
  }

  try {
    try {
      const signature = generatedSignature(
        razorpay_order_id,
        razorpay_payment_id
      );
      if (signature !== razorpay_signature) {
        return NextResponse.json(
          { message: "Payment Not Verified", isOk: false },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      return NextResponse.json(
        { error: "Failed to verify payment." },
        { status: 500 }
      );
    }

    const existingPayment = await prisma.payment.findFirst({
      where: {
        razorpay_order_id,
      },
      select: {
        course: true,
      },
    });

    if (!existingPayment) {
      return NextResponse.json(
        { message: "No payment record found", isOk: false },
        { status: 404 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.payment.updateMany({
        where: {
          razorpay_order_id,
          userId,
        },
        data: {
          razorpay_payment_id,
          razorpay_signature,
          status: "SUCCESS",
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          courses: {
            push: existingPayment.course,
          },
          paid: true,
        },
      });
    });

    return NextResponse.json(
      { message: "Payment verified successfully." },
      { status: 200 }
    );

    // await prisma.$transaction(async (tx) => {
    //   const payment = await tx.payment.create({
    //     data: {
    //       userId: userId,
    //       razorpay_payment_id: razorpay_payment_id,
    //       razorpay_order_id: razorpay_order_id,
    //       razorpay_signature: razorpay_signature,
    //     },
    //   });
    //   await tx.user.update({
    //     where: { id: userId },
    //     data: {
    //       courses: {
    //         push: Course.Course1_Hit,
    //       },
    //       paid: true,
    //       payments: {
    //         connect: {
    //           id: payment.id,
    //         },
    //       },
    //     },
    //     include: {
    //       payments: true,
    //     },
    //   });
    // });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment." },
      { status: 500 }
    );
  }
}
