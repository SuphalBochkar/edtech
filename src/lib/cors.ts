import Cors from "cors";
import { NextRequest, NextResponse } from "next/server";

export const cors = Cors({
  methods: ["POST", "GET", "OPTIONS"],
  origin: "*",
  optionsSuccessStatus: 200,
});

type MiddlewareFunction = (
  req: NextRequest,
  res: NextResponse,
  next: (err?: Error | null) => void
) => void;

export function runMiddleware(
  req: NextRequest,
  res: NextResponse,
  fn: MiddlewareFunction
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result?: Error | null) => {
      if (result) {
        return reject(result);
      }
      return resolve();
    });
  });
}
