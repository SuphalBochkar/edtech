import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const level = searchParams.get("level");
  const type = searchParams.get("type");
  const testNumber = searchParams.get("testNumber");

  const data = {
    level,
    type,
    testNumber,
    description: `This is a description for level ${level}, type ${type}, test number ${testNumber}.`,
  };

  return NextResponse.json(data);
}
