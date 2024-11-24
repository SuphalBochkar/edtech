import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Course } from "./data";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function encodeData(courseType: Course) {
//   const stringObj = JSON.stringify({ courseType });
//   return Buffer.from(stringObj).toString("base64");
// }

// export function decodeData(encodedString: string): { courseType: Course } {
//   try {
//     const decodedUrlData = decodeURIComponent(encodedString);
//     const decodedString = Buffer.from(decodedUrlData, "base64").toString(
//       "utf-8"
//     );
//     return JSON.parse(decodedString);
//   } catch (error) {
//     console.error("Error decoding data:", error);
//     throw new Error("Invalid encoded data");
//   }
// }

// const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY!, "hex");
// const IV = Buffer.from(process.env.IV!, "hex");

const ENCRYPTION_KEY = crypto
  .createHash("sha256")
  .update("3222e2c5b4dd21b96c8800ea4480061d")
  .digest();
const IV = Buffer.from("d4bbb55df1e9ea13b56310a32b40487a", "hex");

export function encodeData(courseType: Course): string {
  const stringObj = JSON.stringify({ courseType });
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
  let encrypted = cipher.update(stringObj, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decodeData(encodedString: string): { courseType: Course } {
  try {
    const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
    let decrypted = decipher.update(encodedString, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Error decoding data:", error);
    throw new Error("Invalid encoded data");
  }
}
