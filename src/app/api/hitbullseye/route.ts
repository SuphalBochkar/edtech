import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { AUTH_PROVIDERS } from "@/lib/auth";

// async function getUserPaymentStatus(userId: string) {
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });
//   return user?.paid || false;
// }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const testId = searchParams.get("id");

  //   const session = await getServerSession(req, AUTH_PROVIDERS);
  //   if (!session || !session.user?.userId)
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  //   const userId = session.user?.userId;
  //   const isAuthorized = await getUserPaymentStatus(userId);
  //   if (!isAuthorized)
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (testId) {
    const test = await prisma.hitbullseye.findUnique({
      where: { id: testId },
    });

    if (test) {
      return NextResponse.json(test.data);
    } else {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ success: "Hitbullseye route is working" });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const savedTest = await prisma.hitbullseye.create({
      data: { data: body },
    });
    return NextResponse.json({ id: savedTest.id });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error storing data" }, { status: 500 });
  }
}
