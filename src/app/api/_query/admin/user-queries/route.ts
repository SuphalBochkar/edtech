// src/app/api/query/admin/user-queries/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const queries = await prisma.query.findMany({
      where: { userId },
    });

    if (!queries.length) {
      return NextResponse.json(
        { error: "No queries found for user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ queries });
  } catch (error) {
    console.error("Error fetching user queries:", error);
    return NextResponse.json(
      { error: "Failed to fetch user queries" },
      { status: 500 }
    );
  }
}
