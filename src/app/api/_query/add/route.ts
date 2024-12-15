// src/app/api/query/add/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, userId } = await req.json();

    if (!message || !userId) {
      return NextResponse.json(
        { error: "Missing title, message, or userId" },
        { status: 400 }
      );
    }

    const newQuery = await prisma.query.create({
      data: { message, userId },
    });

    return NextResponse.json({ query: newQuery });
  } catch (error) {
    console.error("Error adding query:", error);
    return NextResponse.json({ error: "Failed to add query" }, { status: 500 });
  }
}
