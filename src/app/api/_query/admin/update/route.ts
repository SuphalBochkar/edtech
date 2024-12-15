// src/app/api/query/admin/update/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { queryId, status } = await req.json();

    if (!queryId || !status) {
      return NextResponse.json(
        { error: "Query ID and status are required" },
        { status: 400 }
      );
    }

    const updatedQuery = await prisma.query.update({
      where: { id: queryId },
      data: { status },
    });

    return NextResponse.json({ updatedQuery });
  } catch (error) {
    console.error("Error updating query:", error);
    return NextResponse.json(
      { error: "Failed to update query" },
      { status: 500 }
    );
  }
}
