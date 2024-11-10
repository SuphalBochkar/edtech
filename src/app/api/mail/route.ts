import { NextResponse } from "next/server";
// import buyCourseMail from "@/actions/buyCourseMail";

export async function POST() {
  return NextResponse.json({ success: true });
  //   try {
  //     const mailData = await buyCourseMail({
  //       name: "Learner",
  //       email: "saibochkar@gmail.com",
  //     });
  //     return NextResponse.json({ success: true, data: mailData });
  //   } catch (error) {
  //     console.error("Failed to send email:", error);
  //     return NextResponse.json({
  //       success: false,
  //       error: error instanceof Error ? error.message : String(error),
  //     });
  //   }
}
