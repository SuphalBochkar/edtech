// src/app/api/query/admin/user-with-queries/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const usersWithQueries = await prisma.user.findMany({
      where: {
        queries: {
          some: {},
        },
      },
      include: {
        queries: true,
      },
    });
    return NextResponse.json({ usersWithQueries });
  } catch (error) {
    console.error("Error fetching users with queries:", error);
    return NextResponse.json(
      { error: "Failed to fetch users with queries" },
      { status: 500 }
    );
  }
}
