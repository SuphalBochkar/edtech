import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { search } = await req.json();
    if (!search) {
      return NextResponse.json(
        { error: "Search term is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { contains: search, mode: "insensitive" } },
          { name: { contains: search, mode: "insensitive" } },
        ],
      },
      select: {
        image: true,
        name: true,
        email: true,
        createdAt: true,
        courses: true,
        payments: {
          select: {
            id: true,
            course: true,
            status: true,
            razorpay_payment_id: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        queries: {
          select: {
            id: true,
            message: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
