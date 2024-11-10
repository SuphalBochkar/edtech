import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const getSessionData = await getToken({ req });

  if (!getSessionData) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "GET request received" });
}
