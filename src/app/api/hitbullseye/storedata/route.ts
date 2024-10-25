// api/hitbullseye/storedata/route.js
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const savedTest = await prisma.hitbullseye.create({
      data: { data: body },
    });
    return NextResponse.json({ id: savedTest.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error storing data" }, { status: 500 });
  }
}
