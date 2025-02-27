// api/hitbullseye/getdata/[id]/route.js

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { AUTH_OPTIONS } from "@/lib/auth";

// async function getUserPaymentStatus(userId: string) {
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });
//   return user?.paid || false;
// }

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id: testId } = params;
  return NextResponse.json("API Closed");

  //   if (!session || !session.user?.id) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }

  //   const userId = session.user.id;
  //   const isAuthorized = await getUserPaymentStatus(userId);
  //   if (!isAuthorized) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }

  if (testId) {
    const test = await prisma.hitbullseye.findUnique({
      where: { id: testId },
    });

    if (test) {
      return NextResponse.json(test?.data);
    } else {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ success: "Hitbullseye route is working" });
  }
}
