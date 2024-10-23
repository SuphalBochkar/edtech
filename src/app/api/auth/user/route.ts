import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export function GET() {
  const session = getServerSession();
  return NextResponse.json({ session });
}
