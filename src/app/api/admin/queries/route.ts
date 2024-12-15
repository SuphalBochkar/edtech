import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const queries = await prisma.query.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    return NextResponse.json({ success: true, queries });
  } catch (error) {
    console.error("Error fetching queries:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedQuery = await prisma.query.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, query: updatedQuery });
  } catch (error) {
    console.error("Error updating query status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
