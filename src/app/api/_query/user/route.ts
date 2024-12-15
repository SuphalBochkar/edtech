// src/app/api/query/user/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userQueries = await prisma.query.findMany({
      where: { userId },
    });

    return NextResponse.json({ userQueries });
  } catch (error) {
    console.error("Error fetching user queries:", error);
    return NextResponse.json(
      { error: "Failed to fetch user queries" },
      { status: 500 }
    );
  }
}
